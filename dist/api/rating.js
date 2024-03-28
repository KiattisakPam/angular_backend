"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dbconnect_1 = require("../dbconnect");
exports.router = express_1.default.Router();
exports.router.use(express_1.default.json());
exports.router.use(express_1.default.urlencoded({ extended: true }));
// โชว์ 10 อันดับ มาก ไป น้อย
exports.router.get("/top10", (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        const name = req.query.name;
        res.send("Method GET in user.ts with" + id);
    }
    else {
        const sql = 'SELECT * FROM image ORDER BY EloRating DESC LIMIT 10;';
        dbconnect_1.conn.query(sql, (err, result) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.json(result);
            }
        });
    }
});
// โชว์ 10 อันดับ มาก ไป น้อย
exports.router.get("/7day", (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        const name = req.query.name;
        res.send("Method GET in user.ts with" + id);
    }
    else {
        const sql = `
    SELECT vote.rating, image.*
    FROM vote
    JOIN image ON vote.mid = image.mid
    WHERE vote.date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
    ORDER BY vote.rating DESC;
    `;
        dbconnect_1.conn.query(sql, (err, result) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.json(result);
            }
        });
    }
});
//user ไม่รวม admin
exports.router.get("/", (req, res) => {
    dbconnect_1.conn.query('SELECT * FROM user WHERE Role not in("Admin")', (err, result) => {
        if (err)
            throw err;
        res.json(result);
    });
});
