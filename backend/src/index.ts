import express, { Express} from 'express';
import bodyParser from 'body-parser';
import { createServer } from "http";
import { mySocket } from './socket';

import userRoutes from './routes/user-routes';

const app: Express = express();
const PORT: number = 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/users', userRoutes);

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log('server started');
});

mySocket(httpServer);