import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserIdFavorite1641144812611 implements MigrationInterface {
    name = 'addUserIdFavorite1641144812611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."favorite" ADD "userId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."favorite" DROP COLUMN "userId"`);
    }

}
