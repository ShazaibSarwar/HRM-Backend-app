const Joi = require('joi')
const router = require('express').Router();
const Employee = require('../../models/employee.model')
const Education = require('../../models/education.model')
const verifyHREmployee = require('../../middlewares/verifyHrEmployee.middleware')
const EducationValidation = require('../../controllers/Education/education.validator')


router.get("/api/education/:id", verifyHREmployee, (req, res) => {
    console.log(req.params.id);
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "education"
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
        .exec(function (err, employee) {
            // console.log(filteredCompany);
            res.send(employee);
        });
});
router.post("/api/education/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, EducationValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            Employee.findById(req.params.id, function (err, employee) {
                if (err) {
                    console.log(err);
                    res.send("err");
                } else {
                    let newEducation;

                    newEducation = {
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
                    console.log(req.body);
                }
            });
        }
    });
});
router.put("/api/education/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, EducationValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newEducation;

            newEducation = {
                SchoolUniversity: req.body.SchoolUniversity,
                Degree: req.body.Degree,
                Grade: req.body.Grade,
                PassingOfYear: req.body.PassingOfYear
            };

            Education.findByIdAndUpdate(req.params.id, newEducation, function (err, education) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newEducation);
                }
            });
        }
        console.log("put");
        console.log(req.body);
    });
});
router.delete("/api/education/:id/:id2", verifyEmployee, (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            Education.findByIdAndRemove({ _id: req.params.id2 }, function (
                err,
                education
            ) {
                if (!err) {
                    console.log("education deleted");
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
            console.log("delete");
            console.log(req.params.id);
        }
    });
});


module.exports = router