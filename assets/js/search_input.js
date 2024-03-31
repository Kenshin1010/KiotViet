function searchInputList(searchInputId, listId) {
    var searchInput = document.getElementById(searchInputId);
    var listItems = document.getElementById(listId).querySelector("ul.form-items");
    var items = listItems.querySelectorAll(".form-item");

    searchInput.addEventListener("input", function() {
        var searchText = searchInput.value.toLowerCase();
        items.forEach(function(item) {
            var departmentName = item.querySelector(".item-name").textContent.toLowerCase();
            if (departmentName.includes(searchText)) {
                item.style.display = ""; // Hiển thị phần tử nếu chứa từ khóa tìm kiếm
            } else {
                item.style.display = "none"; // Ẩn phần tử nếu không chứa từ khóa tìm kiếm
            }
        });
    });
}