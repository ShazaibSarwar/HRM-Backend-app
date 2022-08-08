const Employee = require('../../models/employee.model')
const jwt =  require('jsonwebtoken')
const jwtKey = process.env.jwtKey

exports.login = (req, res) => {

    console.log('Login is hitted')

    Employee.findOne({ Email: req.body.email },
        "Password _id Account FirstName LastName",
        function (err, document) {
            if (err || document == null) {
                res.send("false");
            } else {
                if (document.Password == req.body.password) {
                    emp = {
                        _id: document._id,
                        Account: document.Account,
                        FirstName: document.FirstName,
                        LastName: document.LastName
                    };
                    var token = jwt.sign(emp, jwtKey);
                    res.send(token);
                } else {
                    res.sendStatus(400);
                }
            }
        }
    );



};

