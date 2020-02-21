const { table } = require("table");

/*
    Name : printTimeTable
    Description : This function is used to print time table
    Parameters : timeTable
    Return : none
*/
const printTimeTable = (timeTable) => {
    for(let [subjectName, subjectTimeTable] of Object.entries(timeTable)) {
        console.log(`\n                  Time Table for ${subjectName} Teacher          \n`);
        console.log(table(subjectTimeTable))
        console.log('--------------------------------------------------------------');
    }
}

const formatTimeTableAndPrint = (timeTable) => {
    const newTimeTable = [];
    console.log(timeTable);
    // printTimeTable(newTimeTable);
}

module.exports = {
    printTimeTable,
    formatTimeTableAndPrint
};