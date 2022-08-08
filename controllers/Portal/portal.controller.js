const Portal = require('../../models/portal.model')

// Get All Portals
exports.getPortals = (req, res) => {
    Portal.find()
        .populate({ path: "projects" })
        .exec(function (err, portalData) {
            if (err) {
                res.send("err");
                console.log(err);
            }
            res.send(portalData);
        });
};

// Add A New Portal
exports.addPortal = (req, res) => {

    let newPortal;
    newPortal = {
        PortalName: req.body.PortalName,
        Status: req.body.Status
    };

    Portal.create(newPortal, function (err, portalData) {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send(portalData);
            console.log("new Portal Saved");
        }
    });
    
};

// Update Portal  By ID
exports.updatePortal = (req, res) => {

    let updatePortal;
    updatePortal = {
        PortalName: req.body.PortalName,
        Status: req.body.Status
    };
    Portal.findByIdAndUpdate(req.body._id, updatePortal, function (err,Portal) {
        if (err) {
            res.send("error");
        } else {
            res.send(updatePortal);
        }
    });
};

// Delete a Portal By ID
exports.deletePortal = (req, res) => {
    Portal.findByIdAndRemove({ _id: req.params.id }, function (err, portal) {
        if (!err) {
            res.send(portal);
            Project.deleteMany({ portals: { _id: portal._id } }, function (err) {
                if (err) {
                    res.send("error");
                    console.log(err);
                }
            });
        } else {
            console.log("error");
            res.send("err");
        }
    });
};


