// Imports
import express from "express";
import cors from "cors";
import controllers from "./controllers";
import logger from "./utils/logger";
import { logRequests, logResponses } from "./middlewares/logMiddleware";

// Instantiating the Express object.
const app = express();
const port = 8080;

// Set up cors so localhost:3000 can access the server
app.use(cors());

// Set up json body parser
app.use(express.json());

// Log all incoming requests
app.use(logRequests);

// Log all outgoing responses
app.use(logResponses);

// Set up API controllers
app.use("/api", controllers);

// Set app to listen on port 8080
app.listen(port, () => {
  logger.info(`Server is listening on http://localhost:${port}...`);
});
