import express, { Express} from 'express';
import bodyParser from 'body-parser';
import { createServer } from "http";
import { mySocket } from './socket';
import dotenv from 'dotenv'
import cors from 'cors';
import './types'

import authRoutes from './routes/auth-routes';
import conversationRoutes from './routes/conversation-routes';
import messageRoutes from './routes/message-routes';
import userRoutes from  './routes/user-routes';

dotenv.config()

const app: Express = express();
const PORT: number = 5000;

app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
); 

app.use('/auth', authRoutes);
app.use('/conversation', conversationRoutes);
app.use('/message', messageRoutes);
app.use('/user', userRoutes);


const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log('server started')
});

mySocket(httpServer);