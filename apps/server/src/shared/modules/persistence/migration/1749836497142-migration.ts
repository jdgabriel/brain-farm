import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749836497142 implements MigrationInterface {
    name = 'Migration1749836497142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm-crops" DROP CONSTRAINT "FK_36c498515138de62e10499748f1"`);
        await queryRunner.query(`ALTER TABLE "farm-crops" DROP COLUMN "farm_id"`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD "farm_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD "farmId" uuid`);
        await queryRunner.query(`ALTER TABLE "farm-crops" DROP CONSTRAINT "FK_728844cc245499728b273d4da55"`);
        await queryRunner.query(`ALTER TABLE "farm-crops" ALTER COLUMN "harvest_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farm-crops" ADD CONSTRAINT "FK_728844cc245499728b273d4da55" FOREIGN KEY ("harvest_id") REFERENCES "harvest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD CONSTRAINT "FK_a38adb11da0c303d087df8e3bd0" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "harvest" DROP CONSTRAINT "FK_a38adb11da0c303d087df8e3bd0"`);
        await queryRunner.query(`ALTER TABLE "farm-crops" DROP CONSTRAINT "FK_728844cc245499728b273d4da55"`);
        await queryRunner.query(`ALTER TABLE "farm-crops" ALTER COLUMN "harvest_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farm-crops" ADD CONSTRAINT "FK_728844cc245499728b273d4da55" FOREIGN KEY ("harvest_id") REFERENCES "harvest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "harvest" DROP COLUMN "farmId"`);
        await queryRunner.query(`ALTER TABLE "harvest" DROP COLUMN "farm_id"`);
        await queryRunner.query(`ALTER TABLE "farm-crops" ADD "farm_id" uuid`);
        await queryRunner.query(`ALTER TABLE "farm-crops" ADD CONSTRAINT "FK_36c498515138de62e10499748f1" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
