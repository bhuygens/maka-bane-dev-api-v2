import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCaresEntityDurationText1646918915769 implements MigrationInterface {
    name = 'updateCaresEntityDurationText1646918915769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" DROP COLUMN "duration_text"`);
        await queryRunner.query(`ALTER TABLE "cares" ADD "durationText" character varying(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "duration" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "duration" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cares" DROP COLUMN "durationText"`);
        await queryRunner.query(`ALTER TABLE "cares" ADD "duration_text" character varying(1000) NOT NULL`);
    }

}
