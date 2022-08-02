const Employee = require('../../models/employee.model')
const LeaveApplication = require('../../models/leave.model')



exports.getLeaves = (req, res) => {
    
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "leaveApplication"
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
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(employee);
            }
        });
};
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

            LeaveApplication.create(newLeaveApplication, function (
                err,
                leaveApplication
            ) {
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
                    console.log("new leaveApplication Saved");
                }
            });
            
        }
    });

};
exports.updateLeave = (req, res) => {
console.log('in update leave..............................................')
    let newLeaveApplication;

    newLeaveApplication = {
        Leavetype: req.body.Leavetype,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate,
        Reasonforleave: req.body.Reasonforleave,
        Status: req.body.Status,
        employee: req.params.id
    };

    LeaveApplication.findByIdAndUpdate(
        req.params.id,
        newLeaveApplication,
        function (err, leaveApplication) {
            if (err) {
                res.send("error");
            } else {
                res.send(newLeaveApplication);
            }
        }
    );

};
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
                    console.log("LeaveApplication deleted");
                    Employee.update(
                        { _id: req.params.id },
                        { $pull: { leaveApplication: req.params.id2 } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(leaveApplication);
                        }
                    );
                } else {
                    console.log(err);
                    res.send("error");
                }
            });
            console.log("delete");
            console.log("Delete Leave with ID",req.params.id);
        }
    });
};

exports.getLeavesHR = (req, res) => {
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    LeaveApplication.find()
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "employee"
        })
        // .select(" -role -position -department")
        // .select("FirstName LastName MiddleName"
        // )
        .exec(function (err, leaveApplication) {
            // console.log(filteredCompany);
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(leaveApplication);
            }
        });
};
exports.updateLeaveHR = (req, res) => {

    let newLeaveApplication;

    newLeaveApplication = {
        Status: req.body.Status
    };
    LeaveApplication.findByIdAndUpdate(
        req.params.id,
        {
            $set: newLeaveApplication
        },
        function (err, numberAffected) {
            console.log(numberAffected);
            res.send(newLeaveApplication);
        }
    );

};
exports.deleteLeaveHR = (req, res) => {
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
                    console.log("LeaveApplication deleted");
                    Employee.update(
                        { _id: req.params.id },
                        { $pull: { leaveApplication: req.params.id2 } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(leaveApplication);
                        }
                    );
                } else {
                    console.log(err);
                    res.send("error");
                }
            });
            console.log("delete");
            console.log("Delete Leave with ID",req.params.id);
        }
    });
};


