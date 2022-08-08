const Position = require('../../models/position.model')
const Employee = require('../../models/employee.model')

// GET all Positions 
exports.getPositions = (req, res) => {
    Position.find()
        .populate("company")
        .exec(function (err, role) {
            res.send(role);
        });
};

// Add New Position
exports.addPosition = (req, res) => {

    let newPosition;
    newPosition = {
        PositionName: req.body.PositionName,
        company: req.body.CompanyID
    };

    Position.create(newPosition, function (err, position) {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send(position);
            console.log("new Role Saved");
        }
    });
};

// Update Position
exports.updatePosition = (req, res) => {

    let updatePosition;

    updatePosition = {
        PositionName: req.body.PositionName,
        company: req.body.CompanyID
    };

    Position.findByIdAndUpdate(req.params.id, updatePosition, function (err, position) {
        if (err) {
            res.send("error");
        } else {
            res.send(updatePosition);
        }
    });
};

// Delete Position
exports.deletePosition = (req, res) => {
    Employee.find({ position: req.params.id }, function (err, p) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if (p.length == 0) {
                Position.findByIdAndRemove({ _id: req.params.id }, function (
                    err,
                    position
                ) {
                    if (!err) {
                        res.send(position);

                        console.log("new Position Saved");
                    } else {
                        res.send("err");
                    }
                });

            } else {
                res.status(403).send("This Position is associated with Employee so you can not delete this");
            }
        }
    });
};

