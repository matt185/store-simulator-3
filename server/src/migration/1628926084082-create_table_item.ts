import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableItem1628926084082 implements MigrationInterface {
    name = 'createTableItem1628926084082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_d72ea127f30e21753c9e229891e" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "userId" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "userId" SET DEFAULT '0d54e6da-4ba5-49b1-bb14-33e8017c869a'`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_d72ea127f30e21753c9e229891e"`);
    }

}
