function focusOnInputShowDiv(inputIdShow, divClassShow) {
    var inputElement = document.getElementById(inputIdShow);
    var divElement = document.querySelector(divClassShow);
    if (inputElement && divElement && divElement.style.display === 'block') {
        inputElement.focus(); // Thiết lập focus cho phần tử <input> nếu div có class 'active-info-employee'
    }
}