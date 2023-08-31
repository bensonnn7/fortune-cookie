import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Product } from '../product/entities/product.entity';

export enum ENTITY_STATUS {
  PENDING = '0',
  SENT = '1',
  FAILED = '2',
}
@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => Product)
  product: Product;
  // @Column({ type: 'enum', enum: ENTITY_STATUS, default: ENTITY_STATUS.PENDING })
  // status: ENTITY_STATUS;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
