
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UploadImage } from './components/uploadImage';
import { ResultsPage } from './components/Results';
import { ThemeProvider } from './ThemeContext';

/**
 * Root application component.
 * Wraps the app in the light/dark ThemeProvider and defines the two
 * top-level routes: the upload/capture landing page and the results page.
 */
function App() {
  return (
    <ThemeProvider>
      <div className='app-body'>
        <BrowserRouter>
          <Routes>
            {/* Landing page: capture/upload a face photo */}
            <Route path="/" element={<UploadImage />} />
            {/* Results page: skin tone, colour palette & product recommendations */}
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
