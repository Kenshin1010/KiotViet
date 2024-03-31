document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("supplierListSearch");
    var tableRows = document.querySelectorAll(".table-row-data");

    searchInput.addEventListener("input", function() {
        var searchText = searchInput.value.trim().toLowerCase();
        
        tableRows.forEach(function(row) {
            var supplierName = row.querySelector(".supplier").textContent.trim().toLowerCase();

            if (supplierName.includes(searchText)) {
                row.style.display = ""; // Hiển thị dòng nếu chứa từ khóa tìm kiếm
            } else {
                row.style.display = "none"; // Ẩn dòng nếu không chứa từ khóa tìm kiếm
            }
        });
    });
});