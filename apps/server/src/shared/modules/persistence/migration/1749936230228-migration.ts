import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749936230228 implements MigrationInterface {
    name = 'Migration1749936230228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."harvest_status_enum" AS ENUM('PLOWING', 'PLANTED', 'GROWING', 'HARVESTED')`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD "status" "public"."harvest_status_enum" NOT NULL DEFAULT 'PLOWING'`);
        await queryRunner.query(`ALTER TYPE "public"."cultivations_status_enum" RENAME TO "cultivations_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."cultivations_status_enum" AS ENUM('PLOWING', 'PLANTED', 'GROWING', 'HARVESTED')`);
        await queryRunner.query(`ALTER TABLE "cultivations" ALTER COLUMN "status" TYPE "public"."cultivations_status_enum" USING "status"::"text"::"public"."cultivations_status_enum"`);
        await queryRunner.query(`ALTER TABLE "cultivations" ALTER COLUMN "status" SET DEFAULT 'PLOWING'`);
        await queryRunner.query(`DROP TYPE "public"."cultivations_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "cultivations" ALTER COLUMN "status" SET DEFAULT 'PLOWING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cultivations" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`CREATE TYPE "public"."cultivations_status_enum_old" AS ENUM('PLANTED', 'GROWING', 'HARVESTED')`);
        await queryRunner.query(`ALTER TABLE "cultivations" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cultivations" ALTER COLUMN "status" TYPE "public"."cultivations_status_enum_old" USING "status"::"text"::"public"."cultivations_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."cultivations_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."cultivations_status_enum_old" RENAME TO "cultivations_status_enum"`);
        await queryRunner.query(`ALTER TABLE "harvest" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."harvest_status_enum"`);
    }

}
