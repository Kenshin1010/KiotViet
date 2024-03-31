function toggleButtonDivContent(btnId, tableClass, iconClass) {
    var toggleButton = document.getElementById(btnId);
    var tableContainer = document.querySelector(tableClass);
    var chooseClass = document.querySelector(iconClass);
    var icon = chooseClass.querySelector('i')

    toggleButton.addEventListener('click', function() {
        // Chuyển đổi trạng thái của nút
        toggleButton.classList.toggle('active');

        // Lấy giá trị thực tế của thuộc tính display
        var displayValue = window.getComputedStyle(tableContainer).getPropertyValue('display');

        // Kiểm tra trạng thái hiện tại của div
        if (displayValue === 'none') {
            // Nếu đang ẩn, thì hiển thị và thay đổi CSS
            tableContainer.style.display = 'block';
            icon.classList.remove('rotate'); // Xoay icon trở lại vị trí ban đầu
        } else {
            // Nếu đang hiển thị, thì ẩn đi và thay đổi CSS
            tableContainer.style.display = 'none';
            icon.classList.add('rotate'); // Thêm class rotate để xoay icon
        }
    });
}