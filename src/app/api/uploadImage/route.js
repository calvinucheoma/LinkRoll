import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import uniqid from 'uniqid';

export const POST = async (req) => {
  const formData = await req.formData();

  if (formData.has('image')) {
    try {
      const image = formData.get('image');

      // Create S3 client with the correct region and endpoint
      const s3Client = new S3Client({
        region: 'eu-north-1', // Ensure this matches your bucket's region
        endpoint: `https://s3.eu-north-1.amazonaws.com`, // Specify the correct endpoint
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
      });

      // Generate a unique name for the uploaded image
      const randomId = uniqid();
      const ext = image.name.split('.').pop();
      const newImageName = `${randomId}.${ext}`;
      // console.log(newImageName);

      // Get the bucket name from environment variables
      const bucketName = process.env.BUCKET_NAME;

      // Read the image stream and collect the chunks
      const chunks = [];

      for await (const chunk of image.stream()) {
        chunks.push(chunk);
      }

      // Upload the image to S3
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newImageName,
          ACL: 'public-read', // Make the uploaded image publicly accessible
          Body: Buffer.concat(chunks),
          ContentType: image.type,
        })
      );

      // Generate the URL for the uploaded image
      const link = `https://${bucketName}.s3.amazonaws.com/${newImageName}`;

      return Response.json(link);
    } catch (error) {
      console.log(error);
      return Response.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      );
    }
  }

  return Response.json({ error: 'No image provided' }, { status: 400 });
};
