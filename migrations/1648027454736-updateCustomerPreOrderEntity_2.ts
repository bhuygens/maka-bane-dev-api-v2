import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCustomerPreOrderEntity21648027454736 implements MigrationInterface {
    name = 'updateCustomerPreOrderEntity21648027454736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_pre_orders" DROP COLUMN "order_data"`);
        await queryRunner.query(`ALTER TABLE "customer_pre_orders" ADD "order_data" jsonb`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "customer_pre_orders" DROP COLUMN "order_data"`);
        await queryRunner.query(`ALTER TABLE "customer_pre_orders" ADD "order_data" text array NOT NULL`);
    }

}
