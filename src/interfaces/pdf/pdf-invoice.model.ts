export interface PdfInvoiceModel {
  shipping: {
    name: string;
    address: string;
    city: string;
    country: string;
    zipcode: string;
    phone: string;
    deliveryOption: string;
  };
  items: PdfInvoiceItemModel[];
  subtotal: number;
  invoiceNr: string;
  paid: number;
  priceWithPromo?: number;
  promoCodeApplied?: string;
  promoType?: string;
  promoAmount?: number;
  vatNumber?: string;
}

export interface PdfInvoiceItemModel {
  item: string;
  ean: string;
  quantity: string;
  description: string;
  retailPrice: number;
  total: number;
}
