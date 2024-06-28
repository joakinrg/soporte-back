import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketEntity } from '../../tickets/entity/Ticket.entity';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @OneToMany(() => TicketEntity, (ticket) => ticket.usuario)
  ticket: TicketEntity[];
}
