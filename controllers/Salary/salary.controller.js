const Employee = require('../../models/employee.model')
const Salary = require('../../models/salary.model')



exports.getSalaries = (req, res) => {
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.find()
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "salary"
            // populate: {
            //   path: "state",
            //   model: "State",
            //   populate: {
            //     path: "country",
            //     model: "Country"
            //   }
            // }
        })
        // .select(" -role -position -department")
        .select("FirstName LastName MiddleName")
        .exec(function (err, company) {
            // employee = employees;
            let filteredCompany = company.filter(data => data["salary"].length == 1);
            // console.log(filteredCompany);
            res.send(filteredCompany);
        });
};
exports.addSalary = (req, res) => {

    Employee.findById(req.params.id, function (err, employee) {
        if (err) {
            console.log(err);
            res.send("err");
        } else {
            if (employee.salary.length == 0) {
                let newSalary;

                newSalary = {
                    BasicSalary: req.body.BasicSalary,
                    BankName: req.body.BankName,
                    AccountNo: req.body.AccountNo,
                    AccountHolderName: req.body.AccountHolderName,
                    TaxDeduction: req.body.TaxDeduction
                };

                Salary.create(newSalary, function (err, salary) {
                    if (err) {
                        console.log(err);
                        res.send("error");
                    } else {
                        employee.salary.push(salary);
                        employee.save(function (err, data) {
                            if (err) {
                                console.log(err);
                                res.send("err");
                            } else {
                                console.log(data);
                                res.send(salary);
                            }
                        });
                        console.log("new salary Saved");
                    }
                });
                
            } else {
                res
                    .status(403)
                    .send("Salary Information about this employee already exits");
            }
        }
    });

};
exports.updateSalary = (req, res) => {

    let newSalary;

    newSalary = {
        BasicSalary: req.body.BasicSalary,
        BankName: req.body.BankName,
        AccountNo: req.body.AccountNo,
        AccountHolderName: req.body.AccountHolderName,
        TaxDeduction: req.body.TaxDeduction
    };

    Salary.findByIdAndUpdate(req.params.id, newSalary, function (err, salary) {
        if (err) {
            res.send("error");
        } else {
            res.send(newSalary);
        }
    });


};
exports.deleteSalary = (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        console.log("uuuuuuuunnnnnnnnnnnnnnndef", employee.salary[0]);
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            Salary.findByIdAndRemove({ _id: employee.salary[0] }, function (
                err,
                salary
            ) {
                if (!err) {
                    console.log("salary deleted");
                    Employee.update(
                        { _id: req.params.id },
                        { $pull: { salary: employee.salary[0] } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(salary);
                        }
                    );
                } else {
                    console.log(err);
                    res.send("error");
                }
            });
            console.log("delete");
            console.log("Delete salary with id ",req.params.id);
        }
    });
};

