import {MigrationInterface, QueryRunner} from "typeorm";

export class updateFormationEntity1647105039303 implements MigrationInterface {
    name = 'updateFormationEntity1647105039303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "formations" DROP COLUMN "images_url"`);
        await queryRunner.query(`ALTER TABLE "formations" ADD "images_url" text array`);
        await queryRunner.query(`ALTER TABLE "formations" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "formations" ADD "tags" text array `);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "formations" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "formations" ADD "tags" character varying(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "formations" DROP COLUMN "images_url"`);
        await queryRunner.query(`ALTER TABLE "formations" ADD "images_url" character varying(1000) NOT NULL`);
    }

}
