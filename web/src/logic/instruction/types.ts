export enum InstructionType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export interface Instruction {
  title: string;
  description: string;
  content: string;
  groupId?: string;
  type?: InstructionType;
  slug: string;
}
