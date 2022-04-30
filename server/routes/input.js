const router = require('express').Router();
const pool2 = require("../db");


router.get("/", (req, res) => {
    res.send("hello ITR")
})

router.post("/input", async (req, res) => {
    try {
        const { name, middle_name, last_name, pan, itr_password, aadhaar, mobile } = req.body;
        const date = new Date()
        console.log(req.body)
        const newClient = await pool2.query("INSERT INTO clients(name, middle_name, last_name, pan, itr_password, aadhaar, mobile, date_created, date_modified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [name, middle_name, last_name, pan, itr_password, aadhaar, mobile, date, date]);
        res.json({success: true})   
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/clients", async (req, res) => {
    try {
        const clients = await pool2.query("SELECT * FROM clients")
        res.json(clients.rows)
    } catch (err) {
        console.error(err.message)
    }
})

router.get("/:pan", async (req, res) => {
    try {
        const { pan } = req.params;
        const info = await pool2.query("SELECT * FROM clients WHERE pan = $1", [pan])
        console.log(info.rows)
        res.json(info.rows[0].mobile)
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router