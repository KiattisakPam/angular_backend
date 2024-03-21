import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { User, imageUpload } from "../model/model";
export const router = express.Router();

//เอา user ทั้งหมด
router.get("/", (req, res) => {
  conn.query('SELECT * FROM user', (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

//ค้นหาจาก id
router.get("/:id", (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * FROM user where userID = ?';
  sql = mysql.format(sql, [id]);
  
  conn.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      let userObject = result[0];
      res.status(201).json(userObject);
    }
  });
});


//insert user
router.post("/", (req, res) => {
  
  let user: User = req.body;
  let sql = "INSERT INTO `user` (`name`, `Password`, `Username` , `Role` , `Avatar`) VALUES (?, ?, ?, ?,?)";
  let image = 'https://cdn-icons-png.freepik.com/256/1077/1077114.png';
  let role = 'User';
  sql = mysql.format(sql, [
    user.name,
    user.password,
    user.username,
    role,
    image
  ]);
  console.log(user.password);

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
  })
})

router.post("user/upload" , (req , res)=>{
  let upload : imageUpload = req.body;
  let sql = "INSERT INTO `image` (`imagepath`, `uploadDate`, `ChosenImageID`) VALUES (?,?,?)";
  // sql = mysql.format(sql, [
  //   user.username,
  //   user.password,
  //   user.email,
  //   user.type,
  //   image
  // ]);
})