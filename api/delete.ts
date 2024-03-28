import express from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
export const router = express.Router();

router.delete("/:id", (req, res) => {
    let id = req.params.id;

    let sqlVotes = 'DELETE FROM votes WHERE ImageID = ?';
    sqlVotes = mysql.format(sqlVotes, [id]);

    let sqlImage = 'DELETE FROM image WHERE ImageID = ?';
    sqlImage = mysql.format(sqlImage, [id]);
    
    conn.query(sqlVotes, (err, resultVotes) => {
        if (err) {
            console.error("Error deleting votes:", err);
            res.status(500).json({ error: "An error occurred while deleting data" });
            return;
        }

        conn.query(sqlImage, (err, resultImage) => {
            if (err) {
                console.error("Error deleting image:", err);
                res.status(500).json({ error: "An error occurred while deleting data" });
                return;
            }

            res.status(201).json({ message: "Data deleted successfully" });
        });
    });
});
