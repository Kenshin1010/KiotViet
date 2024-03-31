document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các input trong phần tử có class là check-box-menu
    var checkBoxes = document.querySelectorAll('.check-box-menu input');

    // Lặp qua từng input để gắn sự kiện change
    checkBoxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // Lấy id của input
            var inputId = this.getAttribute('id');

            // Lấy tất cả các cột th và td có thuộc tính for tương ứng với inputId
            var columns = document.querySelectorAll('[for="' + inputId + '"]');

            // Lặp qua từng cột để ẩn/hiện
            columns.forEach(function(column) {
                // Kiểm tra trạng thái của input để ẩn hoặc hiện cột
                if (checkbox.checked) {
                    column.style.display = 'table-cell';
                } else {
                    column.style.display = 'none';
                }
            });
        });
    });
});