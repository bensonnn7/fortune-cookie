import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
export enum ENTITY_STATUS {
  PENDING = '0',
  SENT = '1',
  FAILED = '2',
}
@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 1024 }) // Specify the length option as 1024
  url: string;

  @Column({ name: 'created_price' })
  createdPrice: number;

  @Column({ name: 'target_price' })
  targetPrice: number;

  @ManyToOne(() => User, (user) => user.track)
  user: User;

  @Column({ type: 'enum', enum: ENTITY_STATUS, default: ENTITY_STATUS.PENDING })
  status: ENTITY_STATUS;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
