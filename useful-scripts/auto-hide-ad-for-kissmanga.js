var _css_element_selector_array = ["div > iframe[src*=ads]", "div > a[target=_blank]"];
var _css_new_style_element = document.createElement("style");
for (i = 0; i < _css_element_selector_array.length; i++) {
    _css_new_style_element.innerHTML += _css_element_selector_array[i] + "{display: none;}";
}
document.head.appendChild(_css_new_style_element);
