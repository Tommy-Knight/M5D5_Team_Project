import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import reviewRoutes from "../review/index.js";
// import productRoutes from "../product/index.js";
import {
	badRequestErrorHandler,
	notFoundErrorHandler,
	forbiddenErrorHandler,
	catchAllErrorHandler,
} from "./errorHandlers.js";

import {fileURLToPath} from "url";
import {dirname, join} from "path";

const publicPath = join(dirname(fileURLToPath(import.meta.url)), "../../public");

const server = express();
const Port = 3001;

server.use(express.json()); 
server.use(cors());
server.use("/reviews", reviewRoutes);
// server.use("/products", productRoutes);

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);

server.listen(Port, () => {
    console.log("Server running on port :", Port)
})