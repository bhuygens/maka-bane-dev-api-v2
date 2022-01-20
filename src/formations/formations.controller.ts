import { Body, Controller, Get, Post } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { InsertFormationDto } from './dto/insertFormation.dto';
import { FormationsEntity } from './formations.entity';

@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {
  }

  @Post('hello')
  getHello(
    @Body() insertFormationDto: InsertFormationDto,
  ): Promise<FormationsEntity> {
    return this.formationsService.insertFormation(insertFormationDto);
  }

  @Get('findAllFormations')
  getAllFormations(): Promise<FormationsEntity[]> {
    return this.formationsService.getAllFormations();
  }
}
