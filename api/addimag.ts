import express from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { User, imageUpload } from "../model/model";
export const router = express.Router();



router.post("/:UserID", async (req, res) => {
    const UserID = +req.params.UserID;

    let update: imageUpload = req.body; // รับข้อมูลที่ต้องการอัปเดตจาก req.body

    let Elo = 1000;
    // เพิ่มข้อมูลรูปลงในฐานข้อมูล
    let sql = "INSERT INTO image (ImagePath, UploadDate, EloRating, UserID) VALUES (?, ?, ?, ?)";
    sql = mysql.format(sql, [update.ImagePath, update.UploadDate, Elo, UserID]);

    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Error adding image to database:", err);
            res.status(500).json({ error: "An error occurred while adding image to database" });
        } else {
            res.status(201).json({ message: "Image added to database successfully" });
        }
    });
});

