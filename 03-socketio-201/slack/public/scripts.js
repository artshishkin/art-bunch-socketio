const BASE_URL = 'http://localhost:8000';
const socket = io(BASE_URL); //the / namespace/endpoint
let nsSocket = "";

socket.on('nsList', (nsData) => {

    const namespacesDiv = $('.namespaces');
    namespacesDiv.empty();
    nsData.forEach(ns => namespacesDiv.append(`
        <div class="namespace" ns="${ns.endpoint}">
            <img src="${ns.img}">
        </div>`
    ));
    //add a click listener for each NS
    $('.namespace').click((event) => {
        const nsEndpoint = $(event.target).parent().attr('ns');
        joinNs(nsEndpoint);
    });

});

