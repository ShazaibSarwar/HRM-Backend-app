const Employee = require('../../models/employee.model')
const WorkExperience = require('../../models/workExperience.model')

// Get Work Experience of psrticular Employee
exports.getWorkExperience = (req, res) => {

    Employee.findById(req.params.id)
        .populate({path: "workExperience"})
        .select("FirstName LastName MiddleName")
        .exec(function (err, employee) {
            res.send(employee);
        });
};

// Add Work Experience of particular employee 
exports.addWorkExperience = (req, res) => {
    Employee.findById(req.params.id, function (err, employee) {
        if (err) {
            console.log(err);
            res.send("err");
        } else {
            let newWorkExperience = {
                CompanyName: req.body.CompanyName,
                Designation: req.body.Designation,
                FromDate: req.body.FromDate,
                ToDate: req.body.ToDate
            };

            WorkExperience.create(newWorkExperience, function (err, workExperience) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    employee.workExperience.push(workExperience);
                    employee.save(function (err, data) {
                        if (err) {
                            console.log(err);
                            res.send("err");
                        } else {
                            console.log(data);
                            res.send(workExperience);
                        }
                    });
                }
            });
            
        }
    });
};

//  Update Work Experience  
exports.updateWorkExperience = (req, res) => {


    let newWorkExperience = {
        CompanyName: req.body.CompanyName,
        Designation: req.body.Designation,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate
    };

    WorkExperience.findByIdAndUpdate( req.params.id, newWorkExperience, function (err, workExperience) {
            if (err) {
                res.send("error");
            } else {
                res.send(newWorkExperience);
            }
        }
    );

    console.log("put");
    

};
exports.deleteEorkExperience = (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            WorkExperience.findByIdAndRemove({ _id: req.params.id2 }, function (
                err,
                workExperience
            ) {
                if (!err) {
                    console.log("WorkExperience deleted");
                    Employee.findByIdAndUpdate(
                        { _id: req.params.id },
                        { $pull: { workExperience: req.params.id2 } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(workExperience);
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

