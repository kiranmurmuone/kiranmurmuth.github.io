$(document).ready(function(){
    $('div > div[style] > iframe[src*=ads], div > div[style] > a[target=_blank]').parent('div').css('display', 'none');
});
