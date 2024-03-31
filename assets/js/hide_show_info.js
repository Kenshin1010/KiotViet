document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleButton');
    var informationDiv = document.querySelector('.hide-show-information');
    var icon = toggleButton.querySelector('i');

    toggleButton.addEventListener('click', function() {
        // Toggle display của informationDiv
        if (informationDiv.style.display === 'none') {
            informationDiv.style.display = 'block';
            // Thay đổi icon và text của button
            toggleButton.querySelector('span').textContent = 'Ẩn thông tin';
            icon.className = 'btn-form-icon fas fa-solid fa-angle-up'; // Thay đổi class của icon
        } else {
            informationDiv.style.display = 'none';
            // Thay đổi icon và text của button
            toggleButton.querySelector('span').textContent = 'Thêm thông tin';
            icon.className = 'btn-form-icon fas fa-solid fa-angle-down'; // Thay đổi class của icon
        }
    });
});
