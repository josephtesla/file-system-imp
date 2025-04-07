import React, { useContext, useReducer } from 'react';
import { FileTypes, IAction, IFileNode, IState } from '../types';
import { fileSystemReducer } from './reducer';
import { setNodeIds } from '../helper';

const initialState: IFileNode[] = [
  {
    name: 'root',
    type: FileTypes.FOLDER,
    isOpen: true,
    children: [
      {
        name: 'App.js',
        type: FileTypes.FILE,
      },
      {
        name: 'components',
        type: FileTypes.FOLDER,
        isOpen: false,
        children: [],
      },
    ],
  },
];

type FileSystemContextType = {
  tree: IState,
  dispatch: React.Dispatch<IAction>
}

const FileSystemContext = React.createContext<FileSystemContextType | undefined>(undefined);

export function FileSystemProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(
    fileSystemReducer,
    setNodeIds(initialState) as IState
  );

  return (
    <FileSystemContext.Provider value={{ tree: state, dispatch }}>
      {children}
    </FileSystemContext.Provider>
  );
}

export const useFileSystem = (): FileSystemContextType => {
  const context = useContext(FileSystemContext);
  if (!context) {
    throw new Error('useFileSystem must be used within a FileSystemProvider');
  }
  return context;
}
