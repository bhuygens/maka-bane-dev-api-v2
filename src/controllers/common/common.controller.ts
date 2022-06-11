import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommonService } from '../../services/common/common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('/sendMailFromContactPage')
  sendMailFromContactPage(
    @Body() body: { message: string; name: string; email: string },
  ) {
    return this.commonService.sendMailFromContactPage(body);
  }

  @Get('/home-data')
  async fetchHomeData() {
    return this.commonService.fetchHomeData();
  }
}
