const Employee = require('../../models/employee.model')


exports.getEmployees = (req, res) => {

    console.log('In GET EMP ..............................................')
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
};
exports.addEmployee = (req, res) => {

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

};
exports.updateEmployee = (req, res) => {

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


    console.log("put");
    console.log(req.body);

};
exports.deleteEmployee = (req, res) => {
    Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
      if (!err) {
        console.log(" state deleted");
        res.send(employee);
      } else {
        console.log(err);
        res.send("error");
      }
    });
    res.send("error");
    console.log("delete");
    console.log(req.params.id);
};

exports.getPersonalInfo = (req, res) => {
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
};
exports.updatePersonalInfo = (req, res) => {

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


    console.log("put");
    console.log(req.body);

};


