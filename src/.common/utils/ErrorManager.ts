import { NotFoundError } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';

export default class ErrorManager {


  static notFoundException(content: string) {
    throw new NotFoundError(content);
  }

  static alreadyExistContentException(content: string) {
    throw new HttpException(content, HttpStatus.CONFLICT);
  }

  static badRequestException(content: string) {
    throw new HttpException(content, HttpStatus.BAD_REQUEST);
  }

  static customException(content: string) {
    throw new HttpException(content, 400);
  }
}