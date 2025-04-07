import { FileTypes, IFileNode } from "./types";

let customId = 0
export function getId() {
  return ++customId;
}

export function setNodeIds(tree: IFileNode[]): IFileNode[] {
  return tree.map((node) => {
    if (node.type === FileTypes.FOLDER) {
      return {
        ...node,
        id: node.id ?? getId(),
        children: setNodeIds(node.children || []),
      };
    } else {
      return { ...node, id: node.id ?? getId() };
    }
  });
}
