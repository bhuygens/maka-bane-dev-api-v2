import { PdfOrderInvoiceModel } from '../../../../interfaces/pdf/pdf-order-invoice.model';
import PdfFormationGenerateHelper from './pdf-formation-generate.helper';
import ErrorManager from '../../../utils/ErrorManager';
import * as PDFDocument from 'pdfkit';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../../../../entities/customer/customers.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { FormationsSubscribers } from '../../../../entities/formations/formations-subscribers.entity';
import { FormationsAvailabilities } from '../../../../entities/formations/formations-availabilities.entity';
import { PdfFormationInvoiceModel } from '../../../../interfaces/pdf/pdf-formation-invoice.model';
import { Formations } from '../../../../entities/formations/formations.entity';

export default class PdfFormationModel {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) {}

  // set model for formation
  static setFormationInvoiceModel(
    formation: Formations,
    formationSubscriber: FormationsSubscribers,
    availability: FormationsAvailabilities,
  ): PdfFormationInvoiceModel {
    return {
      formation: {
        id: formation.id,
        name: formation.name,
      },
      clientId: formationSubscriber.customerId,
      subscribers: {
        city: formationSubscriber.paymentObject.customerBillingCity,
        country: formationSubscriber.paymentObject.customerBillingCountry,
        email: formationSubscriber.paymentObject.customerEmail,
        firstname: formationSubscriber.paymentObject.customerFirstname,
        address: formationSubscriber.paymentObject.customerBillingAddress,
        lastname: formationSubscriber.paymentObject.customerLastname,
        zipcode: formationSubscriber.paymentObject.customerBillingZipcode,
      },
      date: availability.date,
      hour: availability.hour,
      depositDate: formationSubscriber.depositDate,
      uuid: formationSubscriber.uuid,
      numberPersons: formationSubscriber.numberPersons,
      place: availability.place2.address,
      price: parseFloat(String(formationSubscriber.price)),
      name: formation.name,
    };
  }


  static async generatePdf(
    invoiceObject: PdfFormationInvoiceModel,
    filePath: any,
  ): Promise<string> {
    const doc = new PDFDocument({ margin: 25 });
    try {
      PdfFormationGenerateHelper.generateHeader(doc, invoiceObject);
      PdfFormationGenerateHelper.generateCustomerInformation(
        doc,
        invoiceObject,
      );
      PdfFormationGenerateHelper.generateInvoiceTable(doc, invoiceObject);
      // PdfFormationGenerateHelper.generateFooter(doc);

      return new Promise((resolve: any, reject: any) => {
        doc
          .pipe(fs.createWriteStream(filePath))
          .on('finish', () => {
            return resolve(null);
          })
          .on('error', (e: Error) => {
            return reject(e);
          });
        // Close PDF and write file.
        doc.end();
      });
    } catch (e) {
      ErrorManager.customException(e);
    }
  }
}
