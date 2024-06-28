import { MigrationInterface, QueryRunner } from "typeorm";

export class SupportMigration1714722722130 implements MigrationInterface {
    name = 'SupportMigration1714722722130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`estado_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipoEstado\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_c753bc4f86bad606baf7866962\` (\`tipoEstado\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`observaciones_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descripcionObservacion\` text NOT NULL, \`fechaCreacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ticketId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_entity\` (\`id\` varchar(36) NOT NULL, \`emisor\` varchar(255) NOT NULL, \`fechaCreacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`prioridad\` int NOT NULL, \`descripcionTicket\` text NOT NULL, \`estadoId\` int NULL, \`temaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`solucion_entity\` (\`id\` varchar(36) NOT NULL, \`solucionador\` varchar(255) NOT NULL, \`descripcionProblema\` text NOT NULL, \`descripcionSolucion\` text NOT NULL, \`fechaProblema\` datetime NULL, \`fechaSolucion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`temaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`temas_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipoTicket\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_86fc845b862d8f05c5f1bc9276\` (\`tipoTicket\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario_entity\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6082ea37fc8d89e467f2674e74\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`faq_entity\` (\`id\` varchar(36) NOT NULL, \`question\` text NOT NULL, \`answer\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`observaciones_entity\` ADD CONSTRAINT \`FK_937723d59fa90a654d738833cd8\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_entity\` ADD CONSTRAINT \`FK_469a8b1252d3357cc6d3deea91d\` FOREIGN KEY (\`estadoId\`) REFERENCES \`estado_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_entity\` ADD CONSTRAINT \`FK_ff04ddd185c5e9cd4008330a9ba\` FOREIGN KEY (\`temaId\`) REFERENCES \`temas_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`solucion_entity\` ADD CONSTRAINT \`FK_3855e0b5f719d1986855f4855a0\` FOREIGN KEY (\`temaId\`) REFERENCES \`temas_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`solucion_entity\` DROP FOREIGN KEY \`FK_3855e0b5f719d1986855f4855a0\``);
        await queryRunner.query(`ALTER TABLE \`ticket_entity\` DROP FOREIGN KEY \`FK_ff04ddd185c5e9cd4008330a9ba\``);
        await queryRunner.query(`ALTER TABLE \`ticket_entity\` DROP FOREIGN KEY \`FK_469a8b1252d3357cc6d3deea91d\``);
        await queryRunner.query(`ALTER TABLE \`observaciones_entity\` DROP FOREIGN KEY \`FK_937723d59fa90a654d738833cd8\``);
        await queryRunner.query(`DROP TABLE \`faq_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_6082ea37fc8d89e467f2674e74\` ON \`usuario_entity\``);
        await queryRunner.query(`DROP TABLE \`usuario_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_86fc845b862d8f05c5f1bc9276\` ON \`temas_entity\``);
        await queryRunner.query(`DROP TABLE \`temas_entity\``);
        await queryRunner.query(`DROP TABLE \`solucion_entity\``);
        await queryRunner.query(`DROP TABLE \`ticket_entity\``);
        await queryRunner.query(`DROP TABLE \`observaciones_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_c753bc4f86bad606baf7866962\` ON \`estado_entity\``);
        await queryRunner.query(`DROP TABLE \`estado_entity\``);
    }

}
