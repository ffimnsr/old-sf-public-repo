import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import uuid from "uuid";
import cors from "cors";
import passport from "passport";
import helmet from "helmet";
import compression from "compression";
import mutler from "multer";
import mongoose from "mongoose";
import methodOverride from "method-override";
import acl from "acl";
import AWS from "aws-sdk";
import winston from "winston";

import { default as routes } from "./routes";
import { mongoUri, redisUri } from "./config";

// Check if running in production environment
const isProduction = process.env.NODE_ENV === "production";

// Create express server
const app = express();

winston.info(`mongo ${mongoUri}`);
winston.info(`redis ${redisUri}`);

// AWS configuration
AWS.config.loadFromPath("config.json");
AWS.config.update({ region: "us-west-2" });

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(methodOverride());
app.use("/.well-known", express.static(".well-known"));

// Passport configuration
app.use(passport.initialize());
require("./config/passport");

// Access control configuration
function setRoles() {
    const nodeAcl = new acl(new acl.memoryBackend());

    nodeAcl.allow([
        {
            roles: "admin",
            allows: [
                { resources: "/admin", permissions: "*" }
            ]
        },
        {
            roles: "member",
            allows: [
                { resources: "/", permissions: "get" }
            ]
        },
        {
            roles: "guest",
            allows: []
        }
    ]);

    // Role inheritance
    nodeAcl.addRoleParents("user", "guest");
    nodeAcl.addRoleParents("admin", "user");
}
1
// MongoDB configuration
mongoose.connect(mongoUri)
    .then(function() {

    })
    .catch(function(err) {

    });

if (isProduction) {
    mongoose.set("debug", false);
}

// Load routes
app.use(routes);

// Assign an identifier for every requests
function assignId(req: Request, res: Response, next: NextFunction) {
    (<any>req).id = uuid.v4();
    next();
}

app.use(assignId);

// Log requests
morgan.token("id", function(req: any) {
    return req.id;
});

app.use(morgan(":id :method :url :response-time"));

app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error("Not Found");
    (<any>err).status = 404;
    next(err);
});

if (!isProduction) {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        winston.error(err.stack);

        res.status((<any>err).status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err
            }
        });
    });
} else {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status((<any>err).status || 500);
        res.json({
            errors: {
                message: err.message,
                error: {}
            }
        });
    });
}

export default app;
