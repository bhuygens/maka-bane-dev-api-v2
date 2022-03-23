export interface OrderInfosModel {
  delivery: OrderDeliveryDto;
  billing: OrderBillingDto;
  products: OrderProductsDto[];
  pricing: OrderPricingDto;
}

interface OrderDeliveryDto {
  lastname: string;
  firstname: string;
  address: string;
  city: string;
  zipcode: string;
  phone: string;
  country: string;
  deliveryOption: string;
}

interface OrderBillingDto {
  lastname: string;
  firstname: string;
  address: string;
  city: string;
  zipcode: string;
  phone: string;
  country: string;
  vatNumber: string;
}

interface OrderProductsDto {
  name: string;
  retailPrice: number;
  currentStock: number;
  id: number;
  category: string;
  quantity: number;
}

interface OrderPricingDto {
  priceWithoutPromo: number;
  priceWithPromo: number;
  promoCodeApplied: string;
  promoType: string;
  promoAmount: number;
  totalAmount: number;
}
