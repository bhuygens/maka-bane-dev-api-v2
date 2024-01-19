interface GoogleAnalyticsRequestModel {
  dimensionHeaders: [{ name: string }];
  metricHeaders: [
    {
      name: string;
      type: string;
    },
  ];
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
  ];
  totals: [];
  maximums: [];
  minimums: [];
  rowCount: number;
  metadata: {
    dataLossFromOtherRow: boolean;
    currencyCode: string;
    _currencyCode: string;
    timeZone: string;
    _timeZone: string;
  };
  propertyQuota: boolean;
  kind: string;
}
