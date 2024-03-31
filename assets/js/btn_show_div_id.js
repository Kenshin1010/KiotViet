function showDivId(btnId,ClassId) {
    // Lấy tham chiếu đến nút đóng và phần tử div cần ẩn
    var showBtn = document.getElementById(btnId);
    var divIdToShow = document.getElementById(ClassId);

    // Thêm sự kiện click vào nút mở
    showBtn.addEventListener('click', function() {
        // Ẩn đi phần tử div
        divIdToShow.style.display = 'block';
    });
};