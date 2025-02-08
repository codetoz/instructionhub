import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm'
import { Group } from '../group/group.entity'
import { InstructionType } from './enum/instruction-type.enum'

@Entity('instructions')
@Unique(['slug', 'createdBy']) // Slug must be unique for each group
export class Instruction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  slug: string

  @Column({ name: 'created_by' })
  createdBy: string // user_id: uuid

  @Column()
  description: string

  @Column()
  content: string

  @Column({
    type: 'enum',
    enum: InstructionType,
    default: InstructionType.PRIVATE,
  })
  type: InstructionType

  @ManyToOne(() => Group, { eager: false })
  @Column({ name: 'group_id', nullable: true })
  groupId?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
