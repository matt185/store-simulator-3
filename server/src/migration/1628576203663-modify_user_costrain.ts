import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyUserCostrain1628576203663 implements MigrationInterface {
    name = 'modifyUserCostrain1628576203663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "address" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "phone" SET NOT NULL`);
    }

}
