const mongoose = require('mongoose')
// const autoIncrement = require('mongoose-auto-increment');



const  companySchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    Address: { type: String, required: true },
    PostalCode: { type: Number, required: true },
    Website: { type: String, required: true },
    Email: { type: String, required: true },
    ContactPerson: { type: String, required: true },
    ContactNo: { type: String, required: true },
    Deleted: { type: Boolean }
  });

  const Company = mongoose.model("Company", companySchema);
  module.exports = Company

  // companySchema.plugin(autoIncrement.plugin, {
  //   model: "Company",
  //   field: "CompanyID"
  // });

  // autoIncrement.initialize(mongoose.connection); // This is important. You can remove initialization in different file

  // companySchema.plugin(autoIncrement.plugin, {
  //   model: 'Company',
  //   field: 'CompanyID',
  //   startAt: 1,
  //   incrementBy: 1
  // });

var entitySchema = mongoose.Schema({
    CompanyID: {type: String}
});

entitySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error) return next(error);
        doc.CompanyID = counter.seq;
        next();
    });
});