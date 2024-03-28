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
exports.router.delete("/:id", (req, res) => {
    let id = req.params.id;
    let sqlVotes = 'DELETE FROM votes WHERE ImageID = ?';
    sqlVotes = mysql_1.default.format(sqlVotes, [id]);
    let sqlImage = 'DELETE FROM image WHERE ImageID = ?';
    sqlImage = mysql_1.default.format(sqlImage, [id]);
    dbconnect_1.conn.query(sqlVotes, (err, resultVotes) => {
        if (err) {
            console.error("Error deleting votes:", err);
            res.status(500).json({ error: "An error occurred while deleting data" });
            return;
        }
        dbconnect_1.conn.query(sqlImage, (err, resultImage) => {
            if (err) {
                console.error("Error deleting image:", err);
                res.status(500).json({ error: "An error occurred while deleting data" });
                return;
            }
            res.status(201).json({ message: "Data deleted successfully" });
        });
    });
});
