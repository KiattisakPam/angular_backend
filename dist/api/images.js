"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dbconnect_1 = require("../dbconnect");
const mysql_1 = __importDefault(require("mysql"));
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    dbconnect_1.conn.query('SELECT * FROM image', (err, result) => {
        if (err)
            throw err;
        res.json(result);
    });
});
exports.router.get("/:id", (req, res) => {
    let id = req.params.id;
    let sql = 'SELECT * FROM image where UserID = ?';
    sql = mysql_1.default.format(sql, [id]);
    dbconnect_1.conn.query(sql, (err, result) => {
        if (err)
            throw err;
        let userObject = result;
        res.status(201).json(userObject);
    });
});
exports.router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    console.log(id);
    let update = req.body; // รับข้อมูลที่ต้องการอัปเดตจาก req.body
    console.log(req.body);
    let updateOriginal;
    let sql = mysql_1.default.format("select * from image where imageID = ?", [id]);
    let result = yield (0, dbconnect_1.queryAsync)(sql);
    const rawData = JSON.parse(JSON.stringify(result));
    console.log(rawData);
    updateOriginal = rawData[0];
    console.log(updateOriginal);
    let updateImage = Object.assign(Object.assign({}, updateOriginal), update);
    console.log(update);
    console.log(updateImage);
    console.log(updateImage.EloRating);
    sql =
        "update image set ImagePath=?, UploadDate=?, EloRating=? , UserID=? where ImageID=?";
    sql = mysql_1.default.format(sql, [
        updateImage.ImagePath,
        updateImage.UploadDate,
        updateImage.EloRating,
        updateImage.UserID,
        id
    ]);
    dbconnect_1.conn.query(sql, (err, result) => {
        if (err)
            throw err;
        res.status(201).json({ affected_row: result.affectedRows });
    });
}));
// router.post("/uploadImage", async (req, res) => {
//   const UserID = +req.body.UserID;
//   const ImagePath = req.body.ImagePath;
//   const UploadDate = req.body.UploadDate;
//   let Elo = 1000;
//   // เพิ่มข้อมูลรูปลงในฐานข้อมูล
//   let sql = "INSERT INTO image (ImagePath, UploadDate, EloRating, UserID) VALUES (?, ?, ?, ?)";
//   sql = mysql.format(sql, [ImagePath, UploadDate, Elo, UserID]);
//   conn.query(sql, (err, result) => {
//       if (err) {
//           console.error("Error adding image to database:", err);
//           res.status(500).json({ error: "An error occurred while adding image to database" });
//       } else {
//           res.status(201).json({ message: "Image added to database successfully" });
//       }
//   });
// });
