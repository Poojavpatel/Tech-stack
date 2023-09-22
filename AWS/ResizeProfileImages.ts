/* eslint-disable @typescript-eslint/no-floating-promises */
/*
This runner script will fetch all leaf nodes from s3 bucket where original profile images are stored
For each image key, it will call a lambda function that resizes the image and saves it to another s3 bucket
*/

/*
Commands to run this script
For a specific image key : AWS_PROFILE=_-duplo-dev node build/run.js misc.createProfileThumbnails.ResizeProfileImages --imageKey '638738c818d0f1e0ff4e4cfb/638ee667b18043847dd64f9f/e8390bae-ccee-4ab3-a41c-7b191f895588.jpg' --dryRun on
For all profile images : AWS_PROFILE=_-duplo-dev node build/run.js misc.createProfileThumbnails.ResizeProfileImages --dryRun on
Dry run off : AWS_PROFILE=_-duplo-dev node build/run.js misc.createProfileThumbnails.ResizeProfileImages --dryRun off

refer - https://join_.atlassian.net/wiki/spaces/TKBP/pages/763887882/Execute+runners+via+postman
API [POST]: <host>/api/v2/superadmin/run
API Body:
{
  name: "misc.createProfileThumbnails.ResizeProfileImages"
  "options": {
    "imageKey": '638738c818d0f1e0ff4e4cfb/638ee667b18043847dd64f9f/e8390bae-ccee-4ab3-a41c-7b191f895588.jpg',
    "dryRun": "on | off"
  }
}
*/

import AppConfig from "../../../config/AppConfig";
import { Runner } from "../../Runner";
import { GetBucketObjectsJob } from "./executors/GetBucketObjectsJob";
import { TriggerProfileThumbnailLambdaJob } from "./executors/TriggerProfileThumbnailLambdaJob";

const bucketName = AppConfig.AWS.S3.PROFILE_BUCKET;

export class ResizeProfileImages extends Runner {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async run(): Promise<void> {
    this.log("Running ResizeProfileImages runner");

    this.log(`options dryRun: ${this.options.dryRun} imageKey ${this.options.imageKey}`);

    if (this.options?.imageKey) {
      await this.submitProfileThumbnailLambdaJob(this.options?.imageKey);
      return;
    }

    await this.submitGetBucketObjectJob(bucketName);
  }

  private async submitProfileThumbnailLambdaJob(imageKey: string): Promise<void> {
    const hasDoubleSlash = /\/.*\//.test(imageKey);

    if (!hasDoubleSlash) {
      this.log(`Skipping ${imageKey} as it on wrong path`);
      return;
    }

    const job = TriggerProfileThumbnailLambdaJob.create({
      dryRun: this.options.dryRun,
      imageKey: imageKey
    });

    await job.submit();
    this.log(`TriggerProfileThumbnailLambdaJob job submitted for imageKey: ${imageKey}`);
  }

  private async submitGetBucketObjectJob(bucketName: string): Promise<void> {
    const job = GetBucketObjectsJob.create({
      dryRun: this.options.dryRun,
      bucketName: bucketName
    });

    await job.submit();

    this.log(`GetBucketObjectsJob job submitted for bucketName: ${bucketName}`);
  }
}
