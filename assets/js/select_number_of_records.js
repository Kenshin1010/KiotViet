document.addEventListener('DOMContentLoaded', function() {
    // Lấy tham chiếu đến các phần tử cần thiết
    var selectNumberOfRecords = document.getElementById('numberOfRecords');
    var tableBody = document.getElementById('employeeListId');

    // Mặc định ban đầu chọn 10 hàng
    var defaultSelectedValue = 10;
    selectNumberOfRecords.value = defaultSelectedValue;
    
    // Gọi hàm để xử lý việc hiển thị số hàng tương ứng
    displaySelectedNumberOfRows(defaultSelectedValue);

    // Bắt sự kiện khi giá trị của select thay đổi
    selectNumberOfRecords.addEventListener('change', function() {
        // Lấy giá trị đã chọn
        var selectedValue = parseInt(this.value);
        
        // Gọi hàm để xử lý việc hiển thị số hàng tương ứng
        displaySelectedNumberOfRows(selectedValue);
    });

    // Hàm để hiển thị số hàng tương ứng
    function displaySelectedNumberOfRows(selectedValue) {
        // Lấy danh sách các hàng trong tbody
        var rows = tableBody.querySelectorAll('.table-row-data');
        
        // Ẩn tất cả các hàng trước khi hiển thị số hàng mới
        rows.forEach(function(row) {
            row.style.display = 'none';
        });
        
        // Hiển thị số hàng tương ứng
        for (var i = 0; i < selectedValue; i++) {
            rows[i].style.display = 'table-row';
        }
    }
});