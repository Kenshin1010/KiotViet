// Hàm hiển thị hoặc ẩn chi tiết của employee dựa trên id
function toggleEmployeeDetail(employeeId) {
    // Tìm tất cả các hàng chi tiết
    var detailRows = document.querySelectorAll('.row-detail');

    // Toggle hiển thị/ẩn đi tất cả các hàng chi tiết
    detailRows.forEach(function(detailRow) {
        if (detailRow.getAttribute('data-employee-id') === employeeId) {
            if (detailRow.style.display === 'block') {
                detailRow.style.display = 'none';
            } else {
                detailRow.style.display = 'block';
            }
        } else {
            detailRow.style.display = 'none';
        } 
    });
}

// Lắng nghe sự kiện click vào các hàng dữ liệu
document.querySelectorAll('.table-row-data').forEach(function(row) {
    row.addEventListener('click', function() {
        // Lấy id của employee
        var employeeId = this.getAttribute('data-employee-id');

        // Toggle hiển thị/ẩn chi tiết dựa trên id của employee
        toggleEmployeeDetail(employeeId);
    });
});