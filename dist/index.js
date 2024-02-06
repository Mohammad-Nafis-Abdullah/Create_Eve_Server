"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./schema/global.schema");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const root_router_1 = __importDefault(require("./routes/root.router"));
const not_found_router_1 = __importDefault(require("./routes/not-found.router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./middlewares/errorHandler");
const mongoDB_connect_1 = __importDefault(require("./db/mongoDB.connect"));
const home_banner_router_1 = __importDefault(require("./routes/home-banner.router"));
const createCollections_1 = __importDefault(require("./middlewares/createCollections"));
const services_router_1 = __importDefault(require("./routes/services.router"));
const venues_router_1 = __importDefault(require("./routes/venues.router"));
const bookings_router_1 = __importDefault(require("./routes/bookings.router"));
const sub_services_router_1 = __importDefault(require("./routes/sub-services.router"));
const users_router_1 = __importDefault(require("./routes/users.router"));
const payment_router_1 = __importDefault(require("./routes/payment.router"));
const packages_router_1 = __importDefault(require("./routes/packages.router"));
// VARIABLES
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
// MIDDLEWARES
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(mongoDB_connect_1.default);
app.use(createCollections_1.default);
// ALL ROUTES
app.use("/", root_router_1.default);
app.use("/home-banners", home_banner_router_1.default);
app.use("/services", services_router_1.default);
app.use("/sub-services", sub_services_router_1.default);
app.use("/venues", venues_router_1.default);
app.use("/bookings", bookings_router_1.default);
app.use("/users", users_router_1.default);
app.use("/payments", payment_router_1.default);
app.use("/packages", packages_router_1.default);
// NOT FOUND ROUTES
app.use("*", not_found_router_1.default);
// ERROR HANDLING MIDDLEWARE
app.use(errorHandler_1.errorHandler);
// APP LISTENER
app.listen(PORT, () => {
    console.log(`server is running in : http://localhost:${PORT}`);
});
