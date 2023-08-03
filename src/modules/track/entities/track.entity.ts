import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ name: 'user_id' })
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
