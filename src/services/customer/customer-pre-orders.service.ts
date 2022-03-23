import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerPreOrders } from '../../entities/customer/customer-pre-orders.entity';
import { Repository } from 'typeorm';
import CustomerPreOrderDto from '../../dto/customers/customer-pre-order.dto';
import { v4 as uuidv4 } from 'uuid';
import { Customers } from '../../entities/customer/customers.entity';
import { CustomerOrders } from '../../entities/customer/customer-orders.entity';
import PdfCreationHelper from '../../_shared/helpers/pdf/pdf-creation.helper';
import ErrorManager from '../../_shared/utils/ErrorManager';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import { CustomersService } from './customers.service';

@Injectable()
export class CustomerPreOrdersService {
  constructor(
    @InjectRepository(CustomerPreOrders)
    private readonly customerPreOrdersRepository: Repository<CustomerPreOrders>,
    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,
    @InjectRepository(CustomerOrders)
    private readonly customerOrdersRepository: Repository<CustomerOrders>,
    private readonly customerService: CustomersService,
  ) {}

  async storeCustomerPreOrder(customerPreOrder: CustomerPreOrderDto) {
    const uuid = uuidv4();

    // Store customerPreOrderToDb
    const preOrder = this.customerPreOrdersRepository.create(customerPreOrder);
    preOrder.orderDate = new Date();
    preOrder.uuid = uuid;
    preOrder.vatIncludedPrice = customerPreOrder.price;
    await this.customerPreOrdersRepository.save(preOrder);

    // Update customer infos
    await this.customerService.updateCustomerInfosAfterOrder(
      customerPreOrder.customerId,
      customerPreOrder.orderData.delivery,
      customerPreOrder.orderData.billing,
    );

    return {
      success: true,
      uuid,
    };
  }

  async moveOrderToPaid(
    paymentIntentId: string,
    cardOwner: string,
  ): Promise<string> {
    // Find preOrder data
    const orderToMove = await this.customerPreOrdersRepository.findOne({
      paymentIntentId,
    });

    if (orderToMove) {
      // create paid order
      const newOrder = this.customerOrdersRepository.create(orderToMove);

      // Generate order invoice model
      const invoiceObject = PdfCreationHelper.setOrderInvoiceModel(newOrder);
      const filePath = `invoices/${newOrder.uuid}.pdf`;
      await PdfCreationHelper.generatePdf(invoiceObject, filePath);

      // Upload pdf to bucket
      const firebaseFilePath = `customer-orders-invoices/${newOrder.uuid}.pdf`;
      const uuid = uuidv4();
      const bucket = admin.storage().bucket('maka-bane-dev');
      const invoiceUrl = await bucket
        .upload(filePath, {
          destination: firebaseFilePath,
          metadata: {
            cacheControl: 'public, max-age=31536000',
            firebaseStorageDownloadTokens: newOrder.uuid,
          },
        })
        .then((data: any) => {
          const file = data[0];

          // Remove tmp invoice stored in api
          fs.unlinkSync(filePath);
          // Return generated invoice url
          return (
            'https://firebasestorage.googleapis.com/v0/b/' +
            bucket.name +
            '/o/' +
            encodeURIComponent(file.name) +
            '?alt=media&token=' +
            uuid
          );
        });

      // save paid order to db
      newOrder.cardOwner = cardOwner;
      newOrder.invoiceUrl = invoiceUrl;
      await this.customerOrdersRepository.save(newOrder);
      return invoiceUrl;
    } else {
      ErrorManager.customException(
        `Impossible to move order to paid: not found`,
      );
    }
  }
}
