// Định nghĩa hàm để cập nhật số lượng nhân viên
function updateNumberOfPriceBook() {
    // Lấy danh sách nhân viên từ localStorage
    var priceBookList = getProductListLocalStorage();

    // Số lượng nhân viên hiện có
    var numberOfPriceBook = priceBookList.length;

    // Lấy thẻ span có id là "updateQuantityPriceBook"
    var spanElement = document.getElementById("updateQuantityPriceBook");

    // Gán số lượng nhân viên vào nội dung của thẻ span
    if (spanElement) {
        spanElement.textContent = numberOfPriceBook.toString();
    } else {
        console.error("Không tìm thấy thẻ span có id là 'updateQuantityPriceBook'");
    }
}

// Gọi hàm cập nhật khi trang được load
window.addEventListener('load', function() {
    updateNumberOfPriceBook();
});