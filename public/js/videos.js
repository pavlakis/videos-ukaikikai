let toggle = 0;
let rowBg = ['bg-light', 'text-white bg-secondary'];
let videoCollection;
let years = [];

function fetchCollection() {
    $.ajax({
        url: "https://raw.githubusercontent.com/pavlakis/api-ukaikikai/master/videos.json"
    })
    .done(function( data ) {
        videoCollection = JSON.parse(data);
        for (let [year, yearVideos] of Object.entries(videoCollection)) {
            years.push({'id': year, 'text': year});
            yearVideos.forEach(function(video){
                displayVideo(video);
            });
        }
        loadYearList();
        filterEventHandler();
    });
}

function loadYearList() {
    $('#year-list').select2({
        placeholder: 'Select a year',
        data: years
    });
}

function displayVideo(video) {
    let $hideElement = $('.video .hide');
    if ($hideElement.length !== 0) {
        let $element = $($hideElement[0]);
        $element.find('.card').addClass(rowBg[toggle]);
        $element.find('.card-header').html(video.title);
        $element.find('.card-title').html(video.description);
        $element.find('iframe').attr('src', video.player);
        $element.removeClass('hide');
        toggle = toggle === 0 ? 1 : 0;
        return;
    }

    appendTemplate();
    return displayVideo(video);
}

function appendTemplate() {
    let $template = $('#template .template-container').clone();
    $template.addClass('video');
    $template.insertBefore($('footer'), null);
}

function displayByYear(year) {
    let $allVideos = $('.video');
    $allVideos.remove();
    $('#top-video').hide();

    videoCollection[year].forEach(function(video){
        displayVideo(video);
    });
}

function displayAll() {
    $('#top-video').show();
    let $allVideos = $('.video');
    $allVideos.remove();

    for (let [year, yearVideos] of Object.entries(videoCollection)) {
        yearVideos.forEach(function(video){
            displayVideo(video);
        });
    }
}

function filterEventHandler() {
    $('#filter').on('click', function(e){
        if (!hasSelection()) {
            return;
        }

        addClearEventHandler();
        let $yearList = $('#year-list').val();
        displayByYear($yearList);
    });
}

function addClearEventHandler() {
    $('#clear').on('click', function(e){
        $('#year-list').empty().trigger('change');
        $(this).off();
        displayAll();
    });
}

function hasSelection() {
    let $yearList = $('#year-list').val();
    if ($yearList === '' || $yearList === null) {
        return false;
    }

    return true;
}

$(document).ready(function(){
    fetchCollection();
});