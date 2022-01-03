import {MigrationInterface, QueryRunner} from "typeorm";

export class changeFavoriteSchema1641144618072 implements MigrationInterface {
    name = 'changeFavoriteSchema1641144618072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_543e20855ce2bde06d0acb29b51"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "customerId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "customerId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_543e20855ce2bde06d0acb29b51" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
