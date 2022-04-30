const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const pool2 = require("../db");

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
};

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload)
            pool2.query("SELECT * FROM users WHERE user_id = $1", [jwt_payload.sub], (err, user) => {
                if (err) {
                    return done(err, false)
                }
                if (user.rows[0]) {
                    return done(null, user.rows[0])
                } else {
                    return done(null, false)
                }
            })   
        } catch (err) {
            console.error(err.message)
            done(err)
        }
    }))
}
    // passport.use(new JwtStrategy(options, async (jwt_payload, done) => {}))
//         const passportUser = await pool2.query("SELECT * FROM users WHERE user_id = $1", [jwt_payload.sub])
//         const user = passportUser.rows[0]
//         (err, user) => {

//         }
// }}
        // await JSON.stringify(pool2.query("SELECT * FROM users WHERE user_id = $1", [jwt_payload.sub], function (err, user) {
        //     if (err) {
        //         return done(err, false)
        //     }
        //     if (user) {
        //         return done(null, user.rows[0])
        //     } else {
        //         return done(null, false)
        //     }
        // }))

        // User.findOne({_id: jwt_payload.sub}, function(err, user) {
        //     if (err) {
        //         return done(err, false);
        //     }
        //     if (user) {
        //         return done(null, user);
        //     } else {
        //         return done(null, false);
        //     }
            
        // });