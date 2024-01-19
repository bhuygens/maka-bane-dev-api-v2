import {MigrationInterface, QueryRunner} from "typeorm";

export class updateProductEntityTagsToArray1648220298795 implements MigrationInterface {
    name = 'updateProductEntityTagsToArray1648220298795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "tags" character varying(250) array`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "tags" character varying(250)`);
    }

}
