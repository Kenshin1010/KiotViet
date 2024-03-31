document.addEventListener("DOMContentLoaded", function() {
    // Hàm để thực hiện thao tác toggle cho các nút
    function toggleButtons(btnActive, btnInactive) {
        // Xóa lớp btn-default và thêm lớp btn-success cho nút active
        btnActive.classList.remove("btn-default");
        btnActive.classList.add("btn-success");

        // Xóa lớp btn-success và thêm lớp btn-default cho nút inactive
        btnInactive.classList.remove("btn-success");
        btnInactive.classList.add("btn-default");
    }

    // Thêm sự kiện click cho nút Addition
    var additionButton = document.querySelector(".btn-addition");
    var subtractionButton = document.querySelector(".btn-subtraction");
    additionButton.addEventListener("click", function() {
        toggleButtons(additionButton, subtractionButton);
    });

    // Thêm sự kiện click cho nút Subtraction
    subtractionButton.addEventListener("click", function() {
        toggleButtons(subtractionButton, additionButton);
    });

    // Thêm sự kiện click cho nút VND
    var vndButton = document.querySelector(".btn-VND");
    var percentButton = document.querySelector(".btn-percent");
    vndButton.addEventListener("click", function() {
        toggleButtons(vndButton, percentButton);
    });

    // Thêm sự kiện click cho nút Percent
    percentButton.addEventListener("click", function() {
        toggleButtons(percentButton, vndButton);
    });
});