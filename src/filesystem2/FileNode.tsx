import { useFileSystem } from './fsprovider/FileSystemProvider';
import { FileTypes, IFileNode, IFileNodeProps } from './types';

function FileNode({ node, level }: IFileNodeProps) {
  const { dispatch } = useFileSystem();

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

    dispatch({ type: 'ADD', payload: { parentId, newNode } });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  const handleToggle = (id: number) => {
    dispatch({ type: 'TOGGLE', payload: { id } });
  };

  const id = node.id ?? 0;
  return (
    <div style={{ marginLeft: level * 30 }}>
      <div>
        <span
          style={{
            cursor: node.type === FileTypes.FOLDER ? 'pointer' : 'default',
            fontWeight: 'bold',
            marginRight: 10,
          }}
          onClick={() => node.type === FileTypes.FOLDER && handleToggle(id)}
        >
          {node.type === FileTypes.FOLDER ? (node.isOpen ? '📂' : '📁') : '📄'}{' '}
          {node.name}
        </span>
        <button onClick={() => handleDelete(id)}>🗑️</button>
        {node.type === FileTypes.FOLDER && (
          <button onClick={() => handleAdd(id)}>➕</button>
        )}
      </div>

      {node.isOpen &&
        node.children?.map((child) => (
          <FileNode key={child.id} node={child} level={level + 1} />
        ))}
    </div>
  );
}

export default FileNode;
