const { appendFileSync } = require('fs');

module.exports = onCreateSchedule = (doctorId, schedule, clients) => {
    return new Promise((resolve) => {
        const clientsToNotify = clients.filter((cl) => cl.doctorId === doctorId);
        if(clientsToNotify.length) clientsToNotify.forEach(client => {
            client.ws.send(JSON.stringify({ payload: { ...schedule }, eventName: 'schedule.created'}));
        });

        var startMemory = process.memoryUsage().heapUsed;
        const date = new Date().toISOString();

        var endMemory = startMemory - process.memoryUsage().heapUsed;
        var memoryUsed = `${(endMemory / (1024 * 1024)).toFixed(2)}mb`
        var task1 = 'Criando sessão de video conferencia...';
        appendFileSync('stats', JSON.stringify({ date, task: task1, memoryUsed }) + ',\n', 'utf8');
        var i = 0; while (i < 1e5) { i++ };

        var memoryUsed = `${(endMemory / (1024 * 1024)).toFixed(2)}mb`
        var task2 = 'Enviando email...';
        appendFileSync('stats', JSON.stringify({ date, task: task2, memoryUsed }) + ',\n', 'utf8');
        var i = 0; while (i < 1e5) { i++ };

        var task3 = 'Atualizando agendamento com sessão...';
        var memoryUsed = `${(endMemory / (1024 * 1024)).toFixed(2)}mb`
        appendFileSync('stats', JSON.stringify({ date, task: task3, memoryUsed }) + ',\n', 'utf8');
        var i = 0; while (i < 1e5) { i++ };
        resolve();
    })
}
