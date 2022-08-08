const Department = require('../../models/department.model')
const Employee = require('../../models/employee.model')

// Get Department from Database
exports.getDepartment = (req, res) => {
    Department.find()
        .populate("company")
        .exec(function (err, employees) {
            res.send(employees);
        });
};

// Add a new Department into database
exports.createDepartment = (req, res) => {

    let newDepartment;
    newDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
    };

    Department.create(newDepartment, function (err, department) {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send(department);
            console.log("New Department Saved");
        }
    });
};

// Update Department in Database by ID
exports.updateDepartment = (req, res) => {
    let updateDepartment;
    updateDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
    };
    Department.findByIdAndUpdate(req.params.id, updateDepartment, function (err, department) {
        if (err) {
            res.send("error");
        } else {
            res.send(updateDepartment);
            console.log('Department Updated...')
        }
    });

};

// Delete Department if it is Not Associated with any Employee
exports.deleteDepartment = (req, res) => {

    Employee.find({ department: req.params.id }, function (err, d) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if (d.length == 0) {
                Department.findByIdAndRemove({ _id: req.params.id }, function (err, department) {
                    if (!err) res.send(department);
                    res.send("err");
                });
            } else {
                res.status(403).send("This department is associated with Employee so you can not delete this");
            }
        }
    });
};

