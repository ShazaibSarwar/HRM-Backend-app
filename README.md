-------------

# HRM (Human Resource Management system)
Human Resource Management system is a web application that enables users to create, store and manage Employee Records



This is Back-end Repo.
You can find its front-end Repo Here 👉 : https://github.com/MuhammadNadeem/HRM-Frontend



This web application contains three account access:
```
- Admin
- HR
- Employee
```
All three accounts contain different privileges and authentication.


Technology used :
```
- REACT JS
- NODE JS 
- EXPRESS
- MONGO DB
```



The different part or module of this project is as follows:
```
- Login Page
- Admin Dashboard
- HR Dashboard
- Employee Dashboard
- Authentication and authorization(user verification)
- Database(MongoDB)
```
-------------


## Directory Hierarchy
```
|—— .gitignore
|—— abcREADME.md
|—— app-server.js
|—— app.js
|—— config
|    |—— .env
|—— controllers
|    |—— Company
|        |—— company.controller.js
|    |—— Department
|        |—— department.controller.js
|    |—— Education
|        |—— education.controller.js
|    |—— Employee
|        |—— employee.controller.js
|    |—— FamiliyInfo
|        |—— familyInfo.controller.js
|    |—— Leave
|        |—— leave.controller.js
|    |—— Login
|        |—— login.controller.js
|    |—— Portal
|        |—— portal.controller.js
|    |—— Position
|        |—— position.controller.js
|    |—— Project
|        |—— project.controller.js
|    |—— Role
|        |—— role.controller.js
|    |—— Salary
|        |—— salary.controller.js
|    |—— WorkExperience
|        |—— workExperience.controller.js
|—— middlewares
|    |—— verifyAdmin.middleware.js
|    |—— verifyAdminHR.middleware.js
|    |—— verifyEmployee.middleware.js
|    |—— verifyHr.middleware.js
|    |—— verifyHrEmployee.middleware.js
|—— models
|    |—— company.model.js
|    |—— department.model.js
|    |—— education.model.js
|    |—— employee.model.js
|    |—— familyInfo.model.js
|    |—— leave.model.js
|    |—— portal.model.js
|    |—— position.model.js
|    |—— project.model.js
|    |—— role.model.js
|    |—— salary.model.js
|    |—— workExperience.model.js
|—— ngrok.exe
|—— package-lock.json
|—— package.json
|—— routes
|    |—— company.route.js
|    |—— department.route.js
|    |—— education.route.js
|    |—— employee.route.js
|    |—— familyinfo.route.js
|    |—— leave.route.js
|    |—— loginRoute.js
|    |—— portal.route.js
|    |—— position.route.js
|    |—— project.route.js
|    |—— role.route.js
|    |—— salary.route.js
|    |—— workExperience.route.js
```
