export interface OrderInfosModel {
  delivery: OrderDeliveryModel;
  billing: OrderBillingModel;
  products: OrderProductsModel[];
  pricing: OrderPricingModel;
}

export interface OrderDeliveryModel {
  lastname: string;
  firstname: string;
  address: string;
  city: string;
  zipcode: string;
  phone: string;
  country: string;
  deliveryOption: string;
}

export interface OrderBillingModel {
  lastname: string;
  firstname: string;
  address: string;
  city: string;
  zipcode: string;
  phone: string;
  country: string;
  vatNumber: string;
}

export interface OrderProductsModel {
  name: string;
  retailPrice: number;
  currentStock: number;
  id: number;
  category: string;
  quantity: number;
}

export interface OrderPricingModel {
  priceWithoutPromo: number;
  priceWithPromo: number;
  promoCodeApplied: string;
  promoType: string;
  promoAmount: number;
  totalAmount: number;
}
