import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749928699063 implements MigrationInterface {
    name = 'Migration1749928699063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cultivations_status_enum" AS ENUM('PLANTED', 'GROWING', 'HARVESTED')`);
        await queryRunner.query(`CREATE TABLE "cultivations" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "culture" character varying(50) NOT NULL, "area" double precision NOT NULL, "planting_date" TIMESTAMP WITH TIME ZONE NOT NULL, "expected_harvest_date" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "public"."cultivations_status_enum" NOT NULL, "harvest_id" uuid NOT NULL, CONSTRAINT "PK_b28ad6f7b0b4076361b0ce43c2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "harvest" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(25) NOT NULL, "farm_id" uuid NOT NULL, "farmId" uuid, CONSTRAINT "PK_84a837e6c60baad24c5a4125f67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farms" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "city" character varying(150) NOT NULL, "state" character varying(75) NOT NULL, "total_area" double precision NOT NULL, "arable_area" double precision NOT NULL, "vegetation_area" double precision NOT NULL, "producer_id" uuid NOT NULL, "producerId" uuid, CONSTRAINT "PK_39aff9c35006b14025bba5a43d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."producers_doc_type_enum" AS ENUM('CPF', 'CNPJ')`);
        await queryRunner.query(`CREATE TABLE "producers" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "document" character varying NOT NULL, "doc_type" "public"."producers_doc_type_enum" NOT NULL, CONSTRAINT "UQ_55554aac38152436aa25b1e3530" UNIQUE ("document"), CONSTRAINT "PK_7f16886d1a44ed0974232b82506" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cultivations" ADD CONSTRAINT "FK_7713a854983b5d641be3b2ff3fb" FOREIGN KEY ("harvest_id") REFERENCES "harvest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD CONSTRAINT "FK_a38adb11da0c303d087df8e3bd0" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farms" ADD CONSTRAINT "FK_a47fa1b0ccf320f4028705ca3dd" FOREIGN KEY ("producerId") REFERENCES "producers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" DROP CONSTRAINT "FK_a47fa1b0ccf320f4028705ca3dd"`);
        await queryRunner.query(`ALTER TABLE "harvest" DROP CONSTRAINT "FK_a38adb11da0c303d087df8e3bd0"`);
        await queryRunner.query(`ALTER TABLE "cultivations" DROP CONSTRAINT "FK_7713a854983b5d641be3b2ff3fb"`);
        await queryRunner.query(`DROP TABLE "producers"`);
        await queryRunner.query(`DROP TYPE "public"."producers_doc_type_enum"`);
        await queryRunner.query(`DROP TABLE "farms"`);
        await queryRunner.query(`DROP TABLE "harvest"`);
        await queryRunner.query(`DROP TABLE "cultivations"`);
        await queryRunner.query(`DROP TYPE "public"."cultivations_status_enum"`);
    }

}
