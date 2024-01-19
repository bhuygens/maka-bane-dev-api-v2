import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCustomerPreOrderEntity1648025252559 implements MigrationInterface {
    name = 'updateCustomerPreOrderEntity1648025252559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_pre_orders" DROP COLUMN "order_data"`);
        await queryRunner.query(`ALTER TABLE "customer_pre_orders" ADD "order_data" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "customer_pre_orders" DROP COLUMN "order_data"`);
        await queryRunner.query(`ALTER TABLE "customer_pre_orders" ADD "order_data" text`);
    }

}
