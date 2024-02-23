module.exports = makeSchedule = (data, schedules) => ({
    id: schedules.length + 1,
    date: data.date ?? new Date().toISOString(),
    description: data.description ?? 'testing ' + Math.trunc(Math.random() * 100),
    patient: data.patient ?? 'anonymous ' + Math.trunc(Math.random() * 100),
});

