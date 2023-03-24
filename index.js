//creates a single employee record
function createEmployeeRecord(arr){
    const newEmployee= {}
    newEmployee.firstName = arr[0]
    newEmployee.familyName = arr[1]
    newEmployee.title = arr[2]
    newEmployee.payPerHour = arr[3]
    newEmployee.timeInEvents = []
    newEmployee.timeOutEvents = []
    return newEmployee
}
//creates an array of employee records
function createEmployeeRecords(arr){
    const employees =[]
     arr.forEach(employee => employees.push(createEmployeeRecord(employee)));
    return employees
}
//    Adds a timeInEvent to a record
function createTimeInEvent(timeStamp){
    const timeArr = timeStamp.split(" ")
    const timeEvent = {}
    timeEvent.date = timeArr[0]
    timeEvent.hour = parseInt(timeArr[1])
    timeEvent.type = "TimeIn"
    this.timeInEvents.push(timeEvent)
    return this
}
//    Adds a timeOutEvent to a record
function createTimeOutEvent(timeStamp){
    const timeArr = timeStamp.split(" ")
    const timeEvent = {}
    timeEvent.date = timeArr[0]
    timeEvent.hour = parseInt(timeArr[1])
    timeEvent.type = "TimeOut"
    this.timeOutEvents.push(timeEvent)
    return this
}
//Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(dateStr){
    const timeOut = this.timeOutEvents.find(singleEvent => singleEvent.date === dateStr).hour
    const timeIn = this.timeInEvents.find(singleEvent => singleEvent.date === dateStr).hour
    return (timeOut-timeIn)/100
}
function wagesEarnedOnDate(dateStr){
    return hoursWorkedOnDate.call(this, dateStr)*this.payPerHour
}
//Finds an employee record from a collection by first name, then returns that record
function findEmployeeByFirstName(records, name){
   return records.find(record => name===record.firstName)
}
function calculatePayroll(records){
    let sum = 0
     records.forEach(record => sum +=allWagesFor.call(record))
    return sum 
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
