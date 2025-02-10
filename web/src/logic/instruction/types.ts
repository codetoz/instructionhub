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

export interface InstructionDetails {
  id: string;
  slug: string;
  createdBy: string; // user_id: uuid
  title: string;
  description: string;
  content: string;
  groupId?: string;
  createdAt: string;
  updatedAt: string;
  version?: string;
}
