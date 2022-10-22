import { Router } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const router = Router();

const removeExtension = (fileName) => {
  const cleanFileName = fileName.split('.').shift();
  return cleanFileName;
};

/**
 *
 * @param {string} file - example.routes.js
 */
const loadRouter = (file) => {
  const name = removeExtension(file);

  if (name !== 'index') {
    import(`./${file}`).then((routerModule) => {
      console.log(`loaded -> /${name}`);
      router.use(`/${name}`, routerModule.default);
      // router.use(`/${name}`, routerModule.router); // in case it is not a default export
    });
  }
};

const PATH_ROUTES = dirname(fileURLToPath(import.meta.url));
readdirSync(PATH_ROUTES).filter((file) => loadRouter(file));

export default router;
