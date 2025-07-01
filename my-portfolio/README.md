# Face Analyser 
- This Project is a demonstration of detetcing an Image provided by the user for their skin tone detection.
- This Project is built using React, Typescript, ReduxJs Toolkit and TailwindCSS 
- This Project has used extensions such as React WebCam for capturing user's image.

# Installation
- To run this project, clone the repo : https://github.com/aishwindersandhu/demoaApp/tree/FaceCapture-Component 
- Run `npm install`  to install all dependencies and packages.

# Run locally
- To run the project locally, use `npm run dev` command.

# API connection
- The project consumes API hosted on the respective server and is connected and hooked to the API in 
the /api folder.
- The project is still under development and might not be very well error prone or edge case protected.

# TO DO:
- Proper Error Handling with a fallback UI
- Improvise on UI
- Optimsie code and work on performance
- Unit test cases for the components
- As part of the future scope, I'm looking to stage this on a server too.


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
