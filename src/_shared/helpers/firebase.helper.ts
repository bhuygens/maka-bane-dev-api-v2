import { v4 as uuidv4 } from 'uuid';
import ErrorManager from '../utils/ErrorManager';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';
import { FormationsAvailabilities } from '../../entities/formations/formations-availabilities.entity';

const admin = require('firebase-admin');

export class FirebaseHelper {
  static async uploadImagesToFirebase(
    images: string[],
    itemName: string,
    type: string,
  ): Promise<string[]> {
    const uploadedImagesUrl: string[] = [];

    images.forEach((image, x = 0) => {
      const randNumber = Math.random();
      // Generate file infos
      const imageName = `${itemName}-${randNumber}.jpeg`;
      const remoteFilePath: string = this.getFilePath(type, imageName);

      const uuid = uuidv4();
      // get only base64 code
      const base64Data = image.split(',')[1];
      // connect to bucket
      const bucket = admin.storage().bucket('gs://maka-bane-dev');
      // create image buffer
      const imageBuffer = Buffer.from(base64Data, 'base64');
      const imageByteArray = new Uint8Array(imageBuffer);
      const file = bucket.file(remoteFilePath);

      const url = `https://firebasestorage.googleapis.com/v0/b/maka-bane-dev/o/${encodeURIComponent(
        remoteFilePath,
      )}?alt=media&token=${uuid}`;
      uploadedImagesUrl.push(url);

      file
        .save(imageByteArray, {
          metadata: {
            metadata: {
              firebaseStorageDownloadTokens: uuid,
            },
          },
        })
        .then(() => {})
        .catch((err: any) => {
          ErrorManager.badRequestException(
            `Unable to upload encoded file ${err}`,
          );
        });
    });
    return uploadedImagesUrl;
  }

  static async uploadFileToFirebase(
    subscriber: FormationsSubscribers,
    availability: FormationsAvailabilities,
    localFilePath: string,
    remoteFilePath: string,
  ) {
    const uuid = uuidv4();
    const bucket = admin.storage().bucket('gs://maka-bane-dev');
    await bucket.upload(localFilePath, {
      destination: remoteFilePath,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
    });
    return (
      'https://firebasestorage.googleapis.com/v0/b/' +
      bucket.name +
      '/o/formations-invoices%2F' +
      encodeURIComponent(subscriber.uuid) +
      '.pdf?alt=media&token=' +
      subscriber.uuid
    );
  }

  private static getFilePath(type: string, imageName: string) {
    switch (type) {
      case 'product':
        return `test/${imageName}`;
      case 'article':
        return `articles-images/${imageName}`;
      case 'cares':
        return `cares-images/${imageName}`;
      case 'formations':
        return `formations-images/${imageName}`;
      default:
        return `test/${imageName}`;
    }
  }
}
