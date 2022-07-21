import './App.css';
import Editor from './components/Editor';
import Placeholders from './components/placeholders';
import { DataProvider } from './context/editor-context';
import Preview from './components/preview';

function App() {
  return (
    <DataProvider>
      <div className="App max-w-[600px] w-[90%] mx-auto p-8">
        <Editor />
        <Placeholders />
        <Preview />
      </div>
    </DataProvider>
  );
}

export default App;
