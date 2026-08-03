import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

// Entry point: mounts the app onto #root, wrapped with the Redux store
// provider so every component can access global state via useSelector/useDispatch.
const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
