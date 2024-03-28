"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dbconnect_1 = require("../dbconnect");
const mysql_1 = __importDefault(require("mysql"));
exports.router = express_1.default.Router();
exports.router.post("/", (req, res) => {
    let vote = req.body;
    let sql = "INSERT INTO `votes` (`userID`, `imageID`, `elorating`, `voteDate`) VALUES (?, ?, ?, NOW())";
    sql = mysql_1.default.format(sql, [
        vote.userID,
        vote.imageID,
        vote.elorating,
    ]);
    dbconnect_1.conn.query(sql, (err, result) => {
        if (err) {
            console.error("Error updating vote count:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(200).json({ message: "Vote count updated successfully" });
    });
});
