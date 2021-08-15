import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnItemTable1629009150591 implements MigrationInterface {
    name = 'addColumnItemTable1629009150591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."item" ADD "popular" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."item" DROP COLUMN "popular"`);
    }

}
