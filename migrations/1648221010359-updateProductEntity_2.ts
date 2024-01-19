import {MigrationInterface, QueryRunner} from "typeorm";

export class updateProductEntity21648221010359 implements MigrationInterface {
    name = 'updateProductEntity21648221010359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount_codes" ALTER COLUMN "direct_code" TYPE numeric(12)`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "buying_price" TYPE numeric(12)`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "retail_price" TYPE numeric(12)`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "vat_class" TYPE numeric(12)`);
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "note" TYPE numeric(12)`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "note" TYPE numeric(2,0)`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "vat_class" TYPE numeric(2,0)`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "retail_price" TYPE numeric(2,0)`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "buying_price" TYPE numeric(2,0)`);
        await queryRunner.query(`ALTER TABLE "discount_codes" ALTER COLUMN "direct_code" TYPE numeric(2,0)`);
    }

}
