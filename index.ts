import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { AdminRoute, VandorRoute } from "./routes";
import { MONGO_URI } from "./config";

const app = express();
// Config middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vandor", VandorRoute);

mongoose
	.connect(MONGO_URI)
	.then((result) => {
		console.log("Database connected succesfully");
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(5000, () => {
	console.clear();
	console.log("Server is running on http://localhost:5000");
});
