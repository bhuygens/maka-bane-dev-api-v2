import { MetricsMode } from '../../enum/google-analytics/metrics-mode';

export interface FormationPaymentObjectModel {
  mainKpi: MainKpiModel;
  categoriesKpi: CategoriesKpiModel;
  nextEvent: NextEventModel;
  annualReview: AnnualReviewModel;
}

export interface MainKpiModel {
  totalUsers: { day: number; month: number };
  newUsers: { day: number; month: number };
}

export interface CategoriesKpiModel {
  orders: {
    toPrepare: number;
    sent: number;
  };
  formations: {
    month: number;
    day: number;
  };
  cares: {
    day: number;
    month: number;
  };
}

export interface NextEventModel {
  title: string;
  date: Date;
  type: NextEventTypeEnum;
  participants: number;
}

export interface AnnualReviewModel {
  sells: number;
  products: number;
  income: number;
  clients: number;
  caresPerformed: number;
  formationsPerformed: number;
  yearlyVisitors: number;
}

export enum NextEventTypeEnum {
  CARE = 'care',
  FORMATION = 'formation',
}
