const fs = require("fs");
const { promisify } = require("util");

const asyncReadFile = promisify(fs.readFile);

/*
    Name : parseCSVToTimeTableArray
    Description : This function is used to convert data into Array structure 
    Parameter : filename
    Return value : returns parsed CSV data in Array structure
*/
const parseCSVToTimeTableArray = (rawData) => {
    return (rawData.split("\r\n")).map(line => {
            return line.split(",");
    })
}

/*
    Name : parseCSVToTimeTableObject
    Description : This function is used to read the CSV file and convert the data into Object 
    Parameter : filename
    Return value : returns parsed CSV data in Object structure
*/
const parseCSVToTimeTableObject = (rawData) => {
    let timeTableArray = (rawData.split("\r\n")).map(line => line.split(","))
    let timeTable = {};
    for(let i = 1; i < timeTableArray[0].length; i++) {
        timeTable[timeTableArray[0][i]] = { };
        let temp = {};
        for(let j = 1; j < timeTableArray.length; j++) { 
            temp[timeTableArray[j][0]] = timeTableArray[j][i] 
        }
        timeTable[timeTableArray[0][i]] = temp;
    }
    return timeTable;
}

/*
    Name : csvToTimeTableParserObject
    Description : This function is used to read the CSV file and convert the data into Object 
    Parameter : filename
    Return value : returns parsed CSV data in Object structure
*/
const csvToTimeTableParserObject = async (fileName) => {
    // This function is used to read file
    const data = await asyncReadFile(fileName);
    // This function is used to convert CSV data into object
    return parseCSVToTimeTableObject(data.toString());
}

/*
    Name : csvToTimeTableArray
    Description : This function is used to read the CSV file and convert the data into Array
    Parameter : filename
    Return value : returns parsed CSV data in Array structure
*/
const csvToTimeTableArray = async(fileName) => {
    // This function is used to read file
    const data = await asyncReadFile(fileName);
    // This function is used to convert CSV data into array
    return parseCSVToTimeTableArray(data.toString());
}

module.exports = {
    csvToTimeTableParserObject,
    csvToTimeTableArray
}