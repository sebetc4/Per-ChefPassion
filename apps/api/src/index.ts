import express, { Application } from 'express';
import cookie from 'cookie-parser';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_, res) => {
    res.send('Hello, TypeScript Express!');
  });

app.use('*', (_, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
