import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Instruction } from './instruction.entity'
import { InstructionService } from './instruction.service'
import { InstructionController } from './instruction.controller'
import { Group } from '../group/group.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Instruction, Group])],
  controllers: [InstructionController],
  providers: [InstructionService],
  exports: [InstructionService],
})
export class InstructionModule {}
