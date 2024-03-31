document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("searchCodeName");
    var tableRows = document.querySelectorAll(".table-row-data");

    searchInput.addEventListener("input", function() {
        var searchText = searchInput.value.trim().toLowerCase();
        tableRows.forEach(function(row) {
            var employeeCode = row.querySelector(".employee-code").textContent.trim().toLowerCase();
            var employeeName = row.querySelector(".employee-name").textContent.trim().toLowerCase();
            if (employeeCode.includes(searchText) || employeeName.includes(searchText)) {
                row.style.display = ""; // Hiển thị dòng nếu chứa từ khóa tìm kiếm
            } else {
                row.style.display = "none"; // Ẩn dòng nếu không chứa từ khóa tìm kiếm
            }
        });
    });
});