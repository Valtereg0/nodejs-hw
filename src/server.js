import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';


import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { logger } from './middleware/logger.js';




const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);



app.use((req, res, next) => {
  console.log("Log time:", new Date());
  next();
});


app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
