import { Body, Controller, Post } from '@nestjs/common';
import { CommonService } from '../../services/common/common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('/sendMailFromContactPage')
  async sendMailFromContactPage(
    @Body() body: { message: string; name: string; email: string },
  ) {
    return await this.commonService.sendMailFromContactPage(body);
  }
}
