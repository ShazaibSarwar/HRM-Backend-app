const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    SchoolUniversity: { type: String, required: true },
    Degree: { type: String, required: true },
    Grade: { type: String, required: true },
    PassingOfYear: { type: String, required: true }
  });
  

  var entitySchema = mongoose.Schema({
    EducationID: {type: String}
});

entitySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error) return next(error);
        doc.EducationID = counter.seq;
        next();
    });
});
  
const Education = mongoose.model("Education", educationSchema);
module.exports =  Education
