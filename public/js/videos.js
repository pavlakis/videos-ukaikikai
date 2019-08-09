var toggle = 0;
var rowBg = ['bg-light', 'text-white bg-secondary'];

function fetchCollection() {
    $.ajax({
        url: "https://raw.githubusercontent.com/pavlakis/api-ukaikikai/master/videos.json"
    })
    .done(function( data ) {
        var videoCollection = JSON.parse(data);
        videoCollection.forEach(function( video ) {
            // appendTemplate();
            displayVideo(video);
        });
    });
}

function displayVideo(video) {
    var $hideElement = $('.video .hide');
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
    var $template = $('#template .template-container').clone();
    $template.addClass('video');
    $template.insertBefore($('footer'), null);
}