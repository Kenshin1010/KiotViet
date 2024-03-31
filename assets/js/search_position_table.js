document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("positionListSearch");
    var tableRows = document.querySelectorAll(".table-row-data");

    searchInput.addEventListener("input", function() {
        var searchText = searchInput.value.trim().toLowerCase();
        
        tableRows.forEach(function(row) {
            var positionName = row.querySelector(".position").textContent.trim().toLowerCase();

            if (positionName.includes(searchText)) {
                row.style.display = ""; // Hiển thị dòng nếu chứa từ khóa tìm kiếm
            } else {
                row.style.display = "none"; // Ẩn dòng nếu không chứa từ khóa tìm kiếm
            }
        });
    });
});