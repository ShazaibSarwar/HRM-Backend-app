const Department = require('../../models/department.model')
const Employee = require('../../models/employee.model')


exports.getDepartment = (req, res) => {
    Department.find()
        .populate("company")
        .exec(function (err, employees) {
            res.send(employees);
        });
};
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
exports.updateDepartment = (req, res) => {
    let updateDepartment;
    updateDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
    };
    Department.findByIdAndUpdate(req.params.id, updateDepartment, function (err,department) {
        if (err) {
            res.send("error");
        } else {
            res.send(updateDepartment);
            console.log('Department Updated...')
        }
    });

};
exports.deleteDepartment = (req, res) => {
    console.log('Delete Department')
    Employee.find({ department: req.params.id }, function (err, d) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if (d.length == 0) {
                Department.findByIdAndRemove({ _id: req.params.id }, function (
                    err,
                    department
                ) {
                    if (!err) {
                        console.log("department deleted");
                        res.send(department);

                        console.log("new Department Saved");
                    } else {
                        console.log("error");
                        res.send("err");
                    }
                });
                console.log("delete");
                console.log("Delete Department with ID", req.params.id);
            } else {
                res
                    .status(403)
                    .send(
                        "This department is associated with Employee so you can not delete this"
                    );
            }
        }
    });
};

