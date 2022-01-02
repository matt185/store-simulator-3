import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableFavorite1631622588034 implements MigrationInterface {
    name = 'createTableFavorite1631622588034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "itemId" character varying NOT NULL, "customerId" integer, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_543e20855ce2bde06d0acb29b51" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_543e20855ce2bde06d0acb29b51"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
    }

}
