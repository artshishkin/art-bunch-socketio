const wHeight = $(window).height();
const wWidth = $(window).width();
let player = {}

const canvas = document.querySelector("#the-canvas");
const context = canvas.getContext("2d");
canvas.width = wWidth;
canvas.height = wHeight;

$(window).load(() => {
    $('#loginModal').modal('show');
})

$('.name-form').submit((event) => {
    event.preventDefault();
    player.name = $('#name-input').val();
    $('#loginModal').modal('hide');
    $('.player-name').text(player.name);
    $('#spawnModal').modal('show');
})

$('#play-solo-btn').click(() => {
    $('#spawnModal').modal('hide');
    console.log('play')
    $('.hiddenOnStart').removeAttr('hidden');
    init();
})

