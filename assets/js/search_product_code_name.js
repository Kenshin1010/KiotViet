document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("searchCodeName");
    var tableRows = document.querySelectorAll(".table-row-data");

    searchInput.addEventListener("input", function() {
        var searchText = searchInput.value.trim().toLowerCase();
        tableRows.forEach(function(row) {
            var productCode = row.querySelector(".product-code").textContent.trim().toLowerCase();
            var productName = row.querySelector(".product-name").textContent.trim().toLowerCase();
            if (productCode.includes(searchText) || productName.includes(searchText)) {
                row.style.display = ""; // Hiển thị dòng nếu chứa từ khóa tìm kiếm
            } else {
                row.style.display = "none"; // Ẩn dòng nếu không chứa từ khóa tìm kiếm
            }
        });
    });
});