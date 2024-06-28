import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketEntity } from '../../tickets/entity/Ticket.entity';

@Entity()
export class ObservacionesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  descripcionObservacion: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.observacion, {
    cascade: true,
    eager: true,
  })
  ticket: TicketEntity;
}
