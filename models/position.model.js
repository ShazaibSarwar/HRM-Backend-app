const mongoose = require('mongoose')

const positionSchema = new mongoose.Schema({
    PositionName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});

var entitySchema = mongoose.Schema({
    PositionID: { type: String }
});

entitySchema.pre('save', function (next) {
    var doc = this;
    counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error) return next(error);
        doc.PositionID = counter.seq;
        next();
    });
});

const Position = mongoose.model("Position", positionSchema);
module.exports = Position