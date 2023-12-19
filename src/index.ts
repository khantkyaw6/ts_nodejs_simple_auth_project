import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(
	cors({
		credentials: true,
	})
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const MONGO_URL =
	'mongodb+srv://devkay06:admin12345@cluster0.bxlrnnd.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());

server.listen(4000, () => {
	console.log('Server is listening at Port 4000');
});
