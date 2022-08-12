import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'
import { Types } from 'aws-sdk/clients/s3';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('AttachmentUtils')

// TODO: Implement the fileStogare logic
export class AttachmentUtils {
    constructor(
        private readonly s3Client: Types = new XAWS.S3({ signatureVersion: 'v4' }),
        private readonly s3BucketName = process.env.S3_BUCKET_NAME,
        private readonly signedUrlExp = process.env.SIGNED_URL_EXPIRATION) {
    }

    async generateUploadUrl(todoId: string): Promise<string> {
        logger.info("Generating URL");

        const url = this.s3Client.getSignedUrl('putObject', {
            Bucket: this.s3BucketName,
            Key: todoId,
            Expires: this.signedUrlExp,
        });
        logger.info("URL generated", url);

        return url as string;
    }
}