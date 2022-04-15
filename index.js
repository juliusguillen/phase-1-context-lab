/* Your Code Here */
function createEmployeeRecord (employee) {
const employeeRecord = {
    firstName : employee[0],
    familyName : employee[1],
    title :      employee[2],
    payPerHour : employee[3],
    timeInEvents : [],
    timeOutEvents : [], 
}
return employeeRecord
}

function createEmployeeRecords (employees) {
   //console.log(employees)
    const records = employees.map((employee) => createEmployeeRecord(employee))
    return records
}

function createTimeInEvent (dateStamp) {
    // console.log(dateStamp)
    let hour = dateStamp.split(" ")[1]
    this.timeInEvents.push( {
        type:  "TimeIn",
        hour: parseInt(hour),
        date:  dateStamp.split(" ")[0],  
    })
    return this 
}

function createTimeOutEvent (dateStamp) {
    console.log(dateStamp)
    let hour = dateStamp.split(" ")[1]
    this.timeOutEvents.push( {
        type:  "TimeOut",
        hour: parseInt(hour),
        date:  dateStamp.split(" ")[0],  
    })
    return this 
}

let hoursWorkedOnDate = function (dateStamp) {
    let inTime = this.timeInEvents.find(function (e) {
        return e.date === dateStamp
    })

    let outTime = this.timeOutEvents.find(function (e) {
        return e.date === dateStamp 
    })
    return (outTime.hour - inTime.hour) / 100 
}

function wagesEarnedOnDate (dateStamp) {
let pay = this.payPerHour
return (hoursWorkedOnDate.call(this, dateStamp) * pay)
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
// const array1 = [5, 12, 8, 130, 44];
// const found = array1.find(element => element > 10);


function findEmployeeByFirstName(employees, firstName) {
    let name =  employees.find(record => record.firstName === firstName) 
    return name
}


function calculatePayroll (employeeRecord) {
    const initialValue = 0;
    const sumWithInitial =  employeeRecord.reduce(
      (previousValue, currentValue) => previousValue + allWagesFor.call(currentValue),
      initialValue
    );
    return sumWithInitial
}



