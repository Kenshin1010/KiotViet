document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll(".btn-more-product");
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            var productId = button.getAttribute("data-product-id");
            var operationList = document.querySelector('.operation-detail-list[data-product-id="' + productId + '"]');
            // Kiểm tra xem operationList đang hiển thị hay không
            if (operationList.style.display === "block") {
                // Nếu đã hiển thị, ẩn đi
                operationList.style.display = "none";
            } else {
                // Nếu chưa hiển thị, hiển thị lên
                operationList.style.display = "block";
            }
        });
    });
});