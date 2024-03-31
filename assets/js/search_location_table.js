document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("locationListSearch");
    var tableRows = document.querySelectorAll(".table-row-data");

    searchInput.addEventListener("input", function() {
        var searchText = searchInput.value.trim().toLowerCase();
        
        tableRows.forEach(function(row) {
            var locationName = row.querySelector(".location").textContent.trim().toLowerCase();

            if (locationName.includes(searchText)) {
                row.style.display = ""; // Hiển thị dòng nếu chứa từ khóa tìm kiếm
            } else {
                row.style.display = "none"; // Ẩn dòng nếu không chứa từ khóa tìm kiếm
            }
        });
    });
});