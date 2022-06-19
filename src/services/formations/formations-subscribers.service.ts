import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class FormationsSubscribersService {
  @InjectRepository(FormationsSubscribers)
  private readonly formationSubscribersRepository: Repository<FormationsSubscribers>;

  async getFormationsSubscriptionForThisMonth(startDate: string) {
    const formation = await this.formationSubscribersRepository.find({
      where: {
        depositDate: MoreThan(startDate),
      },
    });
    return formation.length;
  }

  async countSubscribers(): Promise<number> {
    return (await this.formationSubscribersRepository.find()).length;
  }
}
