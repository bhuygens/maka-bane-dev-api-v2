import { Injectable } from '@nestjs/common';
import {
  createMailToSupportModel,
  sendEmail,
  senderMailAccount,
} from '../../_shared/helpers/mailer/mailer.helper';
import ErrorManager from '../../_shared/utils/ErrorManager';

import { google } from 'googleapis';
import firebase from 'firebase';

/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { GoogleAnalyticsDto } from '../../dto/_common/google-analytics.dto';
import { MetricsMode } from '../../enum/google-analytics/metrics-mode';
import { DimensionMode } from '../../enum/google-analytics/dimension-mode';

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

  fetchHomeData(googleModel: GoogleAnalyticsDto) {
    try {
      // fetch main kpi
      // TODO : connect to google analytics
      this.isMetricsModeValid(googleModel.metricsMode);
      this.isDimensionModeValid(googleModel.dimensionMode);

      return this.getGoogleAnalyticsData(googleModel);

      // fetch categories kpi ( cares / formation / sells )
      // fetch next event data
      // fetch annual review

      /*return {
        mainKpi: {},
        categoriesKpi: {},
        nextEvent: {},
        annualReview: {},
      };

       */
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  getGoogleAnalyticsData(googleModel: GoogleAnalyticsDto) {
    // Using a default constructor instructs the client to use the credentials
    // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
    const analyticsDataClient = new BetaAnalyticsDataClient();

    return analyticsDataClient.runReport({
      property: `properties/${process.env.PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: googleModel.startDate,
          endDate: googleModel.endDate,
        },
      ],
      dimensions: [
        {
          name: googleModel.dimensionMode,
        },
      ],
      metrics: [
        {
          name: googleModel.metricsMode,
        },
      ],
    });
    /* console.log('Report result:');
    response.rows.forEach((row) => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });
    */
  }


  isMetricsModeValid(metricsMode: string) {
    if ((<any>Object).values(MetricsMode).includes(metricsMode)) {
      return true;
    } else {
      throw ErrorManager.customException('Metrics mode does not exist');
    }
  }

  isDimensionModeValid(dimensionMode: string) {
    if ((<any>Object).values(DimensionMode).includes(dimensionMode)) {
      return true;
    } else {
      throw ErrorManager.customException('Dimension mode does not exist');
    }
  }
}
