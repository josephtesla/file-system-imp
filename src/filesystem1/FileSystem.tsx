import { useState } from 'react';

enum FileTypes {
  FOLDER = 'folder',
  FILE = 'file',
}

interface IFileNode {
  id?: number;
  name: string;
  type: FileTypes;
  isOpen?: boolean;
  children?: IFileNode[];
}

let customId = 0;
const initialTree: IFileNode[] = [
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

function setNodeIds(tree: IFileNode[]): IFileNode[] {
  return tree.map((node) => {
    if (node.type === FileTypes.FOLDER) {
      return {
        ...node,
        id: node.id ?? ++customId,
        children: setNodeIds(node.children || []),
      };
    } else {
      return { ...node, id: node.id ?? ++customId };
    }
  });
}

function FileSystem() {
  const [tree, setTree] = useState<IFileNode[]>(setNodeIds(initialTree));

  const addNode = (
    tree: IFileNode[],
    parentId: number,
    newNode: IFileNode
  ): IFileNode[] => {
    newNode.id = newNode.id ?? ++customId;
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

  const handleAdd = (parentId: number) => {
    // eslint-disable-next-line no-restricted-globals
    const isFolder = confirm('is Folder? (Yes if true, No if File)');
    const name = prompt('Enter name');
    const type = isFolder ? FileTypes.FOLDER : FileTypes.FILE;
    if (!name) {
      return;
    }

    const newNode: IFileNode = {
      name,
      type,
      ...(isFolder ? { children: [], isOpen: false } : {}),
    };

    setTree((prev) => addNode(prev, parentId, newNode));
  };

  const handleDelete = (id: number) => {
    setTree((prev) => deleteNode(prev, id));
  };

  const handleToggle = (id: number) => {
    setTree((prev) => toggleFolderOpen(prev, id));
  };

  return (
    <div>
      {tree.map((node) => (
        <FileNode
          key={node.id}
          node={node}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onToggle={handleToggle}
          level={0}
        />
      ))}
    </div>
  );
}

interface IFileNodeProps {
  node: IFileNode;
  level: number;
  onAdd: (parentId: number) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

function FileNode({ node, level, onAdd, onDelete, onToggle }: IFileNodeProps) {
  const id = node.id ?? 0;
  return (
    <div style={{ marginLeft: level * 30 }}>
      <div>
      <span
          style={{ 
            cursor: node.type === FileTypes.FOLDER ? 'pointer' : 'default',
            fontWeight: 'bold',
            marginRight: 10
          }}
          onClick={() => node.type === FileTypes.FOLDER && onToggle(id)}
        >
          {node.type === FileTypes.FOLDER ? (node.isOpen ? '📂' : '📁') : '📄'}{' '}
          {node.name}
        </span>
        <button onClick={() => onDelete(id)}>🗑️</button>
        {node.type === FileTypes.FOLDER && (
          <button onClick={() => onAdd(id)}>➕</button>
        )}
      </div>

      {node.isOpen &&
        node.children?.map((child) => (
          <FileNode
            key={child.id}
            node={child}
            onAdd={onAdd}
            onDelete={onDelete}
            onToggle={onToggle}
            level={level + 1}
          />
        ))}
    </div>
  );
}

export default FileSystem;
