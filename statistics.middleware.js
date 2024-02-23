const makeStats = require("./statistics");

module.exports = interceptStatistics = (req, res, next) => {
    const startMemory = process.memoryUsage().heapUsed;
    const start = performance.now();
    res.on('finish', () => {
        const end = performance.now();
        const endMemory = process.memoryUsage().heapUsed;
        const duration = (end - start);
        const method = req.method.toUpperCase();
        const memoryUsage = (endMemory - startMemory) * 10;
        makeStats(duration, req.path, method, memoryUsage);
    });
    next();
};
