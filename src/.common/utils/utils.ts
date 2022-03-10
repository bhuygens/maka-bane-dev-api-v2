import fs from 'fs';

export class Utils {
  static generateDate() {
    const date = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${ye}-${mo}-${da}`;
  }

  static convertBase64ToImageAndStore(
    filePath: string,
    base64Data: any,
    i: number,
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, base64Data, 'base64', (err: any) => {
        if (err) {
          reject(err);
        } else {
          i++;
          resolve(i);
        }
      });
    });
  }
}
