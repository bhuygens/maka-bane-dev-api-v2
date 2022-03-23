import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCustomerPreOrderEntity31648042027362 implements MigrationInterface {
    name = 'updateCustomerPreOrderEntity31648042027362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_orders" DROP COLUMN "order_data"`);
        await queryRunner.query(`ALTER TABLE "customer_orders" ADD "order_data" jsonb`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "customer_orders" DROP COLUMN "order_data"`);
        await queryRunner.query(`ALTER TABLE "customer_orders" ADD "order_data" text`);
    }

}
