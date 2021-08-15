import "reflect-metadata";
import express from "express";
import cors from "cors";
import {ConnectionOptions, createConnection} from "typeorm";
import dbConfig from "./ormconfig";
import {ApolloServer} from "apollo-server-express"
import { buildSchema } from "type-graphql";
import {UserResolver} from "./resolvers/user";
import {ItemResolver} from "./resolvers/item";
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__, REDIS_SECRET } from "./utils/constants";
import { MyContext } from "./utils/types";
// import { sendEmail } from "./utils/sendEmail";


(async ()=>{
    // sendEmail('mattia@mattia.com', "hi")
    //database connection
    await createConnection(dbConfig as ConnectionOptions);

    //set express

    const app = express()

    app.use(cors({
        origin: "http://localhost:8080",
        credentials: true
    }))

    //set redis and session

    const RedisStore = connectRedis(session);
    const redis = new Redis();
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 10,
                httpOnly: true,
                sameSite: "lax",
                secure: __prod__,
            },
            saveUninitialized: false,
            secret: REDIS_SECRET,
            resave: false,
        })
    )

    //set graphql
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver, ItemResolver],
        validate: false,
      }),
      context: ({req, res}): MyContext => ({req, res, redis}),
    });

    apolloServer.applyMiddleware({app,cors:false})

    app.listen(4000, () => {
        console.log("server started on localhost:4000")
    })
})()
