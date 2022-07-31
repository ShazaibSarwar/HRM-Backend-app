const router = require('express').Router();
const Joi = require('joi')
const Portal = require('../../models/portal.model')
const PortalValidation = require('../../controllers/Portal/portal.validator')
const verifyAdmin = require('../../middlewares/verifyAdmin.middleware')

router.get("/api/admin/portal", verifyAdmin, (req, res) => {
    Portal.find()
        .populate({ path: "projects" })
        .exec(function (err, portalData) {
            if (err) {
                res.send("err");
                console.log(err);
            }
            res.send(portalData);
        });
});
router.post("/api/admin/portal", verifyAdmin, (req, res) => {
    Joi.validate(req.body, PortalValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
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
        }
    });
});
router.put("/api/admin/portal/:id", verifyAdmin, (req, res) => {
    Joi.validate(req.body, PortalValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
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
        }

        console.log("put");
        console.log(req.body);
    });
});
router.delete("/api/admin/portal/:id", verifyAdmin, (req, res) => {
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
});



module.exports = router;