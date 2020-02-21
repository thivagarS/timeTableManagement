/*
    Name : assignCoTeacher
    Description : This function is used to assign co teachers based on availability
    Parameters : none
    Return : none
*/
const assignCoTeacher = (classArray, currentTimeTable, i, j) => {
    const coTeacherAssign = {
        idleTeacher: [],
        nonIdleTeacher: []
    }
    let m = 0
    // This loop will iterate over the list of availabity and classify them
    for(let k = 0; k < classArray.length; k++) {
        if(classArray[k].length === 0 || classArray[k] === '\r') {
            coTeacherAssign.idleTeacher.push(k)
        } else {
            coTeacherAssign.nonIdleTeacher.push(k);
        }
    }
    // This loop is used to assign teachers based on availabity
    for(let n = 0 ; n < coTeacherAssign.nonIdleTeacher.length && n < coTeacherAssign.idleTeacher.length; n++) {
        classArray[coTeacherAssign.idleTeacher[m]] = classArray[coTeacherAssign.nonIdleTeacher[n]];
        m++;
    }
    // This loop will modify the passed time table to co teacher assigned time table
    for(let p = 0; p < classArray.length; p++) {
        currentTimeTable[p][i][j] = classArray[p];
    }
}

/*
    Name : generateCoTeacherTimeTable
    Description : This function is used to generate new time table assigning co teachers
    Parameters : timeTable
    Return : newTimeTable
*/
const generateCoTeacherTimeTable = (timeTable) => {
    const currentTimeTable = [];
    const newTimeTable = {};
    const subject = [];
    let availableSubjectTeacher = 0;
    // This loop is used to create subject array and array of available time tables
    for(let [key, value] of Object.entries(timeTable)) {
        subject.push(key);
        currentTimeTable.push(value);
        availableSubjectTeacher++;
    }
    // This loop will iterate over the rows of the time table for slot like 8.00 AM [i]
    for(let i = 1; i < currentTimeTable[0].length; i++) {
        // This loop will iterate over the rows of the time table for specific slot for days like 8.00 AM [i] for monday, tuesday [j]...
        for(let j = 1; j < currentTimeTable[0][i].length; j++) {
            let classArray = [];
            // This loop will get all teachers availability for the specific slot and specific day like maths [k] teacher availability for 8.00 AM[i] on monday[j] , hindi teacher availability for 8.00 AM on monday 
            for(let k = 0; k <availableSubjectTeacher; k++) {
                classArray.push(currentTimeTable[k][i][j])
            }
            // This function is used to assign the co teacher based on the availability
            assignCoTeacher(classArray, currentTimeTable, i, j);
        }
    }
    // This loop will create time table object
    for(let i = 0; i < subject.length; i++) {
        newTimeTable[subject[i]] = currentTimeTable[i];
    }
    return newTimeTable;
}

module.exports = generateCoTeacherTimeTable;