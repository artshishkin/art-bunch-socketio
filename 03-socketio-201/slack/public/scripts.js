const BASE_URL = 'http://localhost:8000';
const socket = io(BASE_URL); //the / namespace/endpoint

socket.on('nsList', (nsData) => {

    const namespacesDiv = $('.namespaces');
    namespacesDiv.empty();
    nsData.forEach(ns => namespacesDiv.append(`
        <div class="namespace" ns="${ns.endpoint}">
            <img src="${ns.img}">
        </div>`
    ));
    //add a click listener for each NS
    // Array.from($('.namespace'))
    //     .forEach(el => {
    //         el.addEventListener('click', (event) => {
    //             console.dir(el.getAttribute('ns'))
    //         });
    //     });
    $('.namespace').click((event) => {
        const nsEndpoint = $(event.target).parent().attr('ns');
        // console.dir(nsEndpoint);
        const nsSocket = io(BASE_URL + nsEndpoint);
        nsSocket.on('nsRoomLoad', (nsRooms) => {
            // console.log(nsRooms);
            const roomListUl = $('.room-list');
            roomListUl.empty();
            nsRooms.forEach(nsRoom => {
                const glyph = nsRoom.privateRoom ? 'lock' : 'globe';
                roomListUl.append(`<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${nsRoom.roomTitle}</li>`);
            });
            roomListUl.children().click((e) => {
                console.log('Someone clicked on ' + e.target.innerText)
            });
        });
    });

});

socket.on('joined', (msg) => {
    console.log(msg);
});

$('#message-form').on('submit', (event) => {
    event.preventDefault();
    const newMessage = $('#user-message').val();
    // console.log(newMessage)
    socket.emit('messageToServer', {text: newMessage});
})
