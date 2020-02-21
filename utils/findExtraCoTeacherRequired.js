/*
    Name : findExtraCoTeacherRequired
    Description : This function is used to find extra co teacher required
    Parameters : timeTable
    Return : extra co teacher required
*/
const findExtraCoTeacherRequired = (timeTable) => {
    let extraHiredTeacher = 0;
    const currentTimeTable = [];
    let noOfAvailableSubject = 0;
    for (let [key, value] of Object.entries(timeTable)) {
        currentTimeTable.push(value);
        noOfAvailableSubject++;
    }
    // This loop will iterate over the rows of the time table for slot like 8.00 AM [j]
    for(let j = 1; j < currentTimeTable[0].length; j++) {
        // This loop will iterate over the rows of the time table for specific slot for days like 8.00 AM [j] for monday, tuesday [k]...
        for(let k = 1; k < currentTimeTable[0][j].length; k++) {
            let nonIdleTeacher = 0;
            let idleTeacher = 0;
            // This loop will get all teachers availability for the specific slot and specific day like maths [l] teacher availability for 8.00 AM[j] on monday[k] , hindi teacher availability for 8.00 AM on monday 
            for(let l = 0; l < noOfAvailableSubject; l++) {
                if(currentTimeTable[l][j][k].length === 0 || currentTimeTable[l][j][k] === '\r') {
                    idleTeacher++;
                } else {
                    nonIdleTeacher++;
                }
            }
            // This will check whether we need to hire extra co teacher based on free teacher, busy teacher and extra teacher hired
            if((idleTeacher + extraHiredTeacher) - nonIdleTeacher < 0) {
                extraHiredTeacher += Math.abs((idleTeacher + extraHiredTeacher) - nonIdleTeacher);
            }
            // This will break the loop if hired teacher is equal to the number of subject 
            if(extraHiredTeacher >= noOfAvailableSubject) {
                break;
            }
        }
        if(extraHiredTeacher >= noOfAvailableSubject) {
            break;
        }
    }
    return extraHiredTeacher;
}

module.exports = findExtraCoTeacherRequired;