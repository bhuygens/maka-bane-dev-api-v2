import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FormationsService } from '../../services/formations/formations.service';
import { CreateFormationDto } from '../../dto/formations/create-formation.dto';
import { Formations } from '../../entities/formations/formations.entity';
import { RequestSuccess } from '../../_shared/interfaces/RequestSuccess';
import { UpdateFormationDto } from '../../dto/formations/update.formation.dto';
import { FormationPreBookingDto } from '../../dto/formations/formation-pre-booking.dto';
import { FormationDashboardModel } from '../../interfaces/formations/formation-dashboard.model';
import { CreateEventDto } from '../../dto/formations/create-event.dto';

@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @Post()
  createFormation(
    @Body() createFormationDto: CreateFormationDto,
  ): Promise<Formations> {
    return this.formationsService.createFormation(createFormationDto);
  }

  @Get()
  getAllFormations(): Promise<Formations[]> {
    return this.formationsService.getAllFormations();
  }
  @Get('/dashboard')
  async getDashboardContent(): Promise<FormationDashboardModel> {
    return await this.formationsService.getDashboardContent();
  }

  @Get('/categories')
  async getFormationsCategories(): Promise<Formations[]> {
    return await this.formationsService.getCategories();
  }

  @Get('/availability/:id')
  async getAvailabilityData(@Param('id') id: number) {
    return await this.formationsService.getAvailabilityData(id);
  }

  @Post('/storePreBooking')
  async storePreBooking(@Body() preBookingDto: FormationPreBookingDto) {
    return await this.formationsService.storePreBooking(preBookingDto);
  }

  @Post('/createEvent')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.formationsService.createEvent(createEventDto);
  }

  @Post('/moveBookingToPaid')
  async moveBookingToPaid(
    @Body()
    body: {
      paymentIntentId: string;
      numberPersons: number;
      formationAvailabilityId: number;
      lastname: string;
      firstname: string;
      email: string;
    },
  ) {
    return await this.formationsService.moveBookingToPaid(body);
  }

  @Get('/subscribers')
  async getFormationsSubscribers() {
    return await this.formationsService.getFormationsSubscribers();
  }

  @Delete(':id')
  removeFormation(@Param('id') id: number): Promise<RequestSuccess> {
    return this.formationsService.removeFormation(id);
  }

  @Get(':id')
  getFormationById(@Param('id') id: number): Promise<Formations> {
    return this.formationsService.getFormationById(id);
  }

  @Patch()
  async updateFormation(
    @Body() updateFormationDTO: UpdateFormationDto,
  ): Promise<RequestSuccess> {
    return await this.formationsService.update(updateFormationDTO);
  }
}
