
const Portal = require('../../models/portal.model')
// const verifyAdmin = require('../../middlewares/verifyAdmin.middleware')

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
    console.log(req.body);

};
exports.updatePortal = (req, res) => {

    let updatePortal;
    updatePortal = {
        PortalName: req.body.PortalName,
        Status: req.body.Status
    };
    Portal.findByIdAndUpdate(req.body._id, updatePortal, function (
        err,
        Portal
    ) {
        if (err) {
            res.send("error");
        } else {
            res.send(updatePortal);
        }
    });


    console.log("put");
    console.log(req.body);

};
exports.deletePortal = (req, res) => {
    Portal.findByIdAndRemove({ _id: req.params.id }, function (err, portal) {
        if (!err) {
            console.log("portal deleted");
            res.send(portal);
            Project.deleteMany({ portals: { _id: portal._id } }, function (err) {
                if (err) {
                    res.send("error");
                    console.log(err);
                }
            });
            console.log("new Portal Saved");
        } else {
            console.log("error");
            res.send("err");
        }
    });
    console.log("delete");
    console.log(req.params.id);
};


