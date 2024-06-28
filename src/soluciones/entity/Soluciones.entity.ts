import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TemasEntity } from '../../temas/entity/Temas.entity';

@Entity()
export class SolucionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  solucionador: string;

  @Column({ type: 'text' })
  descripcionProblema: string;

  @Column({ type: 'text' })
  descripcionSolucion: string;

  @ManyToOne(() => TemasEntity, (tema) => tema.id, {
    cascade: true,
    eager: true,
  })
  tema: TemasEntity;

  @Column({ nullable: true })
  fechaProblema: Date;

  @CreateDateColumn()
  fechaSolucion: Date;
}
