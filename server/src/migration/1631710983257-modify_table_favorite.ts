import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyTableFavorite1631710983257 implements MigrationInterface {
    name = 'modifyTableFavorite1631710983257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_543e20855ce2bde06d0acb29b51"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ALTER COLUMN "customerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_543e20855ce2bde06d0acb29b51" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_543e20855ce2bde06d0acb29b51"`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ALTER COLUMN "customerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_543e20855ce2bde06d0acb29b51" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
