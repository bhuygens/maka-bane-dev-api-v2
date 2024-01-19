import {MigrationInterface, QueryRunner} from "typeorm";

export class updateProductEntityImagesUrlToArray1647545993849 implements MigrationInterface {
    name = 'updateProductEntityImagesUrlToArray1647545993849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "images_url" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images_url"`);
    }

}
