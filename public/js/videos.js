var toggle = 0;
var rowBg = ['bg-light', 'text-white bg-secondary'];

function fetchCollection() {
    $.ajax({
        url: "https://raw.githubusercontent.com/pavlakis/api-ukaikikai/master/videos.json"
    })
    .done(function( data ) {
        var videoCollection = JSON.parse(data);
        videoCollection.forEach(function( video ) {
            displayVideo(video);
        });
    });
}

function displayVideo(video) {
    var $hideElement = $('.row .hide');
    console.log($hideElement.length);
    if ($hideElement.length !== 0) {
        var $element = $($hideElement[0]);
        $element.find('.card').addClass(rowBg[toggle]);
        $element.find('.card-title').html(video.title);
        $element.find('iframe').attr('src', video.player);
        $element.removeClass('hide');
        toggle = toggle === 0 ? 1 : 0;
        return;
    }

    appendTemplate();
    return displayVideo(video);
}

function appendTemplate() {
    var $template = $('#template .row');
    $template.insertBefore('footer');
    var $row = $('.hide');
    $row.removeClass('hide');
    $row.find('.col-sm-6').addClass('hide');
}