import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBlogArticlesImagesUrlToArray21647543363994 implements MigrationInterface {
    name = 'updateBlogArticlesImagesUrlToArray21647543363994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_articles" ADD "images_url" character varying array`);
        await queryRunner.query(`ALTER TABLE "formations_subscribers" ALTER COLUMN "price" TYPE numeric(4)`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images_url"`);
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT '0.2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares" ALTER COLUMN "vat_amount" SET DEFAULT 0.2`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images_url"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "images_url" character varying(1000)`);
        await queryRunner.query(`ALTER TABLE "formations_subscribers" ALTER COLUMN "price" TYPE numeric(2,0)`);
        await queryRunner.query(`ALTER TABLE "blog_articles" DROP COLUMN "images_url"`);
    }

}
