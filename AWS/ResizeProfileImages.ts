/*
Commands to run this script
For a specific image key : AWS_PROFILE=assembly-duplo-dev node build/run.js misc.ResizeProfileImages --imageKey '638738c818d0f1e0ff4e4cfb/638ee667b18043847dd64f9f/e8390bae-ccee-4ab3-a41c-7b191f895588.jpg' --dryRun on
For all profile images : AWS_PROFILE=assembly-duplo-dev node build/run.js misc.ResizeProfileImages --dryRun on
Dry run off : AWS_PROFILE=assembly-duplo-dev node build/run.js misc.ResizeProfileImages --dryRun off
*/

/*
This runner script will fetch all leaf nodes from s3 bucket where original profile images are stored
For each image key, it will call a lambda function that resizes the image and saves it to another s3 bucket
*/

import * as AWS from "aws-sdk";
import { Runner } from "../Runner";

const s3 = new AWS.S3();
const lambda = new AWS.Lambda({ region: "us-east-1" });
const bucketName = "duploservices-dev02-assembly-profile-image-333387423585";
const thumbnailLambda = "duploservices-dev02-thumbnail-creation-333387423585";

export class ResizeProfileImages extends Runner {
  public async run(): Promise<void> {
    this.log("Running ResizeProfileImages runner");
    this.log(`options dryRun: ${this.options.dryRun} imageKey ${this.options.imageKey}`);

    let allImages;

    if (this.options?.imageKey) {
      allImages = [{ Key: this.options?.imageKey }];
    } else {
      allImages = await this.getObjectsInBucket(bucketName);
    }

    this.log(`total images found: ${allImages.length}`);

    for (let i = 0; i < allImages.length; i++) {
      const lambdaPayload = { keys: allImages[i].Key };

      await this.triggerThumbnailLambda(lambdaPayload);
    }
  }

  private async getObjectsInBucket(bucketName: string): Promise<AWS.S3.Object[]> {
    try {
      const objects: AWS.S3.Object[] = [];

      let continuationToken: string | undefined = undefined;

      do {
        const response: AWS.S3.ListObjectsV2Output = await s3
          .listObjectsV2({
            Bucket: bucketName,
            ContinuationToken: continuationToken
          })
          .promise();

        response.Contents?.forEach((object) => {
          if (object.Key && object.Key.match(/\.(jpg|jpeg|png)$/)) {
            objects.push(object);
          }
        });

        continuationToken = response.NextContinuationToken;
      } while (continuationToken);

      this.log(`Successfully fetched images from bucket ${bucketName}`);
      return objects;
    } catch (error) {
      this.log(error);
      throw error;
    }
  }

  private async triggerThumbnailLambda(lambdaPayload) {
    try {
      this.log(`triggering thumbnail lambda for ${JSON.stringify(lambdaPayload)}`);

      const params: AWS.Lambda.Types.InvocationRequest = {
        FunctionName: thumbnailLambda,
        Payload: JSON.stringify(lambdaPayload)
      };

      if (this.options.dryRun === "off") {
        await lambda.invoke(params).promise();

        this.log(`thumbnail lambda successful for ${JSON.stringify(lambdaPayload)}`);
      } else {
        this.log("dry run mode");
      }
    } catch (error) {
      this.log(error);
    }
  }
}
