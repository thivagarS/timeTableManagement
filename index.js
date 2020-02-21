const program = require("commander");

const { csvToTimeTableParserObject, csvToTimeTableArray } = require("./utils/csvToTimeTableParser");
const generateClassWiseTimeTable = require("./utils/generateClassWiseTimeTable");
const generateCoTeacherTimeTable = require("./utils/generateCoTeacherTimeTable");
const findExtraCoTeacherRequired = require("./utils/findExtraCoTeacherRequired");
const { printTimeTable, formatTimeTableAndPrint } = require('./utils/printTimeTable');

/*
    Name : parseCSVAndGenerateClassTimeTable
    Description : This function is used to parse CSV files and generate class time table
    Parameters : class
    Return : none
*/
const parseCSVAndGenerateClassTimeTable = async (cls) => {
    const timeTableObject = {};
    timeTableObject["english"] = await csvToTimeTableParserObject("./asserts/csv/english.csv");
    timeTableObject["hindi"] = await csvToTimeTableParserObject("./asserts/csv/hindi.csv");
    timeTableObject["kannada"] = await csvToTimeTableParserObject("./asserts/csv/kannada.csv");
    timeTableObject["maths"] = await csvToTimeTableParserObject("./asserts/csv/maths.csv");
    timeTableObject["science"] = await csvToTimeTableParserObject("./asserts/csv/science.csv");
    formatTimeTableAndPrint(generateClassWiseTimeTable(timeTableObject, cls));
}

/*
    Name : parseCSVAndgenerateCoTeacherTimeTable
    Description : This function is used to parse CSV files and generate new time table assigning co teachers
    Parameters : none
    Return : none
*/
const parseCSVAndgenerateCoTeacherTimeTable = async () => {
    const timeTableArray = {};
    timeTableArray["english"] = await csvToTimeTableArray("./asserts/csv/english.csv");
    timeTableArray["hindi"] = await csvToTimeTableArray("./asserts/csv/hindi.csv");
    timeTableArray["kannada"] = await csvToTimeTableArray("./asserts/csv/kannada.csv");
    timeTableArray["maths"] = await csvToTimeTableArray("./asserts/csv/maths.csv");
    timeTableArray["science"] = await csvToTimeTableArray("./asserts/csv/science.csv");
    printTimeTable(generateCoTeacherTimeTable(timeTableArray));
};  

/*
    Name : parseCSVAndFindExtraCoTeacherRequired
    Description : This function is used to parse CSV files and find number of extra co teachers required
    Parameters : none
    Return : returns extra co teachers required
*/
const parseCSVAndFindExtraCoTeacherRequired = async () => {
    const timeTableArray = {};
    // This function is used to parse CSV file to required format
    timeTableArray["english"] = await csvToTimeTableArray("./asserts/csv/english.csv");
    timeTableArray["hindi"] = await csvToTimeTableArray("./asserts/csv/hindi.csv");
    timeTableArray["kannada"] = await csvToTimeTableArray("./asserts/csv/kannada.csv");
    timeTableArray["maths"] = await csvToTimeTableArray("./asserts/csv/maths.csv");
    timeTableArray["science"] = await csvToTimeTableArray("./asserts/csv/science.csv");
    // This function is used to find extra co teachers required
    return Promise.resolve(findExtraCoTeacherRequired(timeTableArray));
};  

program
    .version('1.0.0')
    .description('Time Table Management System')

// This command is used to run Question 1. Read the CSV files and generate class wise timetable (Write a simple csv parser)
program
    .command('ques1 <cls>')
    .alias('1')
    .description('Generate Time Table for class')
    .action(cls => {
        parseCSVAndGenerateClassTimeTable(cls);
    })

// This command is used to run Question 2. Assuming that any teacher can be co-teacher to any other class, generate a new timetable such that no teacher is idle during the duration of school.
program
    .command('ques2')
    .alias('2')
    .description('Generate new time table so no teacher is idle during the duration of school')
    .action(() => {
       parseCSVAndgenerateCoTeacherTimeTable();
    })

// This command is used to run Question 3. Identify when all teachers are busy and a class can not be assigned a co-teacher. Calculate minimum number of extra co-teachers needed to solve it.
program
    .command('ques3')
    .alias('3')
    .description('Find Minimum number of extra co teachers required')
    .action(() => {
        parseCSVAndFindExtraCoTeacherRequired()
        .then((extraCoTeacherRequired) => {
            console.log(`Minimum number of extra co-teachers required is ${extraCoTeacherRequired}`)
        })
    })

program.parse(process.argv);

