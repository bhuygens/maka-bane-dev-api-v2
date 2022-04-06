import { DeliveryOptionsModel } from '../../../../enum/delivery-options.model';
import { PdfOrderInvoiceModel } from '../../../../interfaces/pdf/pdf-order-invoice.model';
import PDFDocument from 'pdfkit';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export default class PdfOrderGenerateHelper {
  static createInvoice(invoice: PdfOrderInvoiceModel, path: string) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    this.generateHeader(doc, invoice);
    this.generateCustomerInformation(doc, invoice);
    this.generateInvoiceTable(doc, invoice);
    this.generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
  }

  static generateHeader(doc: any, invoice: PdfOrderInvoiceModel) {
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
      .text(invoice.shipping.name, 200, 80, { align: 'right' })
      .fontSize(10)
      .font('Helvetica')
      .text(invoice.shipping.phone, 200, 100, { align: 'right' })
      .text(invoice.shipping.address, 200, 115, { align: 'right' })
      .text(
        `${invoice.shipping.city} - ${invoice.shipping.zipcode} - ${invoice.shipping.country}`,
        200,
        130,
        { align: 'right' },
      )
      .moveDown();
  }

  static generateCustomerInformation(doc: any, invoice: PdfOrderInvoiceModel) {
    doc.fillColor('#444444').fontSize(20).text('Facture', 50, 160);

    this.generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
      .fontSize(10)
      .text('Numéro de facture :', 50, customerInformationTop)
      .font('Helvetica-Bold')
      .text(invoice.invoiceNr, 150, customerInformationTop)
      .font('Helvetica')
      .text("Date d'émission:", 50, customerInformationTop + 15)
      .text(this.formatDate(new Date()), 150, customerInformationTop + 15)
      .text('Mode de livraison :', 50, customerInformationTop + 30)
      .text(invoice.shipping.deliveryOption, 150, customerInformationTop + 30);

    if (invoice.vatNumber) {
      doc
        .fontSize(10)
        .text('Numéro de TVA :', 50, customerInformationTop + 45)
        .text(invoice.vatNumber, 150, customerInformationTop + 45);
    }

    this.generateHr(doc, !invoice.vatNumber ? 252 : 252 + 15);
  }

  static generateInvoiceTable(doc: any, invoice: PdfOrderInvoiceModel) {
    let i;
    const invoiceTableTop = 330;

    doc.font('Helvetica-Bold');
    this.generateTableRow(
      doc,
      invoiceTableTop,
      'Id',
      'Produit',
      'Prix unitaire',
      'Quantité',
      'Total',
    );
    this.generateHr(doc, invoiceTableTop + 20);
    doc.font('Helvetica');

    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      this.generateTableRow(
        doc,
        position,
        item.ean,
        item.description,
        this.formatCurrency(item.retailPrice),
        item.quantity,
        this.formatCurrency(item.total),
      );

      this.generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    this.generateTableRow(
      doc,
      subtotalPosition,
      '',
      '',
      'Sous-total',
      '',
      this.formatCurrency(invoice.subtotal),
    );

    const promoCodePosition = subtotalPosition + 20;
    if (
      invoice.promoCodeApplied !== '' &&
      invoice.promoCodeApplied !== undefined
    ) {
      this.generateTableRow(
        doc,
        promoCodePosition,
        '',
        '',
        'Promotion',
        '',
        `${invoice.promoCodeApplied} , -${invoice.promoAmount} €`,
      );
    }
    const paidToDatePosition =
      invoice.promoCodeApplied !== ''
        ? promoCodePosition + 20
        : subtotalPosition + 20;
    this.generateTableRow(
      doc,
      paidToDatePosition,
      '',
      '',
      'Livraison',
      '',
      this.formatCurrency(
        this.getDeliveryAmount(
          invoice.shipping.deliveryOption,
          invoice.subtotal,
        ),
      ),
    );

    const totalPosition = paidToDatePosition + 25;
    doc.font('Helvetica-Bold');
    this.generateTableRow(
      doc,
      totalPosition,
      '',
      '',
      'Montant total',
      '',
      this.formatCurrency(invoice.paid),
    );
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
    item: any,
    description: any,
    unitCost: any,
    quantity: any,
    lineTotal: any,
  ) {
    doc
      .fontSize(10)
      .text(item, 50, y)
      .text(description, 150, y)
      .text(unitCost, 280, y, { width: 90, align: 'right' })
      .text(quantity, 370, y, { width: 90, align: 'right' })
      .text(lineTotal, 0, y, { align: 'right' });
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
