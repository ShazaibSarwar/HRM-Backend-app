const mongoose = require('mongoose')

const leaveApplicationSchema = new mongoose.Schema({
  Leavetype: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true },
  Reasonforleave: { type: String, required: true },
  Status: { type: String, required: true },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
});


var entitySchema = mongoose.Schema({
  LeaveApplicationID: { type: String }
});

entitySchema.pre('save', function (next) {
  var doc = this;
  counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function (error, counter) {
    if (error) return next(error);
    doc.LeaveApplicationID = counter.seq;
    next();
  });
});

var LeaveApplication = mongoose.model("LeaveApplication", leaveApplicationSchema);
module.exports = LeaveApplication