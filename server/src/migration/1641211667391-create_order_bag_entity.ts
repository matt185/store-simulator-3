import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrderBagEntity1641211667391 implements MigrationInterface {
    name = 'createOrderBagEntity1641211667391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bag" ("id" SERIAL NOT NULL, "itemId" character varying NOT NULL, "userId" character varying NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c1b6ff619c21a2c760a07bfe871" UNIQUE ("itemId"), CONSTRAINT "PK_6e681d0246f71dc274b5a5d9955" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "orderId" character varying NOT NULL, "itemId" character varying NOT NULL, "userId" character varying NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_17bc913318f66c5407847c1bfdd" UNIQUE ("itemId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "bag"`);
    }

}
