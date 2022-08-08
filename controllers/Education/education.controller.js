const Employee = require('../../models/employee.model')
const Education = require('../../models/education.model')

// get Education of particular employee
exports.getEducation = (req, res) => {

    Employee.findById(req.params.id)
        .populate({ path: "education" })
        .select("FirstName LastName MiddleName")
        .exec(function (err, employee) {
            res.send(employee);
        });
};

// Add Education of Particular Employee
exports.addEducation = (req, res) => {
    Employee.findById(req.params.id, function (err, employee) {
        if (err) {
            console.log(err);
            res.send("error");
        } else {

            let newEducation = {
                SchoolUniversity: req.body.SchoolUniversity,
                Degree: req.body.Degree,
                Grade: req.body.Grade,
                PassingOfYear: req.body.PassingOfYear
            };

            Education.create(newEducation, function (err, education) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    employee.education.push(education);
                    employee.save(function (err, data) {
                        if (err) {
                            console.log(err);
                            res.send("err");
                        } else {
                            console.log(data);
                            res.send(education);
                        }
                    });
                    console.log("new Education Saved");
                }
            });

        }
    });
};

// Update Education by Education ID
exports.updateEducation = (req, res) => {

    let newEducation = {
        SchoolUniversity: req.body.SchoolUniversity,
        Degree: req.body.Degree,
        Grade: req.body.Grade,
        PassingOfYear: req.body.PassingOfYear
    };

    Education.findByIdAndUpdate(req.params.id, newEducation, function (err, education) {
        if (err) res.send("error");
        res.send(newEducation);

    });
};

// Delete Education and deleting and updating Education from Employee's details as well
exports.deleteEducation = (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            Education.findByIdAndRemove({ _id: req.params.id2 }, function ( err, education) {
                if (!err) {
                    console.log("education deleted");
                    // Removing Education from Employees Deatails as
                    Employee.findByIdAndUpdate({ _id: req.params.id }, { $pull: { education: req.params.id2 } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(education);
                        });
                } else {
                    console.log(err);
                    res.send("error");
                }
            });
        }
    });
};


