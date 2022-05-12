const db = require("../../models");
const Op = db.Sequelize.Op;
const Users = db.users

var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
    const existUser = Users.findOne({
        where: { email: req.body.email }
    }).then(
        user => {
            const email = user.email
            const result = {
                token: req.body.token
            };
            Users.update(result, { where: { email: email } })
        }
    )
    if (existUser) {
        res.send({ message: "User was registered" })
    } else {
        res.send({ message: "Create New User Account" })
        const result = Users.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: bcrypt.hashSync(req.body.password, 8),
            token: req.body.token
        });

        if (result) {
            res.send({ message: "Success Registered" })
        } else {
            res.status(404).send({ message: "Error: Create users" })
        }
    }
}

exports.single = (req,res) => {
    const exist = Users.findOne({where : {email: req.body.email}}).then(
        user => {
            if(!user){
                res.send({ message: "Users Not Found!" })
            } else {
                res.send(user)
            }
        }
    )

    if(!exist){
        res.status(404).send({message: "Error get single data"})
    }
}

