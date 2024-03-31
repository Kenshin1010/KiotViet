function showDivToggle(buttonId, classDiv) {
    var toggleButton = document.getElementById(buttonId);
    var informationDiv = document.querySelector(classDiv);
    var icon = toggleButton.querySelector('i');

    toggleButton.addEventListener('click', function() {
        // Toggle display của informationDiv
        if (informationDiv.style.display === 'none' || informationDiv.style.display === '') {
            informationDiv.style.display = 'block';
            // Thay đổi icon và text của button
            icon.className = 'btn-form-icon fas fa-solid fa-angle-up'; // Thay đổi class của icon
        } else {
            informationDiv.style.display = 'none';
            // Thay đổi icon và text của button
            icon.className = 'btn-form-icon fas fa-solid fa-angle-down'; // Thay đổi class của icon
        }
    });
}