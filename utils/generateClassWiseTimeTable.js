/*
    Name : generateClassWiseTimeTable
    Description : This function is used to generate classwise timetable
    Parameters : timeTable
    Return : classwise timetable
*/
const generateClassWiseTimeTable = (timeTable, cls) => {
    const classTimeTable = {};
    const availableSubject = [];
    // This loop will find the avialable subjects
    for ( let subject in timeTable ) {
        availableSubject.push(subject);
    }
    // This loop will iterate over the available subject like Hindi, Maths [i]
    for(let i = 0; i < availableSubject.length; i++) {
        // This will iterate over the available available days like monday , tuesday [day] for particular subject [i]
        for ( let day in timeTable[availableSubject[i]]) {
            if(!classTimeTable.hasOwnProperty(day))
                classTimeTable[day] = {};
            // This loop will check whether the slot in particular day for particular subject is there
            for(let [key, value] of Object.entries(timeTable[availableSubject[i]][day])) {
                if(value.includes(cls)) {
                    classTimeTable[day][key] = availableSubject[i]
                } 
            }
        }
    }
    return classTimeTable;
}

module.exports = generateClassWiseTimeTable;