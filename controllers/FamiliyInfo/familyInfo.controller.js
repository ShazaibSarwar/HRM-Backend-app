const Employee = require('../../models/employee.model')
const FamilyInfo = require('../../models/familyInfo.model')

// Get Emergency Contacts from Employee's Details
exports.getInfo = (req, res) => {
    Employee.findById(req.params.id)
        .populate({ path: "familyInfo" })
        .select("FirstName LastName MiddleName")
        .exec(function (err, employee) {
            res.send(employee);
        });
};

// Add Emergency Contact Info and also pushing it Employees details 
exports.addInfo = (req, res) => {

    Employee.findById(req.params.id, function (err, employee) {
        if (err) {
            console.log(err);
            res.send("err");
        } else {
            let newFamilyInfo;

            newFamilyInfo = {
                Name: req.body.Name,
                Relationship: req.body.Relationship,
                DOB: req.body.DOB,
                Occupation: req.body.Occupation
            };

            FamilyInfo.create(newFamilyInfo, function (err, familyInfo) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    employee.familyInfo.push(familyInfo);
                    employee.save(function (err, data) {
                        if (err) {
                            console.log(err);
                            res.send("err");
                        } else {
                            console.log(data);
                            res.send(familyInfo);
                        }
                    });
                    console.log("new familyInfo Saved");
                }
            });

        }
    });

};

// Update Emergency Contact Details with ID
exports.updateInfo = (req, res) => {

    let newFamilyInfo;

    newFamilyInfo = {
        Name: req.body.Name,
        Relationship: req.body.Relationship,
        DOB: req.body.DOB,
        Occupation: req.body.Occupation
    };

    FamilyInfo.findByIdAndUpdate(req.params.id, newFamilyInfo, function (
        err,
        familyInfo
    ) {
        if (err) res.send("error");
        res.send(newFamilyInfo); // Else send Updated info 
    });

};

// Delete emergency contact info and deleting and updating emergency contact info from Employee's details as well
exports.deleteInfo = (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            FamilyInfo.findByIdAndRemove({ _id: req.params.id2 }, function (err, familyInfo) {
                if (!err) {
                    console.log("FamilyInfo deleted");
                    Employee.findByIdAndUpdate({ _id: req.params.id }, { $pull: { familyInfo: req.params.id2 } }, function (err, numberAffected) {
                        console.log(numberAffected);
                        res.send(familyInfo);
                    });
                } else {
                    console.log(err);
                    res.send("error");
                }
            });
        }
    });
};


