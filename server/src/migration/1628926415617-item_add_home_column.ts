import {MigrationInterface, QueryRunner} from "typeorm";

export class itemAddHomeColumn1628926415617 implements MigrationInterface {
    name = 'itemAddHomeColumn1628926415617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."item" ADD "home" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."item" DROP COLUMN "home"`);
    }

}
