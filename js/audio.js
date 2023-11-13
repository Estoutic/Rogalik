
$(document).ready(function () {
    $('#playImg').on('click', function () {
        var audio = $('#audio')[0];
        if (audio.paused) {
            audio.play().then(function () {
                $('#playImg').attr("src", "./images/stop.png")

            }).catch(function (error) {
                console.error('Ошибка воспроизведения аудио:', error);
            });
        } else {
            audio.pause();
            $('#playImg').attr("src", "./images/play.png")

        }
    });
});