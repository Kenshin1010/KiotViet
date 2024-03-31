document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các input trong phần tử có class là check-box-menu
    var checkBoxes = document.querySelectorAll('.check-box-menu-type input');

    // Lặp qua từng input để gắn sự kiện change
    checkBoxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // Lấy id của input
            var inputId = this.getAttribute('id');

            // Lấy tất cả các hàng tr có thuộc tính for tương ứng với inputId
            var rows = document.querySelectorAll('[for="' + inputId + '"]');

            // Lặp qua từng cột để ẩn/hiện
            rows.forEach(function(row) {
                // Kiểm tra trạng thái của input để ẩn hoặc hiện cột
                if (checkbox.checked) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
});