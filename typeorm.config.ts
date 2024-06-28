import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { EstadoEntity } from 'src/estado/entities/estado.entity';
import { ObservacionesEntity } from 'src/observaciones/entity/Observaciones.entity';
import { SolucionEntity } from 'src/soluciones/entity/Soluciones.entity';
import { TemasEntity } from 'src/temas/entity/Temas.entity';
import { TicketEntity } from 'src/tickets/entity/Ticket.entity';
import { UsuarioEntity } from 'src/usuarios/entity/Usuario.entity';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'mysql',
  url: new ConfigService().getOrThrow('MYSQL_URL'),
  migrations: ['migrations/**'],
  entities: [
    SolucionEntity,
    TemasEntity,
    UsuarioEntity,
    TicketEntity,
    EstadoEntity,
    ObservacionesEntity,
  ],
});
