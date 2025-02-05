import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm'
import { Group } from '../group/group.entity'
import { InstructionType } from './enum/instruction-type.enum'

@Entity('instructions')
@Unique(['slug', 'group']) // Slug must be unique for each group
export class Instruction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  slug: string

  @Column()
  content: string

  @Column()
  description: string

  @Column({ type: 'enum', enum: InstructionType })
  type: InstructionType

  @Column({ name: 'created_by' })
  createdBy: string

  @ManyToOne(() => Group, { eager: true })
  @JoinColumn({ name: 'group_id' })
  group: Group

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
