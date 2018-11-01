var _css_element_selector_array = ['#tab-newest > div:first-child', '#divAds2', 'clear', 'clear2'];
var _css_new_style_element = document.createElement('style');

for (i = 0; i < _css_element_selector_array.length; i++) {
    _css_new_style_element.innerHTML += '\n\t' + _css_element_selector_array[i] + ' {\n\t\tdisplay: none;\n\t}';
}
_css_new_style_element.innerHTML += '\n';
document.head.appendChild(_css_new_style_element);
