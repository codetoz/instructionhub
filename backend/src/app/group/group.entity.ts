import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'
import { GroupType } from './enum/group-type.enum'

@Unique(['createdBy', 'slug'])
@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid') // UUID as the primary key
  id: string

  @Column()
  slug: string

  @Column()
  name: string

  @Column({ name: 'created_by' })
  createdBy: string

  @Column()
  description: string

  @Column({ type: 'enum', enum: GroupType })
  type: GroupType

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
