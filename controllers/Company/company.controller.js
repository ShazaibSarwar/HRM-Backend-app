const Company = require('../../models/company.model')

// Get All Companies
exports.getCompany = (req, res) => {
    Company.find()
        .exec(function (err, compnay) {
            res.send(compnay);
        });
};

// Create a new Company
exports.createCompany = (req, res) => {

    let newCompany = {
        CompanyName: req.body.CompanyName,
        Address: req.body.Address,
        city: req.body.CityID,
        PostalCode: req.body.PostalCode,
        Website: req.body.Website,
        Email: req.body.Email,
        ContactPerson: req.body.ContactPerson,
        ContactNo: req.body.ContactNo,
    };

    Company.create(newCompany, function (err, company) {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send(newCompany);
            console.log("new company Saved with data");
        }
    });

};

// Update company by ID 
exports.updateCompany = (req, res) => {

    let newCompany = {
        CompanyName: req.body.CompanyName,
        Address: req.body.Address,
        city: req.body.CityID,
        PostalCode: req.body.PostalCode,
        Website: req.body.Website,
        Email: req.body.Email,
        ContactPerson: req.body.ContactPerson,
        ContactNo: req.body.ContactNo,
        FaxNo: req.body.FaxNo,
        PanNo: req.body.PanNo,
        GSTNo: req.body.GSTNo,
        CINNo: req.body.CINNo
    };

    Company.findByIdAndUpdate(req.params.id, newCompany, function (err, company) {
        if (err) return res.send("error");
        res.send(newCompany);
    });
    console.log("put");

};

