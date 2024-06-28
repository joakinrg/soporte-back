import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketEntity } from '../../tickets/entity/Ticket.entity';

@Entity()
export class EstadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  tipoEstado: string;

  @OneToMany(() => TicketEntity, (ticket) => ticket.estado)
  ticketId: TicketEntity[];

  constructor(item: Partial<EstadoEntity>) {
    Object.assign(this, item);
  }
}
