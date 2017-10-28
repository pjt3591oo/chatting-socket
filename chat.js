/**
 * Created by bagjeongtae on 2017. 10. 28..
 */

const io = require('socket.io');


/*
* {id1: {name: '', room: ''}, id2: {name: '', room: ''}, id3: {name: '', room: ''}, id4: {name: '', room: ''}}
*
* */
let info = {

};



let rooms = {

}

const Chat = server => {
    c = io(server) ;

    let chat = c.of('/chat').on('connection', function(socket) {

        let name = socket.handshake.query.name,
            room = socket.handshake.query.room;

        let n = `${name}.${room}`;

        if(!rooms[n]) {
            rooms[n] = { id: socket.id, name: name, room : room};
            socket.join(room); // 채널에 접속.
            console.log(`${room} 채널에 ${name}이(가) ${socket.id} 접속했습니다.`);
        }
        else{ console.log(`${room} 채널에 ${name}는(은) 이미 존재합니다.`)}


        socket.on('/message', function (data) {
            let sender = `${data['from']}.${room}`;
            let receiver;
            if(data['to']){

                receiver = `${data['to']}.${room}`;
                let receiverId = rooms[receiver];
                if(receiverId){
                    console.log(`${receiverId['name']}에게 귓속말을 전달합니다.`);
                    chat.to(receiverId['id']).emit('display', data); // 귓속말
                    return;
                }else{
                    console.log(`${receiver}는 존재하지 않습니다.`);
                    return;
                }
            }

            // console.log(sender, rooms[sender]['id']);
            // console.log(receiver, rooms[receiver]['id']);
            console.log(`${room}방에 메세지릴 전달합니다.`);
            chat.to(room).emit('display', data);
        });

    });
};

module.exports = Chat;