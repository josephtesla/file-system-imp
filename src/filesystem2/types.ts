export enum FileTypes {
  FOLDER = 'folder',
  FILE = 'file',
}

export interface IFileNode {
  id?: number;
  name: string;
  type: FileTypes;
  isOpen?: boolean;
  children?: IFileNode[];
}

export interface IFileNodeProps {
  node: IFileNode;
  level: number;
}

export type IState = IFileNode[];

export type IAction =
  | { type: 'ADD'; payload: { parentId: number; newNode: IFileNode } }
  | { type: 'DELETE'; payload: { id: number } }
  | { type: 'TOGGLE'; payload: { id: number } };
