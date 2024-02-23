const { appendFileSync } = require('fs');

module.exports = onCreateSchedule = (doctorId, schedule, clients) => {
    var startMemory = process.memoryUsage().heapUsed;
    const date = new Date().toISOString();

    return new Promise((resolve) => {
        const clientsToNotify = clients.filter((cl) => cl.doctorId === doctorId);
        if(clientsToNotify.length) clientsToNotify.forEach(client => {
            client.ws.send(JSON.stringify({ payload: { ...schedule }, eventName: 'schedule.created'}));
        });

        var i = 0; while (i < 1e3) { i++ }; // SIMULA REQUEST
        var task1 = 'Criando sessão de video conferencia...';
        var endMemory = process.memoryUsage().heapUsed - startMemory;
        var memoryUsed = `${((endMemory / 1024) / 1024).toFixed(5)}mb`
        appendFileSync('stats', JSON.stringify({ date, task: task1, memoryUsed }) + ',\n', 'utf8');

        var i = 0; while (i < 1e3) { i++ }; // SIMULA REQUEST
        var task2 = 'Enviando email...';
        var endMemory = process.memoryUsage().heapUsed - startMemory;
        var memoryUsed = `${((endMemory / 1024) / 1024).toFixed(5)}mb`
        appendFileSync('stats', JSON.stringify({ date, task: task2, memoryUsed }) + ',\n', 'utf8');

        var i = 0; while (i < 1e3) { i++ }; // SIMULA ESCRITA NO BANCO
        var task3 = 'Atualizando agendamento com sessão...';
        var endMemory = process.memoryUsage().heapUsed - startMemory;
        var memoryUsed = `${((endMemory / 1024) / 1024).toFixed(5)}mb`
        appendFileSync('stats', JSON.stringify({ date, task: task3, memoryUsed }) + ',\n', 'utf8');
        resolve();
    })
}
