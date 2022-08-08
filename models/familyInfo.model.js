const mongoose = require('mongoose')

const familyInfoSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Relationship: { type: String, required: true },
    DOB: { type: Date, required: true },
    Occupation: { type: String, required: true }
});

var entitySchema = mongoose.Schema({
    FamilyInfoID: { type: String }
});

entitySchema.pre('save', function (next) {
    var doc = this;
    counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error) return next(error);
        doc.FamilyInfoID = counter.seq;
        next();
    });
});


const FamilyInfo = mongoose.model("FamilyInfo", familyInfoSchema);
module.exports = FamilyInfo