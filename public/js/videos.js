let toggle = 0;
let rowBg = ['bg-light', 'text-white bg-secondary'];
let videoCollection;

function fetchCollection() {
    $.ajax({
        url: "https://raw.githubusercontent.com/pavlakis/api-ukaikikai/master/videos.json"
    })
    .done(function( data ) {
        videoCollection = JSON.parse(data);
        for (let [year, yearVideos] of Object.entries(videoCollection)) {
            yearVideos.forEach(function(video){
                displayVideo(video);
            });
        }
    });
}

function displayVideo(video) {
    let $hideElement = $('.video .hide');
    if ($hideElement.length !== 0) {
        let $element = $($hideElement[0]);
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

$(document).ready(function(){
    fetchCollection();
});