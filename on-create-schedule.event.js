const { appendFileSync } = require('fs');

module.exports = onCreateSchedule = (doctorId, schedule, clients) => {
    return new Promise((resolve) => {
        const date = new Date().toISOString();
        const clientsToNotify = clients.filter((cl) => cl.doctorId === doctorId);
        if(clientsToNotify.length) clientsToNotify.forEach(client => {
            client.ws.send(JSON.stringify({ payload: { ...schedule }, eventName: 'schedule.created'}));
        });
        var i = 0; while (i < 1e5) { i++ };
        var task1 = 'Criando sessão de video conferencia...';
        appendFileSync('stats', JSON.stringify({ date, task: task1 }) + ',\n', 'utf8');
        var i = 0; while (i < 1e5) { i++ };
        var task2 = 'Enviando email...';
        appendFileSync('stats', JSON.stringify({ date, task: task2 }) + ',\n', 'utf8');
        var i = 0; while (i < 1e5) { i++ };
        var task3 = 'Atualizando agendamento com sessão...';
        appendFileSync('stats', JSON.stringify({ date, task: task3 }) + ',\n', 'utf8');
        resolve();
    })
}
