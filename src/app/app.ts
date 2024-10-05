import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';
import globalErrorHandler from './errors/globalErrorHandler';
import notFound from './errors/notFound';

const app: Application = express();

//parser
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.text());
app.use(cookieParser());

app.use('/api', router); //get routes from router folder

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: ' This app is running into the server!!!',
  });
});

//global error handling
app.use(globalErrorHandler); //error handling
app.use(notFound); //not found route

export default app;
