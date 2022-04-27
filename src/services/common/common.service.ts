import { Injectable } from '@nestjs/common';
import {
  createMailToSupportModel,
  sendEmail,
  senderMailAccount,
} from '../../_shared/helpers/mailer/mailer.helper';
import ErrorManager from '../../_shared/utils/ErrorManager';

@Injectable()
export class CommonService {
  async sendMailFromContactPage({ name, email, message }) {
    try {
      const mailContent = createMailToSupportModel(name, email, message);
      // Send mail to huygens
      await sendEmail(
        senderMailAccount.NO_REPLY, // Sender
        senderMailAccount.CONTACT_HUYGENS, // Receiver
        'Un client vous a contacté !', // Subject
        mailContent, // Content
      );

      // Send mail to maka-bane
      await sendEmail(
        senderMailAccount.NO_REPLY, // Sender
        senderMailAccount.CONTACT, // Receiver
        'Un client vous a contacté !', // Subject
        mailContent, // Content
      );
    } catch (e) {
      ErrorManager.customException(e);
    }
    return {
      success: true,
    };
  }
}
