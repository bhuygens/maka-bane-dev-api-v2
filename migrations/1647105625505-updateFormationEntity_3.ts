import {MigrationInterface, QueryRunner} from "typeorm";

export class updateFormationEntity31647105625505 implements MigrationInterface {
    name = 'updateFormationEntity31647105625505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "formations" ALTER COLUMN "images_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "formations" ALTER COLUMN "tags" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "formations" ALTER COLUMN "tags" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "formations" ALTER COLUMN "images_url" SET NOT NULL`);
    }

}
