import { NotFoundError } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';

export default class ErrorManager {
  static notFoundException(content: string) {
    throw new HttpException(content, HttpStatus.NOT_FOUND);
  }

  static alreadyExistContentException(content: string) {
    throw new HttpException(content, HttpStatus.CONFLICT);
  }

  static badRequestException(content: string) {
    throw new HttpException(content, HttpStatus.BAD_REQUEST);
  }

  static customException(content: string, status = 400) {
    throw new HttpException(content, status);
  }
}
