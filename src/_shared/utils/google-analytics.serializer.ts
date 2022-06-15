import { MetricsMode } from '../../enum/google-analytics/metrics-mode';
import { DimensionMode } from '../../enum/google-analytics/dimension-mode';
import ErrorManager from './ErrorManager';

const GoogleAnalyticsSerializer = {
  transformGoogleAnalyticsRequest(
    metrics: string,
    dimension: string,
    response: any,
  ) {
    switch (metrics) {
      case MetricsMode.ACTIVE_DAY:
        return this.transformActiveDay(dimension, response);
      case MetricsMode.ACTIVE_MONTH:
        return this.transformActiveMonth(dimension, response);
      case MetricsMode.TOTAL_USERS:
        return this.transformTotalUsers(dimension, response);
      case MetricsMode.NEW_USERS:
        return this.transformNewUsers(dimension, response);
      default:
        throw ErrorManager.customException(
          `Metrics mode not already requested, metrics: ${metrics}, dimension: ${dimension}`,
        );
    }
  },

  transformActiveDay(dimension: string, response: GoogleAnalyticsRequestModel) {
    switch (dimension) {
      case DimensionMode.DAY:
        return {
          type: MetricsMode.ACTIVE_DAY,
          range: `days`,
          value: this.rowsReducer(response.rows),
        };
      case DimensionMode.YEAR:
        return {
          type: MetricsMode.ACTIVE_DAY,
          range: `year`,
          value: this.rowsReducer(response.rows),
        };
      default:
        throw ErrorManager.customException(
          `Dimension mode not already requested, dimension: ${dimension}`,
        );
    }
  },

  transformActiveMonth(
    dimension: string,
    response: GoogleAnalyticsRequestModel,
  ) {
    switch (dimension) {
      case DimensionMode.MONTH:
        return {
          type: MetricsMode.ACTIVE_MONTH,
          range: `month`,
          value: this.rowsReducer(response.rows),
        };
      case DimensionMode.YEAR:
        return {
          type: MetricsMode.ACTIVE_MONTH,
          range: `year`,
          value: this.rowsReducer(response.rows),
        };
      default:
        throw ErrorManager.customException(
          `Dimension mode not already requested, dimension: ${dimension}`,
        );
    }
  },
  transformNewUsers(dimension: string, response: GoogleAnalyticsRequestModel) {
    switch (dimension) {
      case DimensionMode.MONTH:
        return {
          type: MetricsMode.NEW_USERS,
          range: `month`,
          value: this.rowsReducer(response.rows),
        };
      case DimensionMode.DAY:
        return {
          type: MetricsMode.NEW_USERS,
          range: `day`,
          value: this.rowsReducer(response.rows),
        };
      default:
        throw ErrorManager.customException(
          `Dimension mode not already requested, dimension: ${dimension}`,
        );
    }
  },

  transformTotalUsers(
    dimension: string,
    response: GoogleAnalyticsRequestModel,
  ) {
    switch (dimension) {
      case DimensionMode.DAY:
        return {
          type: MetricsMode.TOTAL_USERS,
          range: 'day',
          value: this.rowsReducer(response.rows),
        };
      case DimensionMode.MONTH:
        return {
          type: MetricsMode.TOTAL_USERS,
          range: 'month',
          value: this.rowsReducer(response.rows),
        };
      case DimensionMode.YEAR:
        return {
          type: MetricsMode.TOTAL_USERS,
          range: `year`,
          value: this.rowsReducer(response.rows),
        };
      default:
        throw ErrorManager.customException(
          `Dimension mode not already requested, dimension: ${dimension}`,
        );
    }
  },

  // Reduce metrics values obtained by Google Analytics
  rowsReducer: (
    rows: [
      {
        dimensionValues: [
          {
            value: string;
            oneValue: string;
          },
        ];
        metricValues: [
          {
            value: string;
            oneValue: string;
          },
        ];
      },
    ],
  ) => {
    let initialValue = 0;
    rows.forEach((row) =>
      row.metricValues.forEach(
        (metric) => (initialValue += Number(metric.value)),
      ),
    );
    return initialValue;
  },
};

export default GoogleAnalyticsSerializer;
