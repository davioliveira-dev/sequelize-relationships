const models = require('./models');
const User = models.User;
const Company = models.Company;
const WorkingDay = models.WorkingDay;

Company.create({
  name: "My super company"
})
.then((newCompany) => {
  console.log(newCompany.get())
})
.catch((err) => {
  console.log("Error while company creation : ", err)
})

User.bulkCreate([
  {email: 'john-doe@domain.com', firstName: 'John',  lastName: 'DOE', companyId: 1},
  {email: 'log_w@domain.com', firstName: 'Logan',  lastName: 'WOLVERINE', companyId: 1},
  {email: 'john-connor@domain.com', firstName: 'John',  lastName: 'CONNER', companyId: 1}
])
.then((newUsers) => {
  console.log(newUsers)
})
.catch((err) => {
  console.log("Error while users creation : ", err)
})

// 1:1
// Get the company linked to a given User
User.findOne({
  where: {email: 'john-connor@domain.com'}, include: 'company'
})
.then((foundUser) => {
  // Get the User with Company datas included
  console.log(foundUser)
  // Get the company record only
  // console.log(foundUser.company)
})
.catch((err) => {
  console.log("Error while find user : ", err)
})

// 1:N
// Get the employees for a given company
Company.findByPk(1, {include: ['employees']})
.then((company) => {
  // Get the Company with Users (employees) datas included
  console.log(company)
  // Get the Users (employees) records only
  // console.log(company.get().employees)
})
.catch((err) => {
  console.log("Error while find company : ", err)
})

let currentDate = new Date();

WorkingDay.bulkCreate([
  {
    weekDay: 'Monday',
    workingDate: currentDate,
    isWorking: true
  },
  {
    weekDay: 'Tuesday',
    workingDate: currentDate,
    isWorking: true
  },
  {
    weekDay: 'Wednesday',
    workingDate: currentDate,
    isWorking: false
  }
])
.then((workingDays) => {
  User.findAll({where: {id: [1, 2, 3]}, include: ['days']})
  .then((users) => {
    // For user 1, 2 and 3 set the sames workingDays
    users.forEach(user => {
      user.setDays(workingDays) // workingDays is an array (one user hasMany workingDays)
      .then((joinedUsersWorkingDays) => {
        console.log(joinedUsersWorkingDays)
      })
      .catch((err) => console.log("Error while joining Users and WorkingDays : ", err))
    });
  })
  .catch((err) => console.log("Error while Users search : ", err))
})
.catch((err) => console.log("Error while WorkingDay creation : ", err))


// // Get workingDays for a given User
User.findByPk(1, {include: ['days']})
.then((user) => {
  console.log(user.get())
})
.catch((err) => console.log("Error while searching user : ", err))

// Get Users for a given WorkingDay
WorkingDay.findByPk(1,  {include: ['employees']})
.then((workingDay) => {
  console.log(workingDay.get())
})
.catch((err) => console.log("Error while searching workingDay : ", err))