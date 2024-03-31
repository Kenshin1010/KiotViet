// Định nghĩa hàm để cập nhật số lượng nhân viên
function updateNumberOfEmployees() {
    // Lấy danh sách nhân viên từ localStorage
    var employeeList = getEmployeeListLocalStorage();

    // Số lượng nhân viên hiện có
    var numberOfEmployees = employeeList.length;

    // Lấy thẻ span có id là "updateQuantityEmployee"
    var spanElement = document.getElementById("updateQuantityEmployee");

    // Gán số lượng nhân viên vào nội dung của thẻ span
    if (spanElement) {
        spanElement.textContent = numberOfEmployees.toString();
    } else {
        console.error("Không tìm thấy thẻ span có id là 'updateQuantityEmployee'");
    }
}

// Gọi hàm cập nhật khi trang được load
window.addEventListener('load', function() {
    updateNumberOfEmployees();
});