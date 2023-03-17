import Express from "express";
import cors from "cors";
import passport from "passport";
import { jwtStrategy } from "./config/passport";

import userRouter from "./routes/user";

const app = Express();

app.use(Express.json());

app.use(cors());
app.use(passport.initialize());

passport.use(jwtStrategy);

app.use("/users", userRouter);

export default app;
