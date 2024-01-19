import { Injectable } from '@nestjs/common';
import { GoogleAnalyticsDto } from '../../../dto/_common/google-analytics.dto';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { Utils } from '../../../_shared/utils/utils';
import GoogleAnalyticsSerializer from '../../../_shared/utils/google-analytics.serializer';
import { MetricsMode } from '../../../enum/google-analytics/metrics-mode';
import { DimensionMode } from '../../../enum/google-analytics/dimension-mode';
import ErrorManager from '../../../_shared/utils/ErrorManager';

@Injectable()
export class GoogleAnalyticsService {
  static async getGoogleAnalyticsData(googleModel: GoogleAnalyticsDto) {
    // Using a default constructor instructs the client to use the credentials
    // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
    const analyticsDataClient = new BetaAnalyticsDataClient();

    const [result] = await analyticsDataClient.runReport({
      property: `properties/${process.env.PROPERTY_ID}`,
      dateRanges: [
        {
          startDate:
            googleModel.startDate ??
            Utils.formatDateUs(
              new Date(new Date().getFullYear(), 0, 1),
            ).toString(), // default : first day of the year
          endDate:
            googleModel.endDate ?? Utils.formatDateUs(new Date()).toString(), // default: today
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
    return GoogleAnalyticsSerializer.transformGoogleAnalyticsRequest(
      googleModel.metricsMode,
      googleModel.dimensionMode,
      result,
    );
  }

  static isMetricsAndDimensionsModeValid(
    metricsMode: string,
    dimensionsMode: string,
  ) {
    if (
      (<any>Object).values(MetricsMode).includes(metricsMode) &&
      (<any>Object).values(DimensionMode).includes(dimensionsMode)
    ) {
      return true;
    } else {
      throw ErrorManager.customException('Metrics mode does not exist');
    }
  }
}
