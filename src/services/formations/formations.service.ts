import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Formations } from '../../entities/formations/formations.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreateFormationDto } from '../../dto/formations/create-formation.dto';
import ErrorManager from '../../_shared/utils/ErrorManager';
import { UpdateFormationDto } from '../../dto/formations/update.formation.dto';
import RequestManager from '../../_shared/utils/RequestManager';
import { FormationsAvailabilities } from '../../entities/formations/formations-availabilities.entity';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';
import { FormationPreBookingDto } from '../../dto/formations/formation-pre-booking.dto';
import { v4 as uuidv4 } from 'uuid';
import Sendinblue, {
  MailType,
} from '../../_shared/helpers/mailer/sendinblue.helper';
import PdfFormationModel from '../../_shared/helpers/pdf/formation/pdf-formation-model';
import { FirebaseHelper } from '../../_shared/helpers/firebase.helper';
import { Places } from '../../entities/places/places.entity';
import { FormationDashboardModel } from '../../interfaces/formations/formation-dashboard.model';
import { CreateEventDto } from '../../dto/formations/create-event.dto';
import { RequestSuccess } from '../../_shared/interfaces/RequestSuccess';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formations)
    private readonly formationsRepository: Repository<Formations>,
    @InjectRepository(FormationsAvailabilities)
    private readonly formationsAvailabilitiesRepository: Repository<FormationsAvailabilities>,
    @InjectRepository(FormationsSubscribers)
    private readonly formationSubscribersRepository: Repository<FormationsSubscribers>,
    @InjectRepository(Places)
    private readonly placesRepository: Repository<Places>,
  ) {}

  async getAllFormations(): Promise<Formations[]> {
    return await this.formationsRepository.find({});
  }

  async getDashboardContent(): Promise<FormationDashboardModel> {
    const nearestFormation = await this.formationsAvailabilitiesRepository.find(
      {
        where: {
          date: MoreThan(new Date()),
        },
        skip: 0,
        take: 1,
        order: { date: 'ASC' },
      },
    );
    const nearestFormationContent = await this.formationsRepository.findOne(
      nearestFormation[0].formationId,
    );

    const formations = await this.formationsRepository.find({
      order: {
        name: 'ASC',
      },
    });
    return {
      nearestFormation: nearestFormation[0],
      formations,
      nearestFormationContent,
    };
  }

  async createFormation(
    createFormationDto: CreateFormationDto,
  ): Promise<Formations> {
    try {
      const uploadedImages = await FirebaseHelper.uploadImagesToFirebase(
        createFormationDto.imagesUrl,
        createFormationDto.name.replace(/ /g, '_'),
        'formations',
      );
      const newFormation = this.formationsRepository.create(createFormationDto);
      newFormation.imagesUrl = uploadedImages;
      return await this.formationsRepository.save(newFormation);
    } catch (e) {
      ErrorManager.customException(`Une erreur est survenue: ${e}`);
    }
  }

  async removeFormation(id: number) {
    const formationToDelete: Formations =
      await this.formationsRepository.findOne(id);
    if (formationToDelete) {
      // check if formation availabilities are linked
      const hasAvailabilitiesLinked =
        await this.formationsAvailabilitiesRepository
          .find({
            id: formationToDelete.id,
          })
          .then((res) => {
            if (res.length > 0) {
              ErrorManager.customException(
                `Please delete availabilities before delete the formation`,
              );
            } else {
              return 0;
            }
          });

      if (!hasAvailabilitiesLinked) {
        await this.formationsRepository.remove(formationToDelete);
        return RequestManager.successRequest(
          `Formation ${formationToDelete.id} successfully removed`,
        );
      }
    } else {
      ErrorManager.notFoundException(`Formation ${id} not found !`);
    }
  }

  async getFormationById(id: number): Promise<Formations> {
    const date = new Date();
    const formation = await this.formationsRepository
      .createQueryBuilder('formation')
      .leftJoinAndSelect('formation.availabilities', 'fa')
      .innerJoinAndMapOne('fa.place', Places, 'place2', 'fa.place = place2.id')
      // .where('fa.date > :date', { date })
      .andWhere('formation.id = :id', { id })
      .getOne();
    if (formation) {
      formation.availabilities = formation.availabilities.filter(
        (av) => av.date > date,
      );
      return formation;
    } else {
      ErrorManager.notFoundException(`Formation ${id} not found`);
    }
  }

  async update(
    updateFormationDto: UpdateFormationDto,
  ): Promise<{ success: boolean; message: string }> {
    // Find care
    const formation = await this.formationsRepository.findOne(
      updateFormationDto.id,
    );

    // Check if name isn't already used
    await this.formationsRepository
      .find({
        name: updateFormationDto.name,
      })
      .then(
        (res) =>
          res.length > 0 && ErrorManager.customException('Name already used'),
      );

    // Update formation
    if (formation) {
      const updateFormation = await this.formationsRepository.preload({
        id: +updateFormationDto.id,
        ...updateFormationDto,
      });
      await this.formationsRepository.save(updateFormation);
      return RequestManager.successRequest(
        `Formation ${updateFormationDto.id} updated !`,
      );
    } else {
      ErrorManager.notFoundException(
        `Formation ${updateFormationDto.id} not found`,
      );
    }
  }

  async getCategories(): Promise<Formations[]> {
    try {
      return await this.formationsRepository
        .createQueryBuilder('formations')
        .where('formations.isActive = :name', { name: 1 })
        .orderBy('name')
        .select(['id', 'name'])
        .execute();
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async getAvailabilityData(id: number) {
    try {
      return await this.formationsAvailabilitiesRepository
        .createQueryBuilder('availability')
        .select(['availability.id', 'availability.date', 'availability.hour'])
        .where('availability.id = :id', { id })
        .leftJoinAndSelect('availability.formation', 'formation')
        .leftJoinAndSelect('availability.subscribers', 'subscribers')
        .getOne();
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async storePreBooking(preBookingDto: FormationPreBookingDto) {
    try {
      const depositDate = new Date();
      const uuid = uuidv4();
      const preBooking = this.formationSubscribersRepository.create({
        ...preBookingDto,
        depositDate,
        uuid,
      });
      return await this.formationSubscribersRepository.save(preBooking);
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async createEvent(createEventDto: CreateEventDto) {
    try {
      const newEvent = this.formationsAvailabilitiesRepository.create({
        formationId: +createEventDto.formationId,
        date: createEventDto.date,
        hour: createEventDto.hour,
        leftPlaces: createEventDto.leftPlaces,
        place: 1,
      });
      return await this.formationsAvailabilitiesRepository.save(newEvent);
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async moveBookingToPaid({
    paymentIntentId,
    numberPersons,
    formationAvailabilityId,
    lastname,
    firstname,
    email,
  }) {
    // Update formation subscription
    try {
      const formationSubscriber =
        await this.formationSubscribersRepository.findOne({
          stripeIntentDeposit: paymentIntentId,
        });
      formationSubscriber.numberPersons = numberPersons;
      formationSubscriber.hasPaidDeposit = 1;
      formationSubscriber.errorMessage = '';
      formationSubscriber.hasPaymentFailed = 0;
      await this.formationSubscribersRepository.save(formationSubscriber);

      // Update formation availability
      const availability =
        await this.formationsAvailabilitiesRepository.preload({
          id: formationAvailabilityId,
        });
      availability.leftPlaces -= numberPersons;
      await this.formationsAvailabilitiesRepository.save(availability);

      // get formation info
      const formation = await this.formationsRepository.findOne({
        id: formationSubscriber.formationId,
      });
      // Generate invoice
      const invoiceContent = PdfFormationModel.setFormationInvoiceModel(
        formation,
        formationSubscriber,
        availability,
      );

      const localFilePath = `formation-invoices/${invoiceContent.uuid}.pdf`;
      const remoteFilePath = `formations-invoices/${formationSubscriber.uuid}.pdf`;

      await PdfFormationModel.generatePdf(invoiceContent, localFilePath);

      const url = await FirebaseHelper.uploadFileToFirebase(
        formationSubscriber,
        availability,
        localFilePath,
        remoteFilePath,
      );

      // Send mail to maka-bane
      await Sendinblue.sendEmailFromTemplate(
        MailType.FORMATION_ORDER_SUCCESS_ADMIN,
        {
          email: 'huygens.benjamin@gmail.com',
          name: `${invoiceContent.name}`,
        },
        url,
        formationSubscriber.uuid,
      );

      // Send mail to maka-bane
      await Sendinblue.sendEmailFromTemplate(
        MailType.FORMATION_ORDER_SUCCESS_ADMIN,
        {
          email: 'makabane.reiki@gmail.com',
          name: `${invoiceContent.name}`,
        },
        url,
        formationSubscriber.uuid,
      );

      // Send mail to customer
      await Sendinblue.sendEmailFromTemplate(MailType.FORMATION_ORDER_SUCCESS, {
        email: email,
        name: `${lastname} ${firstname}`,
      });
      // Return subscription uuid
      return {
        uuid: formationSubscriber.uuid,
      };
    } catch (e) {
      console.log(e);
      ErrorManager.customException(e);
    }
  }

  async getFormationsSubscribers() {
    try {
      return this.formationsRepository
        .createQueryBuilder('f')
        .leftJoinAndSelect('f.availabilities', 'availabilities')
        .getMany();
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async updateWholePaymentStatusForSubscription(
    body: [id: number],
  ): Promise<RequestSuccess> {
    try {
      const subscription = await this.formationSubscribersRepository.findOne(
        body['id'],
      );
      if (subscription && subscription.hasPaidWhole === false) {
        subscription.hasPaidWhole = true;
        await this.formationSubscribersRepository.save(subscription);
        return {
          message: 'wholePayment_updated_OK',
          success: true,
        };
      } else if (subscription && subscription.hasPaidWhole === true) {
        subscription.hasPaidWhole = false;
        await this.formationSubscribersRepository.save(subscription);
        return {
          message: 'wholePayment_updated_KO',
          success: true,
        };
      } else {
        ErrorManager.notFoundException(`Error during paid whole update`);
      }
    } catch (e) {
      ErrorManager.customException(e);
    }
  }
}
