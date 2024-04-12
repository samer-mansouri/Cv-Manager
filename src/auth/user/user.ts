import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_auth')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;
}
