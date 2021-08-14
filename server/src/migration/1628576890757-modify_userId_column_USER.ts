import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyUserIdColumnUSER1628576890757 implements MigrationInterface {
    name = 'modifyUserIdColumnUSER1628576890757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "userId" character varying NOT NULL DEFAULT '0d54e6da-4ba5-49b1-bb14-33e8017c869a'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "phone" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "address" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "address" SET DEFAULT '-'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "phone" SET DEFAULT '-'`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "userId"`);
    }

}
