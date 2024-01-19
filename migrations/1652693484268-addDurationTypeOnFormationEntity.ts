import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDurationTypeOnFormationEntity1652693484268
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "formations" ADD "duration_type" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
