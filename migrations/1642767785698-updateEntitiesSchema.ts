import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEntitiesSchema1642767785698 implements MigrationInterface {
    name = 'updateEntitiesSchema1642767785698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog_categories" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(1000), CONSTRAINT "PK_1056d6faca26b9957f5d26e6572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_articles" ("id" SERIAL NOT NULL, "timestamptz" TIMESTAMP WITH TIME ZONE NOT NULL, "category_id" integer NOT NULL, "title" character varying(100) NOT NULL, "content" text NOT NULL, "is_best_article" boolean DEFAULT false, "images_url" text NOT NULL, "tags" text, "content_header" text, CONSTRAINT "PK_7e7a57a75e6fdde30b6f368bb76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_orders" ("id" SERIAL NOT NULL, "orderDate" TIMESTAMP WITH TIME ZONE, "customer_id" integer, "order_data" text, "product_count" integer, "vat_included_price" numeric, "uuid" text, "tokenId" text, "paymentIntentId" text, "invoice_url" text, "cardOwner" text, CONSTRAINT "PK_ce425b6edb31cce9a80b269298e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_pre_orders" ("id" SERIAL NOT NULL, "orderDate" TIMESTAMP WITH TIME ZONE, "customer_id" integer, "order_data" text, "product_count" integer, "vat_included_price" numeric, "uuid" text, "tokenId" text, "paymentIntentId" text, CONSTRAINT "PK_76960b23dd624e1ff2e9708f410" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "formations" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "description" text NOT NULL, "benefit" character varying(2000) NOT NULL, "duration" integer NOT NULL, "images_url_stringified" character varying(1000) NOT NULL, "tags" character varying(1000) NOT NULL, "vat_price" numeric(2) NOT NULL DEFAULT '0', "vat_amount" numeric(2) NOT NULL DEFAULT '0', "duration_text" character varying(1000), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_e071aaba3322392364953ba5c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "places" ("id" SERIAL NOT NULL, "address" character varying(100) NOT NULL, CONSTRAINT "UQ_46df7abffa9033da415d0f5c6ad" UNIQUE ("address"), CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "formations_availabilities" ("id" SERIAL NOT NULL, "formation_id" integer, "place" integer NOT NULL, "timestamptz" TIMESTAMP WITH TIME ZONE NOT NULL, "left_places" integer NOT NULL, "progenda_link" character varying(500), "hour" text, CONSTRAINT "PK_247ad422be6eecac0d11057756c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "formations_subscribers" ("id" SERIAL NOT NULL, "uuid" text, "customer_id" integer NOT NULL, "formation_id" integer NOT NULL, "hasPaid_deposit" boolean NOT NULL DEFAULT false, "hasPaid_whole" boolean NOT NULL DEFAULT false, "stripeIntent_deposit" text, "formationAvailability_id" integer NOT NULL, "deposit_date" TIMESTAMP WITH TIME ZONE, "price" numeric(2) NOT NULL DEFAULT '0', "numberPersons" integer, "paymentObject" text, "error_message" text, "has_payment_failed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7360695d7ab04bd4c0af87b909d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsletter" ("id" SERIAL NOT NULL, "email" character varying(60) NOT NULL, "customer_id" integer, CONSTRAINT "UQ_7e3d2b10221e8b16279dac58319" UNIQUE ("email"), CONSTRAINT "PK_036bb790d1d19efeacfd2f3740c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "email" character varying(60) NOT NULL, "last_name" character varying(50), "first_name" character varying(50), "phone" character varying(15), "stripe_customer_id" character varying(50), "delivery_address" character varying(100), "delivery_city" character varying(100), "delivery_zipcode" character varying(7), "delivery_country" character varying(50), "billing_address" character varying(100), "billing_city" character varying(100), "billing_zipcode" character varying(7), "billing_country" character varying(50), "pseudo" character varying(10), CONSTRAINT "UQ_be811ad484f9d0db4518fe37fdc" UNIQUE ("pseudo"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "discount_codes" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "remaining_use" integer NOT NULL, "customer_id" integer, "product_id" integer, "direct_code" numeric(2) NOT NULL DEFAULT '0', "percent_code" integer, "type" character varying(10) NOT NULL, CONSTRAINT "UQ_b967edd0d46547d4a92b4a1c6b3" UNIQUE ("code"), CONSTRAINT "PK_c0170a28d937472e9ce50fdce17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_stock" ("id" SERIAL NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "timestamptz" TIMESTAMP WITH TIME ZONE, "seller" text, "orderId" text, CONSTRAINT "PK_557112c9955555e7d08fa913f3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_categories" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "description" character varying(1000), CONSTRAINT "PK_7069dac60d88408eca56fdc9e0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "buying_price" numeric(2) NOT NULL DEFAULT '0', "retail_price" numeric(2) NOT NULL DEFAULT '0', "vat_class" numeric(2) NOT NULL DEFAULT '0', "category_id" integer NOT NULL, "current_stock" integer, "short_resume" text NOT NULL, "benefit" text, "tags" character varying(250), "is_best_product" boolean NOT NULL DEFAULT false, "images_url" character varying(1000), "has_product_declination" boolean DEFAULT false, "is_declination_product" boolean NOT NULL DEFAULT false, "main_product_id" integer, "subType" text, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "client_id" integer NOT NULL, "product_id" integer, "care_id" integer, "formation_id" integer, "note" numeric(2) NOT NULL DEFAULT '0', "timestamptz" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying(300) NOT NULL, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cares" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "note" integer, "description" character varying(1000) NOT NULL, "benefit" character varying(2000) NOT NULL, "duration" character varying(1000) NOT NULL, "images_url_stringified" character varying(1000) NOT NULL, "tags" character varying(1000) NOT NULL, "vat_price" numeric(2) DEFAULT '0', "vat_amount" numeric(2) NOT NULL DEFAULT '0', "durationText" character varying(1000) NOT NULL, CONSTRAINT "PK_4d91b850b958c51bbc3dde736cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cares_availabilities" ("id" SERIAL NOT NULL, "care_id" integer, "place" integer NOT NULL, "timestamptz" TIMESTAMP WITH TIME ZONE NOT NULL, "left_places" integer NOT NULL, "progenda_link" character varying(500), CONSTRAINT "PK_6d1d8efc7ac8e3c60305f7d79c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cares_categories" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "description" character varying(1000), CONSTRAINT "PK_60351afce594ad2c2770f8a4e44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carousel" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "description" character varying(1000), "image_url" character varying(250), "article_url" character varying(250), "isOnline" boolean NOT NULL DEFAULT false, "publication_date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d59e0674c5a5efe523df247f67b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_orders_abort" ("id" SERIAL NOT NULL, "orderDate" TIMESTAMP WITH TIME ZONE, "customer_id" integer, "order_data" text, "product_count" integer, "vat_included_price" numeric, "uuid" text, "tokenId" text, "paymentIntentId" text, "errorMessage" text, CONSTRAINT "PK_59d19a3fa23a1a3d96c4bd34b1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_articles" ADD CONSTRAINT "FK_e6cadb788033cad843f7414e93c" FOREIGN KEY ("category_id") REFERENCES "blog_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_orders" ADD CONSTRAINT "FK_d7fd44c68cff957a9168272c745" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_pre_orders" ADD CONSTRAINT "FK_6490b3ab226e0896c439618a296" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "formations_availabilities" ADD CONSTRAINT "FK_1799f5b68f67eef252c1bc30f39" FOREIGN KEY ("formation_id") REFERENCES "formations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "formations_availabilities" ADD CONSTRAINT "FK_5674769e9def58a18b36e0466b9" FOREIGN KEY ("place") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "formations_subscribers" ADD CONSTRAINT "FK_eaf4b482df1ebb15f62140e21eb" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "formations_subscribers" ADD CONSTRAINT "FK_eb34936b1d9c78613f3e305d362" FOREIGN KEY ("formationAvailability_id") REFERENCES "formations_availabilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "formations_subscribers" ADD CONSTRAINT "FK_19c4a5253de35d96eb4e71969d9" FOREIGN KEY ("formation_id") REFERENCES "formations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsletter" ADD CONSTRAINT "FK_8381fa14fec361069c0a138e8f0" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discount_codes" ADD CONSTRAINT "FK_ad6263c2381a1a14d90485dab0d" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discount_codes" ADD CONSTRAINT "FK_770c881cbaf00fcf8c073f9e22f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_stock" ADD CONSTRAINT "FK_62a8438c36b1a42790d3cd755a1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_9482e9567d8dcc2bc615981ef44" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_ed360f1c70c3d4678e2e20c9c8a" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cares_availabilities" ADD CONSTRAINT "FK_519cb3c61a7ffecfd5a2acd34e8" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cares_availabilities" ADD CONSTRAINT "FK_b84818a7643a577b1cd7f4fc8ea" FOREIGN KEY ("place") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cares_availabilities" DROP CONSTRAINT "FK_b84818a7643a577b1cd7f4fc8ea"`);
        await queryRunner.query(`ALTER TABLE "cares_availabilities" DROP CONSTRAINT "FK_519cb3c61a7ffecfd5a2acd34e8"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_ed360f1c70c3d4678e2e20c9c8a"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_9482e9567d8dcc2bc615981ef44"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "product_stock" DROP CONSTRAINT "FK_62a8438c36b1a42790d3cd755a1"`);
        await queryRunner.query(`ALTER TABLE "discount_codes" DROP CONSTRAINT "FK_770c881cbaf00fcf8c073f9e22f"`);
        await queryRunner.query(`ALTER TABLE "discount_codes" DROP CONSTRAINT "FK_ad6263c2381a1a14d90485dab0d"`);
        await queryRunner.query(`ALTER TABLE "newsletter" DROP CONSTRAINT "FK_8381fa14fec361069c0a138e8f0"`);
        await queryRunner.query(`ALTER TABLE "formations_subscribers" DROP CONSTRAINT "FK_19c4a5253de35d96eb4e71969d9"`);
        await queryRunner.query(`ALTER TABLE "formations_subscribers" DROP CONSTRAINT "FK_eb34936b1d9c78613f3e305d362"`);
        await queryRunner.query(`ALTER TABLE "formations_subscribers" DROP CONSTRAINT "FK_eaf4b482df1ebb15f62140e21eb"`);
        await queryRunner.query(`ALTER TABLE "formations_availabilities" DROP CONSTRAINT "FK_5674769e9def58a18b36e0466b9"`);
        await queryRunner.query(`ALTER TABLE "formations_availabilities" DROP CONSTRAINT "FK_1799f5b68f67eef252c1bc30f39"`);
        await queryRunner.query(`ALTER TABLE "customer_pre_orders" DROP CONSTRAINT "FK_6490b3ab226e0896c439618a296"`);
        await queryRunner.query(`ALTER TABLE "customer_orders" DROP CONSTRAINT "FK_d7fd44c68cff957a9168272c745"`);
        await queryRunner.query(`ALTER TABLE "blog_articles" DROP CONSTRAINT "FK_e6cadb788033cad843f7414e93c"`);
        await queryRunner.query(`DROP TABLE "customer_orders_abort"`);
        await queryRunner.query(`DROP TABLE "carousel"`);
        await queryRunner.query(`DROP TABLE "cares_categories"`);
        await queryRunner.query(`DROP TABLE "cares_availabilities"`);
        await queryRunner.query(`DROP TABLE "cares"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "product_categories"`);
        await queryRunner.query(`DROP TABLE "product_stock"`);
        await queryRunner.query(`DROP TABLE "discount_codes"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "newsletter"`);
        await queryRunner.query(`DROP TABLE "formations_subscribers"`);
        await queryRunner.query(`DROP TABLE "formations_availabilities"`);
        await queryRunner.query(`DROP TABLE "places"`);
        await queryRunner.query(`DROP TABLE "formations"`);
        await queryRunner.query(`DROP TABLE "customer_pre_orders"`);
        await queryRunner.query(`DROP TABLE "customer_orders"`);
        await queryRunner.query(`DROP TABLE "blog_articles"`);
        await queryRunner.query(`DROP TABLE "blog_categories"`);
    }

}
