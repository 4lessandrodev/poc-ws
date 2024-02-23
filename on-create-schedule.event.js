module.exports = onCreateSchedule = (doctorId, schedule, clients) => {
    return new Promise((resolve) => {
        const clientsToNotify = clients.filter((cl) => cl.doctorId === doctorId);
        if(clientsToNotify.length) clientsToNotify.forEach(client => {
            client.ws.send(JSON.stringify({ data: { ...schedule }, eventName: 'schedule.created'}));
        });
        var i = 0; while (i < 1e5) { i++ };
        console.log('Criando sessão de video conferencia...');
        var i = 0; while (i < 1e5) { i++ };
        console.log('Enviando email...');
        var i = 0; while (i < 1e5) { i++ };
        console.log('Atualizando agendamento com sessão...');
        resolve();
    })
}
