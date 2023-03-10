const socket = io('http://localhost:8000'); //the / namespace/endpoint

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
    $('.namespace').click((event) => console.dir($(event.target).parent().attr('ns')));

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
