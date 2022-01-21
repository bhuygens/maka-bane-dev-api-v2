import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTimestamptzColumnNameToDate1642768030367 implements MigrationInterface {
    name = 'updateTimestamptzColumnNameToDate1642768030367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_articles" RENAME COLUMN "timestamptz" TO "date"`);
        await queryRunner.query(`ALTER TABLE "formations_availabilities" RENAME COLUMN "timestamptz" TO "date"`);
        await queryRunner.query(`ALTER TABLE "product_stock" RENAME COLUMN "timestamptz" TO "date"`);
        await queryRunner.query(`ALTER TABLE "reviews" RENAME COLUMN "timestamptz" TO "date"`);
        await queryRunner.query(`ALTER TABLE "cares_availabilities" RENAME COLUMN "timestamptz" TO "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares_availabilities" RENAME COLUMN "date" TO "timestamptz"`);
        await queryRunner.query(`ALTER TABLE "reviews" RENAME COLUMN "date" TO "timestamptz"`);
        await queryRunner.query(`ALTER TABLE "product_stock" RENAME COLUMN "date" TO "timestamptz"`);
        await queryRunner.query(`ALTER TABLE "formations_availabilities" RENAME COLUMN "date" TO "timestamptz"`);
        await queryRunner.query(`ALTER TABLE "blog_articles" RENAME COLUMN "date" TO "timestamptz"`);
    }

}
