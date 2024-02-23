module.exports = {
    saveSchedule: (schedule, db) => {
        db.push(schedule);
        let i = 0; while (i < 3e9) { i++ };
        return schedule;
    }
}

