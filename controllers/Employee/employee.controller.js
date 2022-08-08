const Employee = require('../../models/employee.model')

// GET all Employees From Database
exports.getEmployees = (req, res) => {

    Employee.find()
        .populate({path: "role position department"})
        .select("-salary -education -familyInfo -workExperience -Password")
        .exec(function (err, employee) {
            res.send(employee);
        });
};

// Add a new Employee in Database
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
    

};

// Update Employee by ID
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
};

// Delete Employee by id
exports.deleteEmployee = (req, res) => {
    Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
      if (!err) res.send(employee);
      res.send("error");
    });
    // res.send("error");
};

// Personal Info of a particular Employee
exports.getPersonalInfo = (req, res) => {
    
    Employee.findById(req.params.id)
        .populate({path: "role position department"})
        .select("-salary -education -familyInfo -workExperience")
        .exec(function (err, employee) {
            res.send(employee);
        });
};

// Update Personal Info By Employee ID
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
    Employee.findByIdAndUpdate(req.params.id,{$set: newEmployee }, function (err, numberAffected) {
            console.log("Number of Rows Affected",numberAffected);
            res.send(newEmployee);
        }
    );
};


