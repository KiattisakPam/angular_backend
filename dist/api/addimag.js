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
exports.router.post("/:UserID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserID = +req.params.UserID;
    let update = req.body; // รับข้อมูลที่ต้องการอัปเดตจาก req.body
    let Elo = 1000;
    // เพิ่มข้อมูลรูปลงในฐานข้อมูล
    let sql = "INSERT INTO image (ImagePath, UploadDate, EloRating, UserID) VALUES (?, ?, ?, ?)";
    sql = mysql_1.default.format(sql, [update.ImagePath, update.UploadDate, Elo, UserID]);
    dbconnect_1.conn.query(sql, (err, result) => {
        if (err) {
            console.error("Error adding image to database:", err);
            res.status(500).json({ error: "An error occurred while adding image to database" });
        }
        else {
            res.status(201).json({ message: "Image added to database successfully" });
        }
    });
}));
// router.put("/:id/:username/:name", async (req, res) => {
//     const UserID = + req.params.id;
//     const Username = + req.params.username;
//     const name = + req.params.name;
//     let update: imageUpload = req.body; // รับข้อมูลที่ต้องการอัปเดตจาก req.body
//     let Elo = 1000;
//     // เพิ่มข้อมูลรูปลงในฐานข้อมูล
//     let sql = "INSERT INTO image (ImagePath, UploadDate, EloRating, UserID) VALUES (?, ?, ?, ?)";
//     sql = mysql.format(sql, [update.ImagePath, update.UploadDate, Elo, UserID]);
//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.error("Error adding image to database:", err);
//             res.status(500).json({ error: "An error occurred while adding image to database" });
//         } else {
//             res.status(201).json({ message: "Image added to database successfully" });
//         }
//     });
// });
