import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

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
import { FormationsService } from '../formations/formations.service';
import { FormationsAvailabilities } from '../../entities/formations/formations-availabilities.entity';
import {
  AnnualReviewModel,
  HomeDataModel,
  NextEventTypeEnum,
} from '../../interfaces/home/home-data.model';
import { CustomerOrdersService } from '../customer/customer-orders.service';
import { ProductsService } from '../products/products.service';
import { CustomersService } from '../customer/customers.service';

@Injectable()
export class CommonService {
  constructor(
    private formationsSubscriberService: FormationsSubscribersService,
    private formationsService: FormationsService,
    private customerOrdersService: CustomerOrdersService,
    private productsService: ProductsService,
    private customerService: CustomersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  async fetchHomeData(): Promise<HomeDataModel> {
    try {
      if (await this.cacheManager.get('dashboard_homePage')) {
        return this.cacheManager.get('dashboard_homePage');
      } else {
        // GET USERS PER DAY AND MONTH
        const userPerDay = await GoogleAnalyticsService.getGoogleAnalyticsData(
          this.getUserDayMonthParam('day'),
        );
        const userPerMonth =
          await GoogleAnalyticsService.getGoogleAnalyticsData(
            this.getUserDayMonthParam('month'),
          );

        // GET NEW CLIENTS PER DAY AND MONTH
        const newUserPerDay =
          await GoogleAnalyticsService.getGoogleAnalyticsData(
            this.getNewUserDayMonthParams('day'),
          );

        const newUserPerMonth =
          await GoogleAnalyticsService.getGoogleAnalyticsData(
            this.getNewUserDayMonthParams('month'),
          );

        // GET CATEGORIES KPI ( cares / formation / sells )
        // CARES
        const formationsSubscribersForThisMonth =
          await this.formationsSubscriberService.getFormationsSubscriptionForThisMonth(
            Utils.formatDateUs(new Date(Date.now() - 86400000 * 28)),
          );
        const formationsSubscribersForToday =
          await this.formationsSubscriberService.getFormationsSubscriptionForThisMonth(
            Utils.formatDateUs(new Date(Date.now() - 86400000)),
          );

        // FIND NEXT EVENT
        const nearestFormationAvailability: FormationsAvailabilities[] =
          await this.formationsService.getNearestFormation();
        const formationContent = await this.formationsService.getFormationById(
          nearestFormationAvailability[0].formationId,
        );
        formationContent.availabilities =
          formationContent.availabilities.filter(
            (av) => av.id === nearestFormationAvailability[0].id,
          );

        const returnedValue = {
          mainKpi: {
            totalUsers: { day: userPerDay, month: userPerMonth },
            newUsers: { day: newUserPerDay, month: newUserPerMonth },
            orders: { toPrepare: 0, total: 0 },
          },
          categoriesKpi: {
            formations: {
              month: formationsSubscribersForThisMonth,
              day: formationsSubscribersForToday,
            },
            cares: {
              day: 0,
              month: 0,
            },
            orders: {
              toPrepare: 0,
              sent: 0,
            },
          },
          nextEvent: {
            title: formationContent.name,
            date: nearestFormationAvailability[0].date,
            type: NextEventTypeEnum.FORMATION,
            participants: nearestFormationAvailability[0].subscribers.length,
          },
          annualReview: await this.getAnnualReviewData(),
        };

        await this.cacheManager.set('dashboard_homePage', returnedValue, {
          ttl: 3600, // ttl: 1h,
        });
        return returnedValue;
      }
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

  getYearlyVisitorsParams() {
    return {
      startDate: Utils.formatDateUs(
        new Date(new Date().getFullYear(), 0, 1),
      ).toString(),
      endDate: Utils.formatDateUs(new Date(Date.now())).toString(),
      dimensionMode: DimensionMode.YEAR,
      metricsMode: MetricsMode.TOTAL_USERS,
    };
  }

  async getAnnualReviewData(): Promise<AnnualReviewModel> {
    // ANNUAL REVIEWS
    const yearlyVisitors = await GoogleAnalyticsService.getGoogleAnalyticsData(
      this.getYearlyVisitorsParams(),
    );
    return {
      sells: await this.customerOrdersService.countOrders(),
      products: await this.productsService.countProducts(),
      income: 0,
      clients: await this.customerService.countCustomers(),
      caresPerformed: 0,
      formationsPerformed:
        await this.formationsSubscriberService.countSubscribers(),
      yearlyVisitors: yearlyVisitors.value,
    };
  }
}
