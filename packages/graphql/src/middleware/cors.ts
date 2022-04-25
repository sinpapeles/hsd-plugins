import cors from 'cors';

const middleware = (param: string) =>
  cors({
    origin: (origin, callback) => {
      callback(null, param || origin);
    },
    allowedHeaders: ['content-type'],
    credentials: true,
  });

export default middleware;
