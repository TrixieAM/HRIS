const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const xlsx = require("xlsx");
const uploads = multer({ dest: "uploads/" });
const router = express.Router();
const fs = require("fs");
//require('dotenv').config(); // Load environment variables

//MYSQL CONNECTION
const db = mysql.createPool({
  host: 'localhost',
  user: 'HRIST',
  password: '123',
  database: 'earist_hris',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});




router.get("/data", (req, res) => {
  const query = "SELECT * FROM vocational_table";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// CRUD for vocational_table
router.get("/vocational-table", (req, res) => {
  const query = "SELECT * FROM vocational_table";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send(result);
  });
});

router.post("/vocational-table", (req, res) => {
  const { vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated, person_id } = req.body;
  const query = "INSERT INTO vocational_table (vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated, person_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated, person_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).send({ message: "Vocational record created", id: result.insertId });
  });
});

router.put("/vocational-table/:id", (req, res) => {
  const { id } = req.params;
  const { vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated, person_id} = req.body;
  const query = "UPDATE vocational_table SET vocationalNameOfSchool = ?, vocationalDegree = ?, vocationalPeriodFrom = ?, vocationalPeriodTo = ?, vocationalHighestAttained = ?, vocationalYearGraduated = ?, person_id = ? WHERE id = ?";
  db.query(query, [vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated, person_id, id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send({ message: "Vocational record updated" });
  });
});

router.delete("/vocational-table/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM vocational_table WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send({ message: "Vocational record deleted" });
  });
});

module.exports = router;
