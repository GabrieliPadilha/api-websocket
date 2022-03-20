const { WebSocketServer } = require('ws');
const messages = []

/**
 * @typedef {object} Message
 * @property {}
 */

const wss = new WebSocketServer({
  port: 8085,
})

wss.on('connection', function connection(ws) {
    //trata recebimento de mesnsagem 
    ws.on('message', function message(data) {
        const textMessage = data.toString('utf-8')
        messages.push(textMessage)
        wss.clients.forEach(client => {
            client.send(textMessage)
        })
    });
    // envia menssagem quando a conexão é aberta
    ws.send(JSON.stringify(messages) ? JSON.stringify(messages) : null);
  });