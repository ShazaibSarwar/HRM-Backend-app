const Employee = require('../../models/employee.model')
const LeaveApplication = require('../../models/leave.model')

//  GET all Leave associatated with particular employees
exports.getLeaves = (req, res) => {
    Employee.findById(req.params.id)
        .populate({ path: "leaveApplication" })
        .select("FirstName LastName MiddleName")
        .exec(function (err, employee) {
            if (err) res.send("error");
            res.send(employee);
        });
};

// Creating a new leave and adding it to employee details
exports.makeLeave = (req, res) => {

    Employee.findById(req.params.id, function (err, employee) {
        if (err) {
            console.log(err);
            res.send("err");
        } else {
            let newLeaveApplication;
            newLeaveApplication = {
                Leavetype: req.body.Leavetype,
                FromDate: req.body.FromDate,
                ToDate: req.body.ToDate,
                Reasonforleave: req.body.Reasonforleave,
                Status: req.body.Status,
                employee: req.params.id
            };

            LeaveApplication.create(newLeaveApplication, function (err, leaveApplication) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    employee.leaveApplication.push(leaveApplication);
                    employee.save(function (err, data) {
                        if (err) {
                            console.log(err);
                            res.send("err");
                        } else {
                            console.log(data);
                            res.send(leaveApplication);
                        }
                    });
                }
            });

        }
    });
};

// Updating leave by ID
exports.updateLeave = (req, res) => {
    let newLeaveApplication = {
        Leavetype: req.body.Leavetype,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate,
        Reasonforleave: req.body.Reasonforleave,
        Status: req.body.Status,
        employee: req.params.id
    };

    LeaveApplication.findByIdAndUpdate(req.params.id, newLeaveApplication, function (err, leaveApplication) {
        if (err) {
            res.send("error");
        } else {
            res.send(leaveApplication);
        }
    }
    );
};

// Delete leave 
exports.deleteLeave = (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, function (
                err,
                leaveApplication
            ) {
                if (!err) {
                    Employee.findByIdAndUpdate({ _id: req.params.id }, { $pull: { leaveApplication: req.params.id2 } }, function (err, numberAffected) {
                        console.log(numberAffected);
                        res.send(leaveApplication);
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

exports.getLeavesHR = (req, res) => {
    LeaveApplication.find()
        .populate({
            path: "employee"
        })
        .exec(function (err, leaveApplication) {
            if (err) res.send("error");
            res.send(leaveApplication);

        });
};

// Approve Leave By HR
exports.updateLeaveHR = (req, res) => {
    let newLeaveApplication = {
        Status: req.body.Status
    };
    LeaveApplication.findByIdAndUpdate(req.params.id, { $set: newLeaveApplication }, function (err, numberAffected) {
        res.send(newLeaveApplication);
    });
};

// Leave form HR dashboard
exports.deleteLeaveHR = (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, function (err, leaveApplication) {
                if (!err) {
                    Employee.findByIdAndUpdate({ _id: req.params.id }, { $pull: { leaveApplication: req.params.id2 } }, function (err, numberAffected) {
                        res.send(leaveApplication);
                    });
                } else {
                    console.log(err);
                    res.send("error");
                }
            });
        }
    });
};


