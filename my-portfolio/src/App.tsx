
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UploadImage } from './components/uploadImage';
import { ResultsPage } from './components/Results';

function App() {
  return (
    <div className='app-body'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UploadImage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
