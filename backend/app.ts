import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { initializeTable } from './db';
import itemRoute from "./routes/item.route";

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/item', itemRoute);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Initialize database schema
initializeTable()
    .then(() => {
        console.log('Database schema initialized successfully');
    })
    .catch((error) => {
        console.error("Error when initializing database schema:", error);
    });

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});