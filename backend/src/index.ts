import express, { Express} from 'express';
import bodyParser from 'body-parser';

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

const startServer = async (): Promise<void> => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1); 
  }
};

startServer();
