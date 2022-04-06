import { DeliveryOptionsModel } from '../../../../enum/delivery-options.model';
import PDFDocument from 'pdfkit';
import { PdfFormationInvoiceModel } from '../../../../interfaces/pdf/pdf-formation-invoice.model';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export default class PdfFormationGenerateHelper {
  static createInvoice(invoice: PdfFormationInvoiceModel, path: string) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    this.generateHeader(doc, invoice);
    this.generateCustomerInformation(doc, invoice);
    this.generateInvoiceTable(doc, invoice);
    this.generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
  }

  static generateHeader(doc: any, invoice: PdfFormationInvoiceModel) {
    doc
      .image('logo.png', 50, 45, { width: 50 })
      .fillColor('#444444')
      .fontSize(20)
      .text('Maka-Bane', 110, 57)
      .fontSize(10)
      .text('Rue de Mons, 120b', 110, 80)
      .text('7011 Mons, Belgique', 110, 95)
      .fontSize(14)
      .font('Helvetica-Bold')
      .text(
        `${invoice.subscribers.lastname} - ${invoice.subscribers.firstname}`,
        200,
        80,
        { align: 'right' },
      )
      .fontSize(10)
      .font('Helvetica')
      .text(invoice.subscribers.address, 200, 115, { align: 'right' })
      .text(
        `${invoice.subscribers.city} - ${invoice.subscribers.zipcode} - ${invoice.subscribers.country}`,
        200,
        130,
        { align: 'right' },
      )
      .moveDown();
  }

  static generateCustomerInformation(
    doc: any,
    invoice: PdfFormationInvoiceModel,
  ) {
    doc
      .fillColor('#444444')
      .fontSize(20)
      .text('Souscription à une formation', 50, 160);

    this.generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
      .fontSize(10)
      .text('Numéro de facture :', 50, customerInformationTop)
      .font('Helvetica-Bold')
      .text(invoice.uuid, 150, customerInformationTop)
      .font('Helvetica')
      .text('Date d\'émission:', 50, customerInformationTop + 15)
      .text(this.formatDate(new Date()), 150, customerInformationTop + 15);

    /*
    if (invoice.vatNumber) {
      doc
        .fontSize(10)
        .text('Numéro de TVA :', 50, customerInformationTop + 45)
        .text(invoice.vatNumber, 150, customerInformationTop + 45);
    }
     */

    // this.generateHr(doc, !invoice.vatNumber ? 252 : 252 + 15);
    this.generateHr(doc, 252);
  }

  static generateInvoiceTable(doc: any, invoice: PdfFormationInvoiceModel) {
    const invoiceTableTop = 330;

    doc.font('Helvetica-Bold');
    this.generateTableRow(
      doc,
      invoiceTableTop,
      'Id',
      'Nom de la formation',
      'Nombre de personnes',
      'Reste à payer',
      'Montant Total',
    );
    this.generateHr(doc, invoiceTableTop + 20);
    doc.font('Helvetica');

    const position = invoiceTableTop + 30;
    this.generateTableRow(
      doc,
      position,
      invoice.formation.id,
      invoice.formation.name,
      invoice.numberPersons,
      `${invoice.price / 2} €`,
      `${invoice.price} €`,
    );

    this.generateHr(doc, position + 20);

    const subtotalPosition = invoiceTableTop + 30;
    this.generateTableRow(doc, subtotalPosition, '', '', '', '', '');

    const promoCodePosition = subtotalPosition + 20;

    const paidToDatePosition = promoCodePosition + 20;
    const totalPosition = paidToDatePosition + 25;
    doc.font('Helvetica-Bold');
    this.generateTableRow(doc, totalPosition, '', '', '', '', '');
    doc.font('Helvetica');
  }

  static generateFooter(doc: any) {
    doc
      .fontSize(10)
      .text(
        'Payment is due within 15 days. Thank you for your business.',
        50,
        780,
        { align: 'center', width: 500 },
      );
  }

  static generateTableRow(
    doc: any,
    y: any,
    id: number | string,
    name: string,
    numberPersons: number | string,
    depositPrice: number | string,
    price: number | string,
  ) {
    doc
      .fontSize(10)
      .text(id, 50, y)
      .text(name, 70, y, { width: 200, align: 'left' })
      .text(numberPersons, 300, y, { width: 120, align: 'center' })
      .text(depositPrice, 420, y, { width: 100, align: 'center' })
      .text(price, 480, y, { width: 90, align: 'right' });
  }

  static generateHr(doc: any, y: number) {
    doc
      .strokeColor('#aaaaaa')
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(575, y)
      .stroke();
  }

  static formatCurrency(cents: number) {
    return cents + ' €';
  }

  static formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return day + '/' + month + '/' + year;
  }

  static getDeliveryAmount(deliveryType: string, orderAmount: number) {
    switch (deliveryType) {
      case 'bpost':
        return orderAmount < 59 ? DeliveryOptionsModel.BPOST : 0;
      case 'mondialRelay':
        return orderAmount < 89 ? DeliveryOptionsModel.MONDIALRELAY : 0;
      case 'clickAndCollect':
        return DeliveryOptionsModel.CLICKANDCO;
      default:
        return 0;
    }
  }
}
