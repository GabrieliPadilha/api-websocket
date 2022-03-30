const { WebSocketServer } = require('ws');
const messages = [{
  recipient: '523523',
  sender: '634634',
  message: 'Hello',
}]

const wss = new WebSocketServer({
  port: 8085,
})

wss.on('connection', function connection(ws) {
    //trata recebimento de mesnsagem 
    ws.on('message', function message(data) {
      const message = JSON.parse(data.toString('utf-8'))
      switch(message.type) {
        case 'new-message':
          messages.push(message)
          wss.clients.forEach(client => {
              client.send(message)
          })
          break;
        // case 'fetch':
        //   wss.clients.forEach(client => {
        //       client.send(JSON.stringify(messages))
        //   })
        //   break;
      }
    });

    ws.send(JSON.stringify(messages))
  });