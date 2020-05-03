const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require('../models');

module.exports = ()=> {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password'
    }, async (userId, password, done) => {
        try{
            const exUser = await db.User.findOne({ where : { userId }});
            
            if(!exUser){
                return done(null, false, {reason: 'No Users'});
            }

            const exPassword = await bcrypt.compare(password, exUser.password);
            if(!exPassword){
                return done(null, false, {reason: 'Wrong Password'});
            }else{
                if(exUser.approveState == true){
                    return done(null, exUser);
                }else{
                    return done(null, false, { reason: '승인 대기중입니다' });
                }
            }
        }catch(err){
            console.error(err);
            return done(err);
        }
    }));
};