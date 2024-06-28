import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SolucionEntity } from '../../soluciones/entity/Soluciones.entity';
import { TicketEntity } from '../../tickets/entity/Ticket.entity';

@Entity()
export class TemasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  tipoTicket: string;

  @OneToMany(() => SolucionEntity, (solucion) => solucion.tema)
  solucionId: SolucionEntity[];

  @OneToMany(() => TicketEntity, (ticket) => ticket.tema)
  ticketId: TicketEntity[];

  constructor(item: Partial<TemasEntity>) {
    Object.assign(this, item);
  }
}
