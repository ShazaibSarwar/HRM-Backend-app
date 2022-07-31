const router = require('express').Router();
const Joi = require('joi')
const Employee = require('../../models/employee.model')
const verifyHR = require('../../middlewares/verifyHr.middleware')
const verifyHREmployee = require('../../middlewares/verifyHrEmployee.middleware')
const EmployeeValidation = require('../../controllers/Employee/employee.validator')
const EmployeeValidationUpdate = require('../../controllers/Employee/employeeUpdate.validator')
const EmployeePersonalInfoValidation = require('../../controllers/Employee/empPersonalInfo.validator')

router.get("/api/employee", verifyHR, (req, res) => {
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.find()
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "role position department"
            // populate: {
            //   path: "state",
            //   model: "State",
            //   populate: {
            //     path: "country",
            //     model: "Country"
            //   }
            // }
        })
        .select("-salary -education -familyInfo -workExperience -Password")
        .exec(function (err, employee) {
            res.send(employee);
        });
});
router.post("/api/employee", verifyHR, (req, res) => {
    Joi.validate(req.body, EmployeeValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newEmployee;

            newEmployee = {
                Email: req.body.Email,
                Password: req.body.Password,
                role: req.body.RoleID,
                Account: req.body.Account,
                Gender: req.body.Gender,
                FirstName: req.body.FirstName,
                MiddleName: req.body.MiddleName,
                LastName: req.body.LastName,
                DOB: req.body.DOB,
                ContactNo: req.body.ContactNo,
                EmployeeCode: req.body.EmployeeCode,
                department: req.body.DepartmentID,
                position: req.body.PositionID,
                DateOfJoining: req.body.DateOfJoining,
                TerminateDate: req.body.TerminateDate
            };

            Employee.create(newEmployee, function (err, employee) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(employee);
                    console.log("new employee Saved");
                }
            });
            console.log(req.body);
        }
    });
});
router.put("/api/employee/:id", verifyHR, (req, res) => {
    Joi.validate(req.body, EmployeeValidationUpdate, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newEmployee;
            newEmployee = {
                Email: req.body.Email,
                // Password: req.body.Password,
                Account: req.body.Account,
                role: req.body.RoleID,
                Gender: req.body.Gender,
                FirstName: req.body.FirstName,
                MiddleName: req.body.MiddleName,
                LastName: req.body.LastName,
                DOB: req.body.DOB,
                ContactNo: req.body.ContactNo,
                EmployeeCode: req.body.EmployeeCode,
                department: req.body.DepartmentID,
                position: req.body.PositionID,
                DateOfJoining: req.body.DateOfJoining,
                TerminateDate: req.body.TerminateDate
            };

            Employee.findByIdAndUpdate(req.params.id, newEmployee, function (err, employee) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newEmployee);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});
router.delete("/api/employee/:id", verifyHR, (req, res) => {
    // Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
    //   if (!err) {
    //     console.log(" state deleted");
    //     res.send(employee);
    //   } else {
    //     console.log(err);
    //     res.send("error");
    //   }
    // });
    res.send("error");
    console.log("delete");
    console.log(req.params.id);
});

router.get("/api/personal-info/:id", verifyHREmployee, (req, res) => {
    console.log("personal-info", req.params.id);
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "role position department"
            //   // populate: {
            //   //   path: "state",
            //   //   model: "State",
            //   //   populate: {
            //   //     path: "country",
            //   //     model: "Country"
            //   //   }
            //   // }
        })
        .select("-salary -education -familyInfo -workExperience")
        .exec(function (err, employee) {
            // employee = employees;
            res.send(employee);
        });
});
router.put("/api/personal-info/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, EmployeePersonalInfoValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newEmployee;

            newEmployee = {
                BloodGroup: req.body.BloodGroup,
                ContactNo: req.body.ContactNo,
                DOB: req.body.DOB,
                Email: req.body.Email,
                EmergencyContactNo: req.body.EmergencyContactNo,
                Gender: req.body.Gender,
                Hobbies: req.body.Hobbies,
                PANcardNo: req.body.PANcardNo,
                PermanetAddress: req.body.PermanetAddress,
                PresentAddress: req.body.PresentAddress
            };
            Employee.findByIdAndUpdate(
                req.params.id,
                {
                    $set: newEmployee
                },
                function (err, numberAffected) {
                    console.log(numberAffected);
                    res.send(newEmployee);
                }
            );
        }

        console.log("put");
        console.log(req.body);
    });
});

module.exports = router;