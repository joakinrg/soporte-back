import { MigrationInterface, QueryRunner } from "typeorm";

export class SupporUpdate1715971975474 implements MigrationInterface {
    name = 'SupporUpdate1715971975474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_entity\` ADD \`usuarioId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`observaciones_entity\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`observaciones_entity\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`observaciones_entity\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`observaciones_entity\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`ticket_entity\` ADD CONSTRAINT \`FK_4095681d02bcd00654769a59cd7\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_entity\` DROP FOREIGN KEY \`FK_4095681d02bcd00654769a59cd7\``);
        await queryRunner.query(`ALTER TABLE \`observaciones_entity\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`observaciones_entity\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`observaciones_entity\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`observaciones_entity\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`ticket_entity\` DROP COLUMN \`usuarioId\``);
    }

}
