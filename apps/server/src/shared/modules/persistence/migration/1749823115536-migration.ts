import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749823115536 implements MigrationInterface {
    name = 'Migration1749823115536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" DROP CONSTRAINT "FK_9c593007fa71180e11f2af67458"`);
        await queryRunner.query(`ALTER TABLE "farms" ADD "producerId" uuid`);
        await queryRunner.query(`ALTER TABLE "farms" ALTER COLUMN "producer_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farms" ADD CONSTRAINT "FK_a47fa1b0ccf320f4028705ca3dd" FOREIGN KEY ("producerId") REFERENCES "producers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" DROP CONSTRAINT "FK_a47fa1b0ccf320f4028705ca3dd"`);
        await queryRunner.query(`ALTER TABLE "farms" ALTER COLUMN "producer_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farms" DROP COLUMN "producerId"`);
        await queryRunner.query(`ALTER TABLE "farms" ADD CONSTRAINT "FK_9c593007fa71180e11f2af67458" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
