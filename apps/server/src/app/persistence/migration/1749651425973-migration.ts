import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749651425973 implements MigrationInterface {
    name = 'Migration1749651425973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "harvest" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_84a837e6c60baad24c5a4125f67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farm-crops" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "culture" character varying NOT NULL, "farm_id" uuid, "harvest_id" uuid, CONSTRAINT "PK_341d20919064192ad12e87b6ae6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farms" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "total_area" double precision NOT NULL, "arable_area" double precision NOT NULL, "vegetation_area" double precision NOT NULL, "producer_id" uuid, CONSTRAINT "PK_39aff9c35006b14025bba5a43d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producers" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "document" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_55554aac38152436aa25b1e3530" UNIQUE ("document"), CONSTRAINT "PK_7f16886d1a44ed0974232b82506" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "farm-crops" ADD CONSTRAINT "FK_36c498515138de62e10499748f1" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farm-crops" ADD CONSTRAINT "FK_728844cc245499728b273d4da55" FOREIGN KEY ("harvest_id") REFERENCES "harvest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farms" ADD CONSTRAINT "FK_9c593007fa71180e11f2af67458" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" DROP CONSTRAINT "FK_9c593007fa71180e11f2af67458"`);
        await queryRunner.query(`ALTER TABLE "farm-crops" DROP CONSTRAINT "FK_728844cc245499728b273d4da55"`);
        await queryRunner.query(`ALTER TABLE "farm-crops" DROP CONSTRAINT "FK_36c498515138de62e10499748f1"`);
        await queryRunner.query(`DROP TABLE "producers"`);
        await queryRunner.query(`DROP TABLE "farms"`);
        await queryRunner.query(`DROP TABLE "farm-crops"`);
        await queryRunner.query(`DROP TABLE "harvest"`);
    }

}
