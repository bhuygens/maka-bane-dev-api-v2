import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCareEntity1646840552217 implements MigrationInterface {
    name = 'updateCareEntity1646840552217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
    }

}
