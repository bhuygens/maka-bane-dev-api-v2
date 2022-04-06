import { PdfInvoiceItemModel, PdfOrderInvoiceModel } from '../../../../interfaces/pdf/pdf-order-invoice.model';
import Pdf from './pdf-order-generate.helper';
import ErrorManager from '../../../utils/ErrorManager';
import * as PDFDocument from 'pdfkit';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../../../../entities/customer/customers.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { CustomerOrders } from '../../../../entities/customer/customer-orders.entity';

export default class PdfOrderModel {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) {}

  // set model for order
  static setOrderInvoiceModel(order: CustomerOrders): PdfOrderInvoiceModel {
    // format each bought product
    const productsFormatted = [];
    order.orderData.products.forEach((product: any) => {
      const newProduct: PdfInvoiceItemModel = {
        item: product.name,
        ean: product.id,
        quantity: product.quantity,
        description: product.name,
        retailPrice: product.retail_price,
        total: product.retail_price * product.quantity,
      };
      productsFormatted.push(newProduct);
    });

    const invoiceObject: PdfOrderInvoiceModel = {
      invoiceNr: order.uuid,
      items: productsFormatted,
      shipping: {
        city: order.orderData.billing.city,
        name: `${order.orderData.billing.lastname} - ${order.orderData.billing.firstname}`,
        address: order.orderData.billing.address,
        country: order.orderData.billing.country,
        zipcode: order.orderData.billing.zipcode,
        phone: order.orderData.billing.phone,
        deliveryOption: order.orderData.delivery.deliveryOption,
      },
      subtotal: order.orderData.pricing.priceWithoutPromo,
      paid: order.orderData.pricing.totalAmount,
    };

    // if a promo is applied -> add it to object
    if (order.orderData.pricing.promoCodeApplied !== '') {
      invoiceObject.promoCodeApplied = order.orderData.pricing.promoCodeApplied;
      invoiceObject.priceWithPromo = order.orderData.pricing.priceWithPromo;
      invoiceObject.promoAmount = order.orderData.pricing.promoAmount;
      invoiceObject.promoType = order.orderData.pricing.promoType;
    }

    if (order.orderData.billing.vatNumber !== null) {
      invoiceObject.vatNumber = order.orderData.billing.vatNumber;
    }
    return invoiceObject;
  }


  static async generatePdf(
    invoiceObject: PdfOrderInvoiceModel,
    filePath: any,
  ): Promise<string> {
    const doc = new PDFDocument({ margin: 25 });
    try {
      Pdf.generateHeader(doc, invoiceObject);
      Pdf.generateCustomerInformation(doc, invoiceObject);
      Pdf.generateInvoiceTable(doc, invoiceObject);
      // Pdf.generateFooter(doc);

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
