function toggleButtonContainer(btnId, tableClass) {
    var toggleButton = document.getElementById(btnId);
    var tableContainer = document.querySelector(tableClass);

    toggleButton.addEventListener('click', function() {
        // Chuyển đổi trạng thái của nút
        toggleButton.classList.toggle('active');

        // Lấy giá trị thực tế của thuộc tính display
        var displayValue = window.getComputedStyle(tableContainer).getPropertyValue('display');
        console.log(displayValue);

        // Kiểm tra trạng thái hiện tại của div
        if (displayValue === 'none') {
            // Nếu đang ẩn, thì hiển thị và thay đổi CSS
            tableContainer.style.display = 'block';
            toggleButton.style.backgroundColor = '#2e94da';
            toggleButton.style.textAlign = 'right';
        } else {
            // Nếu đang hiển thị, thì ẩn đi và thay đổi CSS
            tableContainer.style.display = 'none';
            toggleButton.style.backgroundColor = '#d7d7d7';
            toggleButton.style.textAlign = 'left';
        }
    });
}
