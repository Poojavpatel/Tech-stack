/*
Commands to run this script
For the bucket : AWS_PROFILE=assembly-duplo-dev node build/run.js misc.RepathProfileImages --dryRun on
Dry run off : AWS_PROFILE=assembly-duplo-dev node build/run.js misc.RepathProfileImages --dryRun off
*/

/*
This runner script will fetch all images present directly in assembly profile images bucket and place them into their proper folder structure
(bucket/assemblyId/memberId/image.extension)
*/

import * as AWS from "aws-sdk";
import models from "../../models";
import { Runner } from "../Runner";

const s3 = new AWS.S3();
const bucketName = "duploservices-dev02-assembly-profile-image-333387423585";

export class RepathProfileImages extends Runner {
  public async run(): Promise<void> {
    this.log("Running RepathProfileImages runner");
    this.log(`options dryRun: ${this.options.dryRun}`);
    const imagesInBucket: AWS.S3.Object[] = await this.listImagesInBucket(bucketName);

    for (let i = 0; i < imagesInBucket.length; i++) {
      await this.repathImage(imagesInBucket[i]);
    }
  }

  private async listImagesInBucket(bucketName: string) {
    try {
      const data = await s3.listObjectsV2({ Bucket: bucketName, Prefix: "" }).promise();
      const images = data.Contents.filter((obj) => obj.Key.match(/\.(jpg|jpeg|png)$/));

      return images;
    } catch (error) {
      this.log(error);
      throw error;
    }
  }

  private async repathImage(image: AWS.S3.Object) {
    const user = await this.getAssemblyIdAndMemberId(image.Key);

    if (user) {
      const sourcePath = `${bucketName}/${image.Key}`;
      const destinationPath = `${user.employerId}/${user._id}/${image.Key}`;

      if (this.options.dryRun === "off") {
        try {
          const imageBody = await s3.getObject({ Bucket: bucketName, Key: image.Key }).promise();

          // Using the upload method to upload the image to the new path
          await s3
            .upload({
              Bucket: bucketName,
              Key: destinationPath,
              Body: imageBody.Body
            })
            .promise();

          this.log(`Image successfully uploaded to ${destinationPath}`);

          // Using the deleteObject method to delete the original image
          await s3
            .deleteObject({
              Bucket: bucketName,
              Key: image.Key
            })
            .promise();

          this.log(`Image successfully deleted from ${sourcePath}`);

          this.log(`Image successfully copied to ${destinationPath} and deleted from ${sourcePath}`);
        } catch (error) {
          this.log(error);
        }
      } else {
        this.log("dry run mode");
      }
    }
  }

  private async getAssemblyIdAndMemberId(imageKey: string) {
    const user = await models.User.findOne(
      { "profile.image.original.fileName": imageKey },
      { _id: 1, employerId: 1 }
    ).lean();

    return user;
  }
}
