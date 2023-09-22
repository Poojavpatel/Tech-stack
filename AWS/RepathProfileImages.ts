/*
Commands to run this script
Dry run on : AWS_PROFILE= node build/run.js misc.RepathProfileImages --dryRun on
Dry run off : AWS_PROFILE= node build/run.js misc.RepathProfileImages --dryRun off
*/

/*
This runner script will fetch all images present directly in _ profile images bucket and place them into their proper folder structure
(bucket/_Id/memberId/image.extension)
*/

import * as AWS from "aws-sdk";
import AppConfig from "../../config/AppConfig";
import models from "../../models";
import { Runner } from "../Runner";

const s3 = new AWS.S3();
const bucketName = AppConfig.AWS.S3.PROFILE_BUCKET;

export class RepathProfileImages extends Runner {
  public async run(): Promise<void> {
    this.log("Running RepathProfileImages runner");
    this.log(`options dryRun: ${this.options.dryRun}`);
    const chunkSize = 1000;
    const users = [];
    const imagesInBucket: AWS.S3.Object[] = await this.listImagesInBucket(bucketName);

    this.log(`Total imagesInBucket: ${imagesInBucket.length}`);

    const imageKeysArray = imagesInBucket.map((imageObject) => imageObject.Key);
    const numChunks = Math.ceil(imageKeysArray.length / chunkSize);

    for (let i = 0; i < numChunks; i++) {
      const startIndex = i * chunkSize;
      const endIndex = Math.min(startIndex + chunkSize, imageKeysArray.length);
      const chunk = imageKeysArray.slice(startIndex, endIndex);
      const chunkUsers = await this.getUsers(chunk);

      users.push(...chunkUsers);
    }

    this.log(`Total users with matching image keys: ${users.length}`);

    for (let i = 0; i < users.length; i++) {
      await this.repathImage(users[i]);
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

  private async repathImage(user) {
    const imageKey = user.profile.image.original.fileName;

    const sourcePath = `${bucketName}/${imageKey}`;
    const destinationPath = `${user.employerId}/${user._id}/${imageKey}`;

    this.log(`Moving image from ${sourcePath} to ${destinationPath}`);

    if (this.options.dryRun === "off") {
      try {
        const imageBody = await s3.getObject({ Bucket: bucketName, Key: imageKey }).promise();

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
            Key: imageKey
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

  private async getUsers(imageKeysArray: string[]) {
    const users = await models.User.find(
      { "profile.image.original.fileName": { $in: imageKeysArray } },
      { _id: 1, employerId: 1, "profile.image.original.fileName": 1 }
    ).lean();

    return users;
  }
}
