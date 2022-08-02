const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
    BasicSalary: { type: String, required: true },
    BankName: { type: String, required: true },
    AccountNo: { type: String, required: true },
    AccountHolderName: { type: String, required: true },
    TaxDeduction: { type: String, required: true }
  });

  var entitySchema = mongoose.Schema({
    SalaryID: { type: String }
  });
  
  entitySchema.pre('save', function (next) {
    var doc = this;
    counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function (error, counter) {
      if (error) return next(error);
      doc.SalaryID = counter.seq;
      next();
    });
  });
  
  
const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary