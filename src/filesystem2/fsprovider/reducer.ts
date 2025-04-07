import { getId } from "../helper";
import { FileTypes, IAction, IFileNode, IState } from "../types";

export function fileSystemReducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'ADD':
      const { parentId, newNode } = action.payload;
      return addNode(state, parentId, newNode);
    case 'DELETE':
      return deleteNode(state, action.payload.id);
    case 'TOGGLE':
      return toggleFolderOpen(state, action.payload.id);
    default:
      return state;
  }
}

const addNode = (
  tree: IFileNode[],
  parentId: number,
  newNode: IFileNode
): IFileNode[] => {
  newNode.id = newNode.id ?? getId();
  return tree.map((node) => {
    if (node.id === parentId && node.type === FileTypes.FOLDER) {
      return { ...node, children: [...(node.children ?? []), newNode] };
    } else if (node.children) {
      return { ...node, children: addNode(node.children, parentId, newNode) };
    } else {
      return node;
    }
  });
};

const deleteNode = (tree: IFileNode[], id: number): IFileNode[] => {
  return tree
    .filter((node) => node.id !== id)
    .map((node) => {
      return { ...node, children: deleteNode(node.children ?? [], id) };
    });
};

const toggleFolderOpen = (tree: IFileNode[], id: number): IFileNode[] => {
  return tree.map((node) => {
    if (node.id === id && node.type === FileTypes.FOLDER) {
      return { ...node, isOpen: !node.isOpen };
    } else if (node.children) {
      return { ...node, children: toggleFolderOpen(node.children, id) };
    } else {
      return node;
    }
  });
};
