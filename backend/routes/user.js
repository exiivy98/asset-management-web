const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Sequelize = require('sequelize');
const db = require('../models');

const router = express.Router();


router.get('/', async(req, res, next) => {
    const user = req.user;
    res.json(user);
})

// 회원가입
router.post('/', async (req, res) => {
    try{
        const hash_password = await bcrypt.hash(req.body.password, 12);

        const newUser = await db.User.create({
            userId: req.body.id,
            password: hash_password,
            name: req.body.name,
            gender: req.body.gender,
            position: req.body.position,
            department: req.body.department,
            phone: req.body.phone,
            adminState: req.body.adminState,
            approveState: false,
        });
        res.status(201).json(newUser);
    } catch (err){
        console.log(err);
        return next(err);
    }
});

//아이디 중복 확인
router.get('/idOverlap', async(req, res) => {
    try{
        const exUser = await db.User.findOne({
            where: {
                userId: req.query.id,
            },
        });

        if(exUser){
            return res.status(200).json({
                errorCode: 101,
                message: 'This id value already exists',
            });
        }else{
            return res.status(200).send('Not exist');
        }
    }catch(err){
        console.log(err);
        return next(err);
    }
});

// 로그인
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            console.log(info);
            return res.status(200).json(info);
        }
        return req.login(user, async (err) => {
            if(err){
                console.error(err);
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
});


// 로그아웃
router.post('/logout', (req, res, next) => {
    if(req.isAuthenticated()){
        req.logout((err) => {
            if (err) { return next(err); }
            req.session.destroy();
            return res.status(200).send('로그아웃 되었습니다.');
        });
    }
});

// 가입 승인 대기자 목록
router.post('/get/approve', async(req, res) => {
    try{
        const nonAppUser = await db.User.findAll(
            {
                attributes: ['name', 'userId', 'gender', 'department', 'position'],
                where: {approveState: "0"}
            }
        );
        return res.json(nonAppUser);
    }catch(err){
        console.log(err);
        return next(err);
    }
});

// 가입승인
router.post('/approve', async(req, res) => {
    try{
        for(let i of req.body.payload){
            db.User.update({approveState: "1"}, {where: {userId: i.userId}})
        }

        return res.status(201).send('succesfully updated');
    }catch(err){
        console.log(err);
        return next(err);
    }
});

// 정보 변경
router.post('/revise', async(req, res)=> {
    try{
        const updateValue = req.body.payload.content;
  
        if(req.body.payload.col == 'position'){
            await db.User.update(
                {position: updateValue}, {where: {id: req.body.payload.id}}
            )
        }else if(req.body.payload.col == 'department'){
            await db.User.update(
                {department: updateValue}, {where: {id: req.body.payload.id}}
            )
        }else if(req.body.payload.col == 'phone'){
            await db.User.update(
                {phone: updateValue}, {where: {id: req.body.payload.id}}
            )
        }else{
            return res.status(403).send('Wrong Request');
        }
        
        return res.status(201).send('succesfully updated');
    }catch(err){
        console.log(err);
        return next(err);
    }
});

// 직원가져오기
router.post('/get/all', async(req, res) => {
    const Op = Sequelize.Op;
    try{
        const nonAppUser = await db.User.findAll(
            {
                attributes: ['name', 'userId', 'gender', 'department', 'position'],
                where: {
                    approveState: "1",
                    id: {
                        [Op.ne]: req.body.id,
                    }
                }
            }
        );
        return res.json(nonAppUser);
    }catch(err){
        console.log(err);
        return next(err);
    }

});

// 직원삭제
router.post('/delete', async(req, res) => {
    try{
        for(let i of req.body.payload){
            db.User.destroy({where: {userId: i.userId}})
        }

        return res.status(201).send('succesfully updated');
    }catch(err){
        console.log(err);
        return next(err);
    }
});




module.exports = router;