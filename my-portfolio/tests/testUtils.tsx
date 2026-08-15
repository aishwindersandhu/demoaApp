import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import imageReducer from '../src/reducers/imageSlice';
import utilsReducer from '../src/reducers/utilSlice';
import { imageApi } from '../src/api/imageAPI';
import { ThemeProvider } from '../src/ThemeContext';
import { makeImageReducerState, makeUtilsState, type UtilsState } from './fixtures';
import type { ImageReducerState } from '../src/interfaces/imageDataInterface';

interface TestPreloadedState {
  imageReducer?: ImageReducerState;
  utilsReducer?: UtilsState;
}

/** Builds a fresh Redux store per test, shaped like the real app store (redux/store.ts) but with injectable preloaded state. */
export function createTestStore(preloadedState?: TestPreloadedState) {
  return configureStore({
    reducer: {
      imageReducer,
      utilsReducer,
      [imageApi.reducerPath]: imageApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imageApi.middleware),
    preloadedState: {
      imageReducer: preloadedState?.imageReducer ?? makeImageReducerState(),
      utilsReducer: preloadedState?.utilsReducer ?? makeUtilsState(),
    },
  });
}

interface RenderOptions {
  preloadedState?: TestPreloadedState;
  store?: ReturnType<typeof createTestStore>;
  route?: string;
}

/** Renders a component wrapped with the same providers the app tree supplies (router, redux, theme). */
export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, store = createTestStore(preloadedState), route = '/' }: RenderOptions = {}
) {
  return {
    store,
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <Provider store={store}>
          <ThemeProvider>{ui}</ThemeProvider>
        </Provider>
      </MemoryRouter>
    ),
  };
}
