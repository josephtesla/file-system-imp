// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { FileSystem } from './filesystem2/FileSystem';
import { FileSystemProvider } from './filesystem2/fsprovider/FileSystemProvider';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <FileSystemProvider>
        <FileSystem />
      </FileSystemProvider>
    </div>
  );
}

export default App;
