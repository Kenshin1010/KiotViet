function searchCodeName(searchInputId, searchTableRow, searchTableColumn) {
    var searchInput = document.getElementById(searchInputId);
    var tableRows = document.querySelectorAll(searchTableRow);

    searchInput.addEventListener("input", function() {
        var searchText = searchInput.value.trim().toLowerCase();
        tableRows.forEach(function(row) {
            var columnContent = row.querySelector(searchTableColumn).textContent.trim().toLowerCase();
            if (columnContent.includes(searchText)) {
                row.style.display = ""; // Hiển thị dòng nếu chứa từ khóa tìm kiếm
            } else {
                row.style.display = "none"; // Ẩn dòng nếu không chứa từ khóa tìm kiếm
            }
        });
    });
}