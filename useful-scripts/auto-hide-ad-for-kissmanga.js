var _css_element_selector_array = ['#tab-newest > div:first-child', '#divAds2', '#rightside > div:nth-child(5) > div'];
var _css_new_style_element = document.createElement('style');
for (i = 0; i < _css_element_selector_array.length; i++) {
    _css_new_style_element.innerHTML += _css_element_selector_array[i] + '{display: none;}';
}
document.head.appendChild(_css_new_style_element);
