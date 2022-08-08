const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    RoleName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});

var entitySchema = mongoose.Schema({
    RoleID: { type: String }
});

entitySchema.pre('save', function (next) {
    var doc = this;
    counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error) return next(error);
        doc.RoleID = counter.seq;
        next();
    });
});
const Role = mongoose.model("Role", roleSchema);
module.exports = Role
