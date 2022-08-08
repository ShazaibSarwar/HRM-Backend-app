// importing Core packeges
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
// requiring all Routes to mount with server
const loginRoute = require('./routes/loginRoute')
const roleRoute = require('./routes/role.route')
const leaveRoute = require('./routes/leave.route')
const portalRoute = require('./routes/portal.route')
const salaryRoute =  require('./routes/salary.route')
const projectRoute = require('./routes/project.route')
const companyRoutes = require('./routes/company.route')
const positionRoute = require('./routes/position.route')
const employeeRoute = require('./routes/employee.route')
const educationRoute = require('./routes/education.route')
const familyInfoRoute = require('./routes/familyinfo.route')
const departmentRoute = require('./routes/department.route')
const workExperienceRoute = require('./routes/workExperience.route')

//  Start express app
const app = express();
// For Cross Origin Resource Sharing
app.use(cors())

//  Body parser, reading data from body into req.body
app.use(bodyParser.json());

//  ROUTES 
app.use('/api/role', roleRoute)
app.use('/api/leave', leaveRoute)
app.use('/api/login', loginRoute);
app.use('/api/salary', salaryRoute)
app.use('/api/company', companyRoutes)
app.use('/api/position', positionRoute)
app.use('/api/employee', employeeRoute)
app.use('/api/admin/portal', portalRoute)
app.use('/api/education', educationRoute)
app.use('/api/department', departmentRoute)
app.use('/api/family-info', familyInfoRoute)
app.use('/api/admin/project', projectRoute)
app.use('/api/experience', workExperienceRoute)


module.exports = app;


// '/api/role/'          // get All Roles
// '/api/role/'         // Post a Role
// '/api/role/:id'      // Post a Role
// '/api/leave/emp'
// '/api/leave/hr'
// '/api/login'
// '/api/salary'
// '/api/company'
// '/api/position'
// '/api/employee'
// '/api/employee/personal-info'
// '/api/admin/portal'
// '/api/education'
// '/api/department'
// '/api/family-info'
// '/api/admin/project'
// '/api/experience'