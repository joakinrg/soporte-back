import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstadoEntity } from '../../estado/entities/estado.entity';
import { ObservacionesEntity } from '../../observaciones/entity/Observaciones.entity';
import { TemasEntity } from '../../temas/entity/Temas.entity';
import { UsuarioEntity } from '../../usuarios/entity/Usuario.entity';

@Entity()
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  emisor: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @ManyToOne(() => EstadoEntity, (estado) => estado.id, {
    cascade: true,
    eager: true,
  })
  estado: EstadoEntity;

  @ManyToOne(() => TemasEntity, (tema) => tema.id, {
    cascade: true,
    eager: true,
  })
  tema: TemasEntity;

  @Column()
  prioridad: number;

  @Column({ type: 'text' })
  descripcionTicket: string;

  @OneToMany(() => ObservacionesEntity, (observacion) => observacion.ticket)
  observacion: ObservacionesEntity[];

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.ticket, {
    cascade: true,
    eager: true,
  })
  usuario: UsuarioEntity;

  constructor(item: Partial<TicketEntity>) {
    Object.assign(this, item);
  }
}
