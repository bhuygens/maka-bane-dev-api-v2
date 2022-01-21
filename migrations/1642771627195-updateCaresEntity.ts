import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCaresEntity1642771627195 implements MigrationInterface {
    name = 'updateCaresEntity1642771627195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_price" TYPE numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" TYPE numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_price" TYPE numeric(4,0)`);
    }

}
