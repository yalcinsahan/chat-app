import express, { Express} from 'express';
import bodyParser from 'body-parser';
import { createServer } from "http";
import { mySocket } from './socket';
import dotenv from 'dotenv'
import cors from 'cors';
import './types'

import authRoutes from './routes/auth-routes';

dotenv.config()

const app: Express = express();
const PORT: number = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
); 

app.use('/auth', authRoutes);

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log('server started')
});

mySocket(httpServer);