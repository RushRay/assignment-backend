const db = require('../models/index')
const { Op } = require("sequelize");
const fs = require('fs')
const User = db.user
const path = require('path')

exports.create = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({
            message: '用户名不能为空！'
        });
        return;
    }

    const user = {
        userName: req.body.username,
        password: req.body.password,
        nickName: req.body.nickName,
        sign: req.body.sign,
        avaUrl: req.body.avaUrl
    };

    User.create(user).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "新建用户出错"
        })
    })
}
exports.find = (req, res) => {
    if (!req.params.username) {
        res.status(400).send({
            message: '用户名不能为空！'
        })
        return;
    }

    User.findAll({
        where: {
            userName: req.query.username
        }
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "新建用户出错"
        })
    })
}
exports.updateNickName = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({
            message: '用户名不能为空！'
        })
        return;
    }

    if (!req.body.nickName) {
        res.status(400).send({
            message: '昵称不能为空！'
        })
        return;
    }

    if (!User.findAll({
        where: {
            userName: req.body.username
        }
    })) {
        res.status(400).send({
            message: '该用户不存在'
        })
        return;
    }

    User.update(
        {
            nickName: req.body.nickName
        },
        {
        where: {
            userName: {
                [Op.eq]: req.body.username
            }
        }
    }).then(date => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "用户昵称修改出错"
        })
    })
}
exports.editUserImg = (req, res) => {
    const file = req.file

    console.log(path.parse(req.file.originalname).ext);
    let oldname = req.file.path //获取path
    let newname = req.file.path + path.parse(req.file.originalname).ext
    fs.renameSync(oldname, newname) //重命名
    console.log('文件类型：%s', file.mimetype)
    console.log('原始文件名：%s', file.originalname)
    console.log('文件大小：%s', file.size)
    console.log('文件保存路径：%s', file.path)

    User.update(
        {
            avaUrl:'http://localhost:3000/'+file.filename+path.parse(req.file.originalname).ext//修改数据库
        },
        {
            where:{
                userName:req.body.username
            }
        }).then((data)=>{
            res.send(data);
        })
}
