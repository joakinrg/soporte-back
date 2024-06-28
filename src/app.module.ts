import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EstadoModule } from './estado/estado.module';
import { ObservacionesModule } from './observaciones/observaciones.module';
import { SolucionesModule } from './soluciones/soluciones.module';
import { TemasModule } from './temas/temas.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SolucionesModule,
    UsuariosModule,
    TicketsModule,
    AuthModule,
    TemasModule,
    EstadoModule,
    ObservacionesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
