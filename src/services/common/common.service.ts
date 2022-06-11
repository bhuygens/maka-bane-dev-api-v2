import { Injectable } from '@nestjs/common';
import {
  createMailToSupportModel,
  sendEmail,
  senderMailAccount,
} from '../../_shared/helpers/mailer/mailer.helper';
import ErrorManager from '../../_shared/utils/ErrorManager';

const { google } = require('googleapis');

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

  fetchHomeData() {
    try {
      // fetch main kpi
      // fetch categories kpi
      // fetch next event data
      // fetch annual review
      return {
        mainKpi: {},
        categoriesKpi: {},
        nextEvent: {},
        annualReview: {},
      };
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  getGoogleAnalyticsData() {
    const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
    const jwt = new google.Auth.JWT(
      process.env.CLIENT_EMAIL,
      null,
      process.env.PRIVATE_KEY,
      scopes,
    );
    const view_id = '3326850589';

    jwt.authorize((err, response) => {
      google.analytics('v3').data.ga.get(
        {
          auth: jwt,
          ids: 'ga:' + view_id,
          'start-date': '30daysAgo',
          'end-date': 'today',
          metrics: 'ga:pageviews',
        },
        (err, result) => {
          console.log(err, result);
        },
      );
    });
  }
}
