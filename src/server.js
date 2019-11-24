import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import * as env from 'dotenv';
import {verifyToken} from './verifyToken';
env.config();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () =>{ console.log('DB connected')}
);
polka()
	.use(bodyParser.json())
	.use(session({
		secret: process.env.TOKEN_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 36000000 //1000ms*60s*60m*10h=10h
		}
	}))
	//.use(verifyToken)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: req => ({
				user: req.session && req.session.user //==req.session.user if both exist
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
