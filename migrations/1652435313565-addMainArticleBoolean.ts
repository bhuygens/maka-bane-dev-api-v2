import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMainArticleBoolean1652435313565 implements MigrationInterface {
  name = 'addMainArticleBoolean1652435313565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog_articles" ADD "is_main_article" boolean DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "formations" ALTER COLUMN "vat_price" TYPE numeric(5)`,
    );
    await queryRunner.query(
      `ALTER TABLE "formations" ALTER COLUMN "vat_amount" TYPE numeric(2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "retail_price" TYPE numeric(12)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "vat_class" TYPE numeric(12)`,
    );
    await queryRunner.query(
      `ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "vat_class" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "retail_price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "formations" ALTER COLUMN "vat_amount" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "formations" ALTER COLUMN "vat_price" TYPE numeric(4,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_articles" DROP COLUMN "is_main_article"`,
    );
  }
}
