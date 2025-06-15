import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749938696705 implements MigrationInterface {
    name = 'Migration1749938696705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "harvest" ADD "planting_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD "expected_harvest_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "harvest" DROP COLUMN "expected_harvest_date"`);
        await queryRunner.query(`ALTER TABLE "harvest" DROP COLUMN "planting_date"`);
    }

}
