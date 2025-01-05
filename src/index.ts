import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('Yay! Your API is working!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on <localhost:${port}>`);
});