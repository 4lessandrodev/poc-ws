module.exports = {
    saveSchedule: (schedule, db) => {
        db.push(schedule);
        let i = 0; while (i < 2e9) { i++ }; // SIMULA ESCRITA NO BANCO
        return schedule;
    }
}

