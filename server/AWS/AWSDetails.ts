declare var require:any
declare var module:any
const secretAccessKey = 'gCpwDXAkKzVJK1wRLsjGUw/9wsZsVU+Gkw6Ppiha';
const accessKeyId = 'AKIAYIOORNBSTDAQDX7E';
const AWS = require('aws-sdk');

var useBucket = (Bucket:string) => {
    const AWSDetails = { secretAccessKey, accessKeyId }
    const AWSParameters = { Bucket, CreateBucketConfiguration: { LocationConstraint: 'us-east-2' } }
    return new AWS.S3(AWSDetails);
}

export default useBucket;