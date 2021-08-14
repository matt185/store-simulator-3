import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableItem1628926226225 implements MigrationInterface {
    name = 'createTableItem1628926226225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "itemId" character varying NOT NULL, "itemName" character varying, "itemClass" character varying NOT NULL, "itemType" character varying NOT NULL, "itemBrand" character varying NOT NULL, "itemPic" character varying NOT NULL, "price" double precision NOT NULL, "quantity" integer, "minQuantity" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_51d980088ed0b9a65dc50c94e92" UNIQUE ("itemId"), CONSTRAINT "UQ_10a1fd44b6f48aa37a2c881aeaa" UNIQUE ("itemName"), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "item"`);
    }

}
