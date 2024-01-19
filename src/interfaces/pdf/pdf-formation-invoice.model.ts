export interface PdfFormationInvoiceModel {
  date: Date;
  hour: string;
  place: string;
  uuid: string;
  numberPersons: number;
  depositDate: Date;
  clientId: number;
  price: number;
  name: string;
  subscribers: {
    email: string;
    lastname: string;
    firstname: string;
    city: string;
    address: string;
    country: string;
    zipcode: number;
  };
  formation: {
    id: number;
    name: string;
  };
}


