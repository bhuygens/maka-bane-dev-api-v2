import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBlogArticlesImagesUrlToArray1647542936860 implements MigrationInterface {
    name = 'updateBlogArticlesImagesUrlToArray1647542936860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_articles" DROP COLUMN "images_url"`);
        await queryRunner.query(`ALTER TABLE "blog_articles" ADD "images_url" text array`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
        await queryRunner.query(`ALTER TABLE "blog_articles" DROP COLUMN "images_url"`);
        await queryRunner.query(`ALTER TABLE "formations_subscribers" ALTER COLUMN "price" TYPE numeric(2)`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images_url"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "images_url" character varying(1000)`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images_url"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "images_url" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "formations_subscribers" ALTER COLUMN "price" TYPE numeric(4,0)`);
        await queryRunner.query(`ALTER TABLE "blog_articles" DROP COLUMN "images_url"`);
        await queryRunner.query(`ALTER TABLE "blog_articles" ADD "images_url" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "blog_articles" DROP COLUMN "images_url"`);
        await queryRunner.query(`ALTER TABLE "blog_articles" ADD "images_url" text NOT NULL`);
    }

}
