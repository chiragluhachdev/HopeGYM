import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { connectDB } from './config/db';
import routes from './routes';
import { notFound, errorHandler } from './middleware/error';

const app = express();

app.use(
  cors({
    origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(',').map((s) => s.trim()),
  })
);
app.use(express.json({ limit: '2mb' }));

app.get('/', (_req, res) => res.json({ name: 'Hope Gym & Spa API', status: 'ok' }));
app.get('/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await connectDB();
  } catch (err) {
    // Non-fatal in dev: the server still boots so health/static routes work.
    console.error('⚠️  MongoDB connection failed — DB routes will error until MONGODB_URI is set.');
    console.error('   ', (err as Error).message);
  }
  app.listen(env.port, () => {
    console.log(`✓ Hope Gym & Spa API running on http://localhost:${env.port}`);
  });
}

start();
