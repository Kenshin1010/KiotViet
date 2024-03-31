function toggleListDisplayHide(inputSearchListId, listId, itemName) {
    var input = document.getElementById(inputSearchListId);
    var listItems = document.getElementById(listId);

    // Lắng nghe sự kiện click trên input để hiển thị danh sách
    input.addEventListener('focus', function() {
        listItems.style.display = 'block';
    });

    // Gọi hàm searchDepartment để thêm tính năng tìm kiếm
    searchInputList(inputSearchListId, listId);

    // Lắng nghe sự kiện click trên mỗi phần tử <span> trong danh sách
    listItems.querySelectorAll('.form-item').forEach(function(li) {
        var span = li.querySelector(itemName);
        span.addEventListener('click', function() {
            // Lấy nội dung của phần tử <span> bên trong phần tử <li>
            var itemName = span.textContent;

            // Hiển thị nội dung của phần tử đã chọn vào input
            input.value = itemName;
        });
    });

    // Ẩn danh sách khi người dùng click ra ngoài danh sách
    document.addEventListener('click', function(event) {
        var isClickInsideList = listItems.contains(event.target);
        var isClickInsideInput = input.contains(event.target);
        
        if (!isClickInsideList && !isClickInsideInput) {
            listItems.style.display = 'none';
        }
    });

    // Ẩn danh sách khi mất focus
    input.addEventListener('blur', function() {
        setTimeout(function() {
            listItems.style.display = 'none';
        }, 200); // Thêm độ trễ để xử lý sự kiện click trên danh sách
    });
}