const { appendFileSync } = require('fs');

module.exports = (duration, path, method, memoryUsed) => {
    const memoryUsage = process.memoryUsage();

    const stats = {
        date: new Date().toISOString(),
        request: {
            route: path,
            method: method,
            duration: `${duration.toFixed(2)}ms`
        },
        memoryUsage: {
            heapTotal: `${(memoryUsage.heapTotal / (1024 * 1024)).toFixed(2)}mb`,
            heapUsed: `${(memoryUsage.heapUsed / (1024 * 1024)).toFixed(2)}mb`,
            memoryUsed: `${(memoryUsed / (1024 * 1024)).toFixed(2)}mb`
        }
    };
    appendFileSync('stats', JSON.stringify(stats) + ',\n', 'utf8');
}

