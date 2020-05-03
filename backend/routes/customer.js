const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Sequelize = require('sequelize');
const db = require('../models');

const router = express.Router();

// 고객 추가
router.post('/', async (req, res) => {
    try{
        console.log(req.body);
        const newCustomer = await db.Customer.create({
            name: req.body.name,
            gender: req.body.gender,
            birth: req.body.birth,
            phone: req.body.phone,
            UserId: req.body.userId,
        });
        res.status(201).json(newCustomer);
    } catch (err){
        console.log(err);
        return next(err);
    }
});

// 고객 목록
router.post('/list', async(req, res) => {
    try{
        const Customers = await db.Customer.findAll(
            {
                where: {UserId: req.body.id}
            }
        );
        return res.json(Customers);
    }catch(err){
        console.log(err);
        return next(err);
    }
});

// 모든 고객
router.post('/all/list', async(req, res) => {
    const Op = Sequelize.Op;
    try{
        const Customers = await db.Customer.findAll(
            {
                where: {
                    UserId: {
                        [Op.ne]: req.body.id,
                    }
                }
            }
        );
        return res.json(Customers);
    }catch(err){
        console.log(err);
        return next(err);
    }

});

// 고객 삭제
router.post('/delete', async(req, res) => {
    try{
        db.Customer.destroy({where: {id: req.body.payload[0].id}});

        return res.status(201).send('succesfully updated');
    }catch(err){
        console.log(err);
        return next(err);
    }
});

// 고객 자산 추가
router.post('/customer/asset', async (req, res) => {
    try{
        console.log(req.body);
        
        const newAsset = await db.Asset.create({
            purpose: req.body.purpose,
            goal: req.body.goal,
            depart: req.body.depart,
            name: req.body.name,
            month_ex: req.body.month_ex,
            month_real: req.body.month_real,
            year: req.body.year,
            total: req.body.total,
            present: req.body.present,
            enddate: req.body.enddate,
            term: req.body.term,
            risk: req.body.risk,
            ex_bm: req.body.ex_bm,
            money: req.body.money,
            date: req.body.date,
            startdate: req.body.startdate,
            account: req.body.account,
            addition: req.body.addition,
            customerId: req.body.id,
            quarterId: req.body.quarterId,
        });

        res.status(201).send('succeed');
    } catch (err){
        console.log(err);
        return next(err);
    }
});

// 고객 가족 자산 추가
router.post('/customer/family/asset', async (req, res) => {
    try{
        const Family = await db.Family.findAll(
            {
                attributes: ['id'],
                where: {
                    customerId: req.body.id,
                    name: req.body.family_name,
                }
            }
        );

        console.log(Family[0].dataValues.id);
        
        const newAsset = await db.Asset.create({
            purpose: req.body.purpose,
            goal: req.body.goal,
            depart: req.body.depart,
            name: req.body.name,
            month_ex: req.body.month_ex,
            month_real: req.body.month_real,
            year: req.body.year,
            total: req.body.total,
            present: req.body.present,
            enddate: req.body.enddate,
            term: req.body.term,
            risk: req.body.risk,
            ex_bm: req.body.ex_bm,
            money: req.body.money,
            date: req.body.date,
            startdate: req.body.startdate,
            account: req.body.account,
            addition: req.body.addition,
            FamilyId: Family[0].dataValues.id,
            quarterId: req.body.quarterId,
        });

        res.status(201).send('succeed');
    } catch (err){
        console.log(err);
        return next(err);
    }
});


// 고객 이름 가져오기
router.post('/name', async(req, res) => {
    try{
        const Customers = await db.Customer.findOne(
            {
                attributes: ['name'],
                where: {id: req.body.payload}
            }
        );
        return res.json(Customers);
    }catch(err){
        console.log(err);
        return next(err);
    }
});

// 고객 자산 가져오기
router.post('/get/customer/asset', async(req, res) => {
    try{
        const Assets = await db.Asset.findAll(
            {
                where: {
                    customerId: req.body.id,
                    quarterId: req.body.quarterId,
                }
            }
        );
        return res.json(Assets);
    }catch(err){
        console.log(err);
        return next(err);
    }
});

// 가족 추가
router.post('/family', async (req, res) => {
    try{        
        const newFamily = await db.Family.create({
            name: req.body.name,
            relation: req.body.relation,
            customerId: req.body.id,
        });
        res.status(201).json(newFamily);
    } catch (err){
        console.log(err);
        return next(err);
    }
});

// 고객에 대한 가족 가져오기
router.post('/family/get', async (req, res) => {
    try{        
        const Family = await db.Family.findAll(
            {
                where: {
                    customerId: req.body.id,
                }
            }
        );
        res.status(201).json(Family);
    } catch (err){
        console.log(err);
        return next(err);
    }
}) 



// 고객에 대한 가족 자산 정보 가져오기
router.post('/family/asset', async (req, res) => {
    try{        
        const Family = await db.Family.findAll(
            {
                where: {
                    customerId: req.body.id,
                }
            }
        );
        
        const AssetList = [];
        
        for(let i of Family){
            AssetList[i.id] = await db.Asset.findAll({
                where: {
                    FamilyId: i.id,
                    quarterId: req.body.quarterId,
                }
            });
        }

        res.status(201).json(AssetList);
    } catch (err){
        console.log(err);
        return next(err);
    }
});

// 분기 추가
router.post('/new/quarter', async (req, res) => {
    try{
        const newQuarter = await db.Quarter.create({
            name: req.body.name,
            customerId: req.body.customerId,
        });
        res.status(201).json(newQuarter);
    } catch (err){
        console.log(err);
        return next(err);
    }
});

// 분기 삭제
router.post('/delete/quarter', async(req, res) => {
    try{
        for(let i of req.body.payload.quarter){
            db.Quarter.destroy({where: {id: i}});
        }

        return res.status(201).send('succesfully updated');
    }catch(err){
        console.log(err);
        return next(err);
    }
});

// 분기 목록
router.post('/get/quarter', async(req, res) => {
    try{
        const Quarters = await db.Quarter.findAll(
            {
                where: {customerId: req.body.id}
            }
        );
        return res.json(Quarters);
    }catch(err){
        console.log(err);
        return next(err);
    }
});


// 자산 삭제
router.post('/delete/asset', async(req, res) => {
    try{
        for(let i of req.body.payload.payload){
            db.Asset.destroy({where: {id: i}});
        }

        return res.status(201).send('succesfully updated');
    }catch(err){
        console.log(err);
        return next(err);
    }
});

// 가족 삭제
router.post('/delete/family', async(req, res) => {
    try{        
        db.Family.destroy({where: {
            customerId: req.body.payload.customerId,
            name: req.body.payload.family_name,
        }});

        return res.status(201).send('succesfully updated');
    }catch(err){
        console.log(err);
        return next(err);
    }
});
module.exports = router;