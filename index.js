const Ws = require('ws');
const Server = require('express');
const cors = require('cors');
var clients = [];
const path = require('path');

const server = Server();
const wss = new Ws.WebSocketServer({ port: 8080 });
const schedules = [];

server.use(Server.json());
server.use(cors({ origin: '*' }));

const makeSchedule = (data) => ({
    id: schedules.length + 1,
    date: data.date ?? new Date().toISOString(),
    description: data.description ?? 'testing ' + Math.trunc(Math.random() * 100),
    patient: data.patient ?? 'anonymous ' + Math.trunc(Math.random() * 100),
});

server.set('engine', 'html');
server.set('static', 'public');
server.set('view engine', 'html');
server.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/health-check', (req, res) => res.send('Ok'));

server.post('/appointments', (req, res) => {
    const schedule = makeSchedule(req.body);
    schedules.push(schedule);
    let i = 0; while (i < 1e9) { i++ };
    return res.status(200).end();
});

server.post('/ws/appointments', (req, res) => {
    const doctorId = req.headers['socket-id'] ?? '';
    const clientOrNull = clients.filter((cl) => cl.doctorId === doctorId);
    const schedule = makeSchedule(req.body);
    schedules.push(schedule);
    if (clientOrNull.length) {
        const msg = JSON.stringify(schedule);
        clientOrNull.map(async (cl) => await cl.ws.send(msg));
    }
    return res.status(200).end();
});

server.get('/appointments', (req, res) => {
    let i = 0; while (i < 1e9) { i++ };
    return res.status(200).json({ schedules });
});

server.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).send('Deu ruim :(');
});

wss.on('connection', (ws, req) => {
    const url = req.url ?? '';
    const doctorId = url.slice(url.indexOf("doctor=")) ?? '';
    const id = req.headers['sec-websocket-key'] ?? '';
    console.log(`Client connected: ${doctorId}:${id}`);

    ws.on('error', (error) => {
        console.error(`WebSocket error occurred for connection ${doctorId}: ${error.message}`);
    });

    ws.on('close', () => {
        console.log(`Connection closed: ${doctorId}:${id}`);
        clients = clients.filter((cl) => cl.id !== id);
    });

    clients.push({ id, doctorId, ws });

    setTimeout(() => {
        ws.send(JSON.stringify({ doctorId }));
    }, 1000);
});

server.listen(4000, () => {
    console.log('websocket running on http://localhost:8080');
    console.log('server running on http://localhost:4000');
});
