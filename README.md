# simplified_features_react

# basically inside should be one node_modules

# create Monorepo vite projects

https://turbo.build/repo/docs

```
npx create-turbo@latest -e with-vite monorepo-name

cd monorepo-name
npm install
```

### add project to Monorepo vite projects

```
cd  monorepo-name\apps
npm create vite@latest project-name
```

#### run project

https://turbo.build/repo/docs/core-concepts/monorepos/filtering

```
<!-- from monorepo root -->
turbo dev --filter=docs
npm run dev -w project-name
npm run dev --prefix .\apps\project-name\

<!-- local from project root -->
npm start
```

```
<!-- eslint -->
npm i eslint vite-plugin-eslint eslint-config-react-app

```

<!--  -->

### Vite with ESLint

```
<!-- step 1 -->
npm install vite-plugin-eslint --save-dev
npm install eslint-config-react-app --save-dev
<!-- step 2 -->
touch .eslintrc
<!-- step 3 -->
{
  "extends": [
    "react-app"
  ]
}
<!-- step 3 -->
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
```
