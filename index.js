process.on('uncaughtException', (err) => console.log('uncaughtExceptionError: ' + err))
process.on('unhandledRejection', (err) => console.log('Unhandled Rejection Error:', err));