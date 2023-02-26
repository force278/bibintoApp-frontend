require('dotenv').config()

import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)



const bucketName = "bibinto"
const accessKeyId = "kbkYr7KesPe6jUu6oDMuGd"
const secretAccessKey = "b6ads8oXzqux1GEV93bNMm5MJuPxpHNFUTpTFYZ74k3S"


const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
  region: "ru-central1",
  signatureVersion: 'v4',
  endpoint: 'https://hb.bizmrg.com/'
})

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 100
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}