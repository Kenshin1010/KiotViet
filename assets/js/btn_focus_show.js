function toggleDisplay(btnId, divClass, inputId) {
    var button = document.getElementById(btnId);
    var div = document.querySelector(divClass);

    button.addEventListener('click', function() {
        if (div.style.display === 'none' || div.style.display === '') {
            div.style.display = 'block';
            focusOnInput(inputId);
        } else {
            div.style.display = 'none';
        }
    });
}


// function focusOnInput(inputId) {
//     var inputElement = document.getElementById(inputId);
//     if (inputElement) {
//         inputElement.focus(); // Thiết lập focus cho phần tử <input>
//     }
// }