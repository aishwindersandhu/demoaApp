
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UploadImage } from './components/uploadImage';
import { ResultsPage } from './components/Results';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className='app-body'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UploadImage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
