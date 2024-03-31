function hideRowsBasedOnDefaultSelection() {
    var defaultSelectedValue = 10;
    var selectedValue = parseInt(selectNumberOfRecordsProduct.value);
    var rows = tableBodyProduct.querySelectorAll('.table-row-data');
    
    // Ẩn tất cả các hàng trước khi hiển thị số hàng mới
    rows.forEach(function(row, index) {
        if (index >= defaultSelectedValue) {
            row.style.display = 'none';
        } else {
            row.style.display = 'table-row';
        }
    });
}

// Lấy tham chiếu đến các phần tử cần thiết
var selectNumberOfRecordsProduct = document.getElementById('numberOfRecordsProduct');
var tableBodyProduct = document.getElementById('productListId');

document.addEventListener('DOMContentLoaded', function() {
    // Mặc định ban đầu chọn 10 hàng và ẩn các hàng thừa
    selectNumberOfRecordsProduct.value = 10;
    hideRowsBasedOnDefaultSelection();
    
    // Bắt sự kiện khi giá trị của select thay đổi
    selectNumberOfRecordsProduct.addEventListener('change', function() {
        // Lấy giá trị đã chọn
        var selectedValue = parseInt(this.value);
        
        // Lấy danh sách các hàng trong tbody
        var rows = tableBodyProduct.querySelectorAll('.table-row-data');
        
        // Ẩn tất cả các hàng trước khi hiển thị số hàng mới
        rows.forEach(function(row) {
            row.style.display = 'none';
        });
        
        // Hiển thị số hàng tương ứng
        for (var i = 0; i < selectedValue; i++) {
            rows[i].style.display = 'table-row';
        }
    });
});