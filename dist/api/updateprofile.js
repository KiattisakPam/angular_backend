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
exports.router.put("/:UserID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserID = +req.params.UserID;
    let update = req.body; // รับข้อมูลที่ต้องการอัปเดตจาก req.body
    let sql = "UPDATE user SET Avatar = ? WHERE UserID = ?;";
    sql = mysql_1.default.format(sql, [update.ImagePath, UserID]);
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
