const Employee = require('../../models/employee.model')
const Salary = require('../../models/salary.model')

// Get All Salaries
exports.getSalaries = (req, res) => {

    Employee.find()
        .populate({path: "salary" })
        .select("FirstName LastName MiddleName")
        .exec(function (err, company) {
            let filteredCompany = company.filter(data => data["salary"].length == 1);
            // console.log(filteredCompany);
            res.send(filteredCompany);
        });
};

// Add a salry of paticular employee
exports.addSalary = (req, res) => {

    Employee.findById(req.params.id, function (err, employee) {
        if (err) {
            console.log(err);
            res.send("err");
        } else {
            if (employee.salary.length == 0) {
                let newSalary = {
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
                        
                    }
                });
                
            } else {
                res.status(403).send("Salary Information about this employee already exits");
            }
        }
    });

};

// Update salary 
exports.updateSalary = (req, res) => {

    let newSalary = {
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

// Delete Salary 
exports.deleteSalary = (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {

        if (err) {
            res.send("error");
            console.log(err);
        } else {
            Salary.findByIdAndRemove({ _id: employee.salary[0] }, function (err,salary) {
                if (!err) {
                    console.log("salary deleted");
                    Employee.findByIdAndUpdate(
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
        }
    });
};

