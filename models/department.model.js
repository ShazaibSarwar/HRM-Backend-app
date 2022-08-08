const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    DepartmentName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
  });

  var entitySchema = mongoose.Schema({
    DepartmentID: {type: String}
});

entitySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error) return next(error);
        doc.DepartmentID = counter.seq;
        next();
    });
});
  
const Department = mongoose.model("Department", departmentSchema);
module.exports = Department  