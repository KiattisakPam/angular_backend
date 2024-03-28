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
//เอา user ทั้งหมด
exports.router.get("/", (req, res) => {
    dbconnect_1.conn.query('SELECT * FROM user', (err, result) => {
        if (err)
            throw err;
        res.json(result);
    });
});
//ค้นหาจาก id
exports.router.get("/:id", (req, res) => {
    let id = req.params.id;
    let sql = 'SELECT * FROM user where userID = ?';
    sql = mysql_1.default.format(sql, [id]);
    dbconnect_1.conn.query(sql, (err, result) => {
        if (err)
            throw err;
        if (result.length > 0) {
            let userObject = result[0];
            res.status(201).json(userObject);
        }
    });
});
//insert user
exports.router.post("/", (req, res) => {
    let user = req.body;
    let sql = "INSERT INTO `user` (`name`, `Password`, `Username` , `Role` , `Avatar`) VALUES (?, ?, ?, ?,?)";
    let image = 'https://cdn-icons-png.freepik.com/256/1077/1077114.png';
    let role = 'User';
    sql = mysql_1.default.format(sql, [
        user.name,
        user.password,
        user.username,
        role,
        image
    ]);
    console.log(user.password);
    dbconnect_1.conn.query(sql, (err, result) => {
        if (err)
            throw err;
        res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});
exports.router.post("user/upload", (req, res) => {
    let upload = req.body;
    let sql = "INSERT INTO `image` (`imagepath`, `uploadDate`, `ChosenImageID`) VALUES (?,?,?)";
    // sql = mysql.format(sql, [
    //   user.username,
    //   user.password,
    //   user.email,
    //   user.type,
    //   image
    // ]);
});
