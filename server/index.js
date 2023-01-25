import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import chalkAnimation from "chalk-animation";

// DATA IMPORTS
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      chalkAnimation.rainbow(
        `\n=========================================\n\n Server running on port: ${PORT}\n\n=========================================\n`
      )
    );
    // WARNING! ONLY ADD DATA --- FROM BELOW LINES --- ONE TIME
    // User.insertMany(dataUser), console.log("\nData has been added to the database!");
    // Product.insertMany(dataProduct),
    //  console.log("\nProduct data has been added to the database!\n");
    // ProductStat.insertMany(dataProductStat),
    //  console.log(
    //    `\nPRODUCT STAT DATA has been added to the ${process.env.MONGO_URL} database!\n`
    //  );
    // Transaction.insertMany(dataTransaction),
    //  console.log(`\nTRANSACTION DATA HAS BEEN ADDED TO THE ${process.env.MONGO_URL} DATABASE!\n`);
    // OverallStat.insertMany(dataOverallStat),
    //  console.log(
    //    `\nOVERALL STAT DATA has been added to the ${process.env.MONGO_URL} database!\n`
    //  );
    // AffiliateStat.insertMany(dataAffiliateStat),
    //  console.log(
    //    `\nAFFILIATE STAT DATA has been added to the ${
    //      (process.env, MONGO_URL)
    //    } database!\n`
    //  );
  })
  .catch((error) => console.log(`${error} did not connect`));
