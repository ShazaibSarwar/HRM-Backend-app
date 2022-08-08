const mongoose = require('mongoose')

const workExperienceSchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    Designation: { type: String, required: true },
    FromDate: { type: Date, required: true },
    ToDate: { type: Date, required: true }
});

var entitySchema = mongoose.Schema({
    WorkExperienceID: { type: String }
});

entitySchema.pre('save', function (next) {
    var doc = this;
    counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error) return next(error);
        doc.WorkExperienceID = counter.seq;
        next();
    });
});

const WorkExperience = mongoose.model("WorkExperience", workExperienceSchema);
module.exports = WorkExperience
