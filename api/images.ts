import express from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { User, imageUpload } from "../model/model";
export const router = express.Router();

router.get("/", (req, res) => {
  
    conn.query('SELECT * FROM image', (err, result) => {
      if(err) throw err;
      res.json(result);
    });
  });


  router.get("/:id", (req, res) => {
    let id = req.params.id;
    let sql = 'SELECT * FROM image where UserID = ?';
    sql = mysql.format(sql, [id]);
    
    conn.query(sql, (err, result) => {
      if (err) throw err;
  
        let userObject = result;
        res.status(201).json(userObject);
    });
  });


  router.put("/:id", async (req, res) => {

    const id = + req.params.id;
    console.log(id);
    let update: imageUpload = req.body; // รับข้อมูลที่ต้องการอัปเดตจาก req.body
    console.log(req.body);
    let updateOriginal: imageUpload | undefined;
  
    let sql = mysql.format("select * from image where imageID = ?", [id]);
  
    let result = await queryAsync(sql);
    const rawData = JSON.parse(JSON.stringify(result));
    console.log(rawData);
    updateOriginal = rawData[0] as imageUpload;
    console.log(updateOriginal);
  
    let updateImage = { ...updateOriginal, ...update };
    console.log(update);
    console.log(updateImage);
    console.log(updateImage.EloRating);
    sql =
      "update image set ImagePath=?, UploadDate=?, EloRating=? , UserID=? where ImageID=?";
    sql = mysql.format(sql, [
      updateImage.ImagePath,
      updateImage.UploadDate,
      updateImage.EloRating,
      updateImage.UserID,
      id
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(201).json({ affected_row: result.affectedRows });
    });
  });
