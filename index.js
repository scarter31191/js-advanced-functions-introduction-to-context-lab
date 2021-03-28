function createEmployeeRecord(input) {
    const record = {}

    record.firstName = input[0]
    record.familyName = input[1]
    record.title = input[2]
    record.payPerHour = input[3]
    record.timeInEvents = []
    record.timeOutEvents = []

    return record
};

function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord)
};

function createTimeInEvent(emp, eventTime) {
    return addTimeInOrOut(emp, eventTime, "TimeIn")
};

function createTimeOutEvent(emp, eventTime) {
    return addTimeInOrOut(emp, eventTime, "TimeOut")
  };

  function addTimeInOrOut(emp, eventTime, type) {
      const time = eventTime.split(" ")
      const event = {}

      event.type = type
      event.date = time[0]
      event.hour = parseInt(time[1], 10)

      type === "TimeIn" ? emp.timeInEvents.push(event) : emp.timeOutEvents.push(event)

      return emp
  }

  function hoursWorkedOnDate(emp, date) {
      const timeInRecord = emp.timeInEvents.find(record => record.date === date)
      const timeOutRecord = emp.timeOutEvents.find(record => record.date === date)
      const timeIn = timeInRecord.hour
      const timeOut = timeOutRecord.hour

      return (timeOut - timeIn) / 100
  }

  function wagesEarnedOnDate(emp, date) {
    return hoursWorkedOnDate(emp, date) * emp.payPerHour
  }
  
  function allWagesFor(emp) {
    const dates = emp.timeOutEvents.map(record => record.date)
    const dailyTotals = dates.map(date => wagesEarnedOnDate(emp, date))
    return dailyTotals.reduce(function(memo, total) { return memo + total } )
  }
  
  function calculatePayroll(emps) {
    return emps.map(allWagesFor).reduce(function(memo, total) { return memo + total })
  }
  
  function findEmployeeByFirstName(emps, target) {
    const lostEmp = emps.find(emp => emp.firstName === target)
    return lostEmp
  }
  


