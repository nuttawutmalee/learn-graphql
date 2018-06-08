import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const server = express();

server.use(
  cors({
    origin: true,
    credentials: true,
    maxAge: 86400,
  }),
);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(helmet());

export default server;
