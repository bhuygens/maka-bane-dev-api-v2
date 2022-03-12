import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { CreateFormationDto } from './dto/createFormationDto';
import { Formations } from './formations.entity';
import { RequestSuccess } from '../../.common/interfaces/RequestSuccess';
import { UpdateFormationDto } from './dto/updateFormationDto';

@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @Post()
  createFormation(
    @Body() createFormationDto: CreateFormationDto,
  ): Promise<void> {
    return this.formationsService.createFormation(createFormationDto);
  }

  @Get()
  getAllFormations(): Promise<Formations[]> {
    return this.formationsService.getAllFormations();
  }

  @Delete(':id')
  removeFormation(@Param('id') id: number): Promise<RequestSuccess> {
    return this.formationsService.removeFormation(id);
  }

  @Get(':id')
  async getFormationById(@Param('id') id: number): Promise<Formations> {
    return await this.formationsService.getFormationById(id);
  }

  @Patch()
  async updateFormation(
    @Body() updateFormationDTO: UpdateFormationDto,
  ): Promise<RequestSuccess> {
    return await this.formationsService.update(updateFormationDTO);
  }
}
