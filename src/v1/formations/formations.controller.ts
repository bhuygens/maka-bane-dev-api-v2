import { Body, Controller, Get, Post } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { InsertFormationDto } from './dto/insertFormation.dto';
import { Formations } from './formations.entity';

@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @Post('hello')
  getHello(
    @Body() insertFormationDto: InsertFormationDto,
  ): Promise<void> {
    return this.formationsService.insertFormation(insertFormationDto);
  }

  @Get('getAllFormations')
  getAllFormations(): Promise<Formations[]> {
    return this.formationsService.getAllFormations();
  }
}
