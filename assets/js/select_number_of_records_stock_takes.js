document.addEventListener('DOMContentLoaded', function() {
    // Lấy tham chiếu đến các phần tử cần thiết
    var selectNumberOfRecordsStockTakes = document.getElementById('numberOfRecordsStockTakes');
    var tableBody = document.getElementById('stockTakesListId');

    // Mặc định ban đầu chọn 10 hàng
    var defaultSelectedValueStockTakes = 10;
    selectNumberOfRecordsStockTakes.value = defaultSelectedValueStockTakes;
    
    // Gọi hàm để xử lý việc hiển thị số hàng tương ứng
    displaySelectedNumberOfRowsStockTakes(defaultSelectedValueStockTakes);

    // Bắt sự kiện khi giá trị của select thay đổi
    selectNumberOfRecordsStockTakes.addEventListener('change', function() {
        // Lấy giá trị đã chọn
        var selectedValue = parseInt(this.value);
        
        // Gọi hàm để xử lý việc hiển thị số hàng tương ứng
        displaySelectedNumberOfRowsStockTakes(selectedValue);
    });

    // Hàm để hiển thị số hàng tương ứng
    function displaySelectedNumberOfRowsStockTakes(selectedValue) {
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