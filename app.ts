import express from "express";
import { router as index } from "./api/index";
import { router as users } from "./api/users";
import { router as images } from "./api/images";
import { router as vote } from "./api/vote";
import { router as rating } from "./api/rating";
// import { router as addimg } from "./api/addimag";
// import { router as deletee } from "./api/delete";
// import { router as uppro } from "./api/updateprofile";
import bodyParser from "body-parser";
import cors from "cors";


export const app = express();
app.use(
  cors({
    origin: "*",
  })
);


app.use(bodyParser.json());
app.use(bodyParser.text());
app.use("/" , index);
app.use("/user" , users);
app.use("/image" , images);
app.use("/vote" , vote);
app.use("/rating" , rating);
// app.use("/addimg" , addimg);
// app.use("/delete" , deletee);
// app.use("/uppro" , uppro);

