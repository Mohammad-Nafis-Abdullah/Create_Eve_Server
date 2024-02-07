import "./schema/global.schema";
import "dotenv/config";
import express from "express";
import cors from "cors";
import rootRouter from "./routes/root.router";
import notFoundRouter from "./routes/not-found.router";
import cookieParser from "cookie-parser";
import stripe from "stripe";
import { errorHandler } from "./middlewares/errorHandler";
import mongodbConnect from "./db/mongoDB.connect";
import homeBannerRouter from "./routes/home-banner.router";
import createCollections from "./middlewares/createCollections";
import servicesRouter from "./routes/services.router";
import venuesRouter from "./routes/venues.router";
import bookingsRouter from "./routes/bookings.router";
import subServiceRouter from "./routes/sub-services.router";
import usersRouter from "./routes/users.router";
import paymentRouter from "./routes/payment.router";
import packagesRouter from "./routes/packages.router";

// VARIABLES
const PORT = process.env.PORT || 5000;
const app = express();

// MIDDLEWARES
app.use(cors({ origin: "https://create-eve.web.app/", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(mongodbConnect);
app.use(createCollections);

// ALL ROUTES
app.use("/", rootRouter);
app.use("/home-banners", homeBannerRouter);
app.use("/services", servicesRouter);
app.use("/sub-services", subServiceRouter);
app.use("/venues", venuesRouter);
app.use("/bookings", bookingsRouter);
app.use("/users", usersRouter);
app.use("/payments", paymentRouter);
app.use("/packages", packagesRouter);

// NOT FOUND ROUTES
app.use("*", notFoundRouter);

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

// APP LISTENER
app.listen(PORT, () => {
    console.log(`server is running in : http://localhost:${PORT}`);
});
