const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    // RoleID: {type:Number,required:true, default: 0 },
    RoleName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
  });
  // roleSchema.plugin(autoIncrement.plugin, {
  //   model: "Role",
  //   field: "RoleID"
  // });
  var entitySchema = mongoose.Schema({
    RoleID: {type: String}
});

entitySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error) return next(error);
        doc.RoleID = counter.seq;
        next();
    });
});
const Role = mongoose.model("Role", roleSchema);
module.exports = Role
  