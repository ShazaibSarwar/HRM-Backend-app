const mongoose = require('mongoose')

const portalSchema = new mongoose.Schema({
    CreatedBy: { type: String },
    CreatedDate: { type: Date, default: Date.now },
    Deleted: { type: Boolean },
    ModifiedBy: { type: String },
    ModifiedDate: { type: Date },
    PortalName: { type: String, required: true },
    Status: { type: Number, required: true }
});
var entitySchema = mongoose.Schema({
    ID: { type: String }
});

entitySchema.pre('save', function (next) {
    var doc = this;
    counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error) return next(error);
        doc.ID = counter.seq;
        next();
    });
});
const Portal = mongoose.model("Portal", portalSchema);
module.exports = Portal