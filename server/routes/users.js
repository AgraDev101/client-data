const router = require('express').Router();
// const passport = require('passport');
const utils = require('../lib/utils');
const pool2 = require("../db");
const pool = require("../db");
const { response } = require('express');

router.get("/data", utils.authMethod, (req, res, next) => {
    // console.log(req.jwt)
    res.status(200).json({msg: "authorized"})
})

router.get("/data2", (req, res, next) => {
    res.json({msg: "bleh"})
})

router.post("/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const newUserCheck = await pool2.query("SELECT * FROM users WHERE email = $1", [email])
        console.log(newUserCheck)
        if (newUserCheck.rowCount === 1) {
            res.status(200).json({msg: "user already exist"})
        } else {
            const date = new Date()
            const saltHash = utils.genPassword(password)
            const salt = saltHash.salt 
            const hash = saltHash.hash 
            const newUser = await pool2.query("INSERT INTO users (email, hash, salt, date_created, last_accessed) VALUES ($1, $2, $3, $4, $5)", [email, hash, salt, date, date])
            res.status(200).json({msg: "user created"})
        }
    } catch (err) {
        console.error(err.message)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userLogin = await pool2.query("SELECT * FROM users WHERE email = $1", [email])
        if (userLogin.rowCount === 0) {
            res.status(200).json({success: false})
        } else if (userLogin.rowCount === 1) {
            const isValid  = utils.validPassword(password, userLogin.rows[0].hash, userLogin.rows[0].salt)
            if (isValid) {
                const tokenObject = utils.issueJWT(userLogin)
                res.status(200).json({success: true, token: tokenObject.token, expiresIn: tokenObject.expires})
            } else {
                res.status(200).json({success: false})
                next()
            }
        }

    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;