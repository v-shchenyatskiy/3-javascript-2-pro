const fs = require('fs');
const logFile = './db/2_log.json';

const logger = ( action, product=null ) => {
    fs.readFile(logFile, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            // парсим текущую корзину
            let log = JSON.parse(data);

            // обновляем лог
            if (!product) {
                log.content.push( {N: log._id, action:action, timestamp: new Date().toLocaleString('ru')} );
            } else {
                const { id, title, price, quantity, amount } = product;
            
                log.content.push({
                    N: log._id,
                    action:action,
                    id:id,
                    title:title,
                    price:price,
                    quantity:quantity,
                    amount:amount,
                    timestamp: new Date().toLocaleString('ru')
                });
            }
            log._id++;

            // пишем обратно
            fs.writeFile( logFile, JSON.stringify(log, null, 4), err => console.log(err) );
        }
    });
};

module.exports = logger;