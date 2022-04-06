import ErrorManager from '../../utils/ErrorManager';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SibApiV3Sdk = require('sib-api-v3-typescript');

export enum MailType {
  ORDER_SUCCESS = 'orderSuccess',
  UNSUBSCRIBE = 'unsubscribe',
  NEW_ACCOUNT = 'newAccount',
  FORMATION_ORDER_SUCCESS = 'formationOrderSuccess',
  FORMATION_ORDER_SUCCESS_ADMIN = 'formationOrderSuccessAdmin',
}

export default class Sendinblue {
  static async sendEmailFromTemplate(
    type: string,
    to: { name: string; email: string | undefined },
    uploadUrl?: string,
    uuid?: string,
  ) {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.SENDINBLUE_APIKEY;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    // TemplateId
    sendSmtpEmail.templateId = Sendinblue.getTemplateId(type);

    // Subject
    sendSmtpEmail.subject = Sendinblue.getMailSubject(type);

    // Receiver
    sendSmtpEmail.to = [
      {
        email: `${to.email}`,
        name: `${to.name}`,
      },
    ];

    // Reply To
    sendSmtpEmail.replyTo = {
      email: 'contact@maka-bane.be',
      name: 'Contact @ Maka-Bane',
    };

    // Params
    if (type === MailType.ORDER_SUCCESS) {
      sendSmtpEmail.params = {
        customerName: to.name,
        invoiceUrl: type === MailType.ORDER_SUCCESS ? uploadUrl : null,
        orderUUID: type === MailType.ORDER_SUCCESS ? uuid : null,
      };

      // Attachment
      sendSmtpEmail.attachment = [
        {
          url: uploadUrl,
          name: `${uuid}.pdf`,
        },
      ];
    }

    await apiInstance.sendTransacEmail(sendSmtpEmail).then(
      (data: any) => {
        return data;
      },
      (error: Error) => {
        ErrorManager.customException(error.message);
      },
    );
  }

  private static getMailSubject(type: string): string {
    switch (type) {
      case MailType.ORDER_SUCCESS:
        return 'Maka-Bane : Confirmation de commande';
      case MailType.FORMATION_ORDER_SUCCESS:
        return 'Maka-Bane : Confirmation de réservation';
      case MailType.FORMATION_ORDER_SUCCESS_ADMIN:
        return 'Maka-Bane : Nouvelle réservation client pour une formation';
      case MailType.UNSUBSCRIBE:
        return 'Maka-Bane : Confirmation de désinscription';
      case MailType.NEW_ACCOUNT:
        return 'Bienvenue chez Maka-Bane';
      default:
        return 'Nouveau mail de la part de Maka-Bane';
    }
  }

  private static getTemplateId(type: string): number {
    switch (type) {
      case MailType.ORDER_SUCCESS:
        return 1;
      case MailType.FORMATION_ORDER_SUCCESS:
        return 2;
      case MailType.UNSUBSCRIBE:
        return 3;
      case MailType.NEW_ACCOUNT:
        return 4;

      default:
        return 4;
    }
  }
}
