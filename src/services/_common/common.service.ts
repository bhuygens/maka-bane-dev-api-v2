import { Injectable } from '@nestjs/common';
import {
  createMailToSupportModel,
  sendEmail,
  senderMailAccount,
} from '../../_shared/helpers/mailer/mailer.helper';
import ErrorManager from '../../_shared/utils/ErrorManager';
import { MetricsMode } from '../../enum/google-analytics/metrics-mode';
import { DimensionMode } from '../../enum/google-analytics/dimension-mode';
import { Utils } from '../../_shared/utils/utils';
import { GoogleAnalyticsService } from './google-analytics/google-analytics.service';
import { FormationsSubscribersService } from '../formations/formations-subscribers.service';

@Injectable()
export class CommonService {
  constructor(
    private formationsSubscriberService: FormationsSubscribersService,
  ) {}

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

  async fetchHomeData() {
    try {
      // GET USERS PER DAY AND MONTH
      const userPerDay = await GoogleAnalyticsService.getGoogleAnalyticsData(
        this.getUserDayMonthParam('day'),
      );
      const userPerMonth = await GoogleAnalyticsService.getGoogleAnalyticsData(
        this.getUserDayMonthParam('month'),
      );

      // GET NEW CLIENTS PER DAY AND MONTH
      const newUserPerDay = await GoogleAnalyticsService.getGoogleAnalyticsData(
        this.getNewUserDayMonthParams('day'),
      );

      const newUserPerMonth =
        await GoogleAnalyticsService.getGoogleAnalyticsData(
          this.getNewUserDayMonthParams('month'),
        );
      // TODO: fetch orders to prepare

      // GET CATEGORIES KPI ( cares / formation / sells )
      // CARES
      const formationsSubscribersForThisMonth =
        await this.formationsSubscriberService.getFormationAvailabilitiesForThisMonth(
          Utils.formatDateUs(new Date(Date.now() - 86400000 * 28)),
        );
      const formationsSubscribersForToday =
        await this.formationsSubscriberService.getFormationAvailabilitiesForThisMonth(
          Utils.formatDateUs(new Date(Date.now() - 86400000)),
        );
      // fetch next event data
      // fetch annual review

      return {
        mainKpi: {
          totalUsers: { day: userPerDay, month: userPerMonth },
          newUsers: { day: newUserPerDay, month: newUserPerMonth },
        },
        categoriesKpi: {
          formations: {
            month: formationsSubscribersForThisMonth,
            day: formationsSubscribersForToday,
          },
          cares: {
            month: 0,
            day: 0,
          },
          sells: {
            month: 0,
            day: 0,
          },
        },
        nextEvent: {},
        annualReview: {},
      };
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  getUserDayMonthParam(type: string) {
    return type === 'day'
      ? {
        startDate: Utils.formatDateUs(
          new Date(Date.now() - 86400000), // get last day
        ).toString(),
        endDate: Utils.formatDateUs(new Date(Date.now())).toString(),
        dimensionMode: DimensionMode.DAY,
        metricsMode: MetricsMode.TOTAL_USERS,
      }
      : {
        startDate: Utils.formatDateUs(
          new Date(Date.now() - 86400000 * 28), // get last 28 days
        ).toString(),
        endDate: Utils.formatDateUs(new Date(Date.now())).toString(),
        dimensionMode: DimensionMode.MONTH,
        metricsMode: MetricsMode.TOTAL_USERS,
      };
  }

  getNewUserDayMonthParams(type: string) {
    return type === 'day'
      ? {
        startDate: Utils.formatDateUs(
          new Date(Date.now() - 86400000), // get last day
        ).toString(),
        endDate: Utils.formatDateUs(new Date(Date.now())).toString(),
        dimensionMode: DimensionMode.DAY,
        metricsMode: MetricsMode.NEW_USERS,
      }
      : {
        startDate: Utils.formatDateUs(
          new Date(Date.now() - 86400000 * 28), // get last 28 days
        ).toString(),
        endDate: Utils.formatDateUs(new Date(Date.now())).toString(),
        dimensionMode: DimensionMode.MONTH,
        metricsMode: MetricsMode.NEW_USERS,
      };
  }
}
