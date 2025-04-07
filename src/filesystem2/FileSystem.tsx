import FileNode from "./FileNode";
import { useFileSystem } from "./fsprovider/FileSystemProvider";

export function FileSystem() {
  const { tree } = useFileSystem();
  return (
    <>
      {
        tree.map(node => (
          <FileNode
            key={node.id}
            node={node}
            level={0}
          />
        ))
      }
    </>
  )
}
