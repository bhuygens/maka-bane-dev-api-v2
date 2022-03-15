import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/auth')
  testFirebaseAuth(@Req() request: Request): string {
    return 'Hello ' + request['user']?.email + '!';
  }

  @Post()
  async testFirebaseAuthentication(
    @Body() userData: { email: string; password: string },
  ): Promise<string> {
    return await this.testService.userAuthentication(userData);
  }
}
