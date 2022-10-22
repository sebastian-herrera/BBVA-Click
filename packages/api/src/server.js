import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './router';

const app = express();

app.use(
  cors(),
  helmet(),
  express.urlencoded({
    extended: true,
  }),
  express.json(),
);

app.use(`/`, routes);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Ready at PORT ${PORT}`));
