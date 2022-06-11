export interface FormationPaymentObjectModel {
  mainKpi: MainKpiModel;
  categoriesKpi: CategoriesKpiModel;
  nextEvent: NextEventModel;
  annualReview: AnnualReviewModel;
}

interface MainKpiModel {
  monthlyVisitors: number;
  ordersToPrepare: number;
  monthlyNewClients: number;
}

interface CategoriesKpiModel {
  orders: {
    toPrepare: number;
    sent: number;
  };
  formations: {
    monthlyClient: number;
    annualClient: number;
  };
  cares: {
    monthlyClient: number;
    annualClient: number;
  };
}

interface NextEventModel {
  title: string;
  date: string;
  type: NextEventTypeEnum;
  participants: number;
  eventUrl: string;
}

interface AnnualReviewModel {
  orders: number;
  products: number;
  income: number;
  clients: number;
  caresPerformed: number;
  formationsPerformed: number;
}


enum NextEventTypeEnum {
  CARE = 'care',
  FORMATION = 'formation',
}
