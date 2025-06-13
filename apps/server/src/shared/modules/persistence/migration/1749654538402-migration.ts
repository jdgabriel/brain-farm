import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749654538402 implements MigrationInterface {
    name = 'Migration1749654538402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."producers_doc_type_enum" AS ENUM('CPF', 'CNPJ')`);
        await queryRunner.query(`ALTER TABLE "producers" ADD "doc_type" "public"."producers_doc_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "harvest" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD "name" character varying(25) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farm-crops" DROP COLUMN "culture"`);
        await queryRunner.query(`ALTER TABLE "farm-crops" ADD "culture" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farms" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "farms" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farms" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "farms" ADD "city" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farms" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "farms" ADD "state" character varying(75) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "producers" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "producers" ADD "name" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producers" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "producers" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farms" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "farms" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farms" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "farms" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farms" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "farms" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farm-crops" DROP COLUMN "culture"`);
        await queryRunner.query(`ALTER TABLE "farm-crops" ADD "culture" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "harvest" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "producers" DROP COLUMN "doc_type"`);
        await queryRunner.query(`DROP TYPE "public"."producers_doc_type_enum"`);
    }

}
