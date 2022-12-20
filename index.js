// Your code here
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(arrayOfRecords) {
    return arrayOfRecords.map(createEmployeeRecord)
  }
  
  function createTimeInEvent(date) {
    this.timeInEvents.push({
      type: "TimeIn",
      hour: Number(date.slice(-4)),
      date: date.slice(0, date.length - 5)
    })
    return this
  }
  
  function createTimeOutEvent(date) {
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: Number(date.slice(-4)),
      date: date.slice(0, date.length - 5)
    })
    return this
  }
  
  function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(key => key.date === date)
    let timeOutEvent = this.timeOutEvents.find(key => key.date === date)
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(key => key.firstName === firstName)
  }
  
  function calculatePayroll(arrayOfRecords) {
    let totalWages = []
    let obj = {}
    for (obj of arrayOfRecords)
      totalWages.push(allWagesFor.call(obj))
    return totalWages.reduce((accumulator, currentValue) => accumulator + currentValue)
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

