document.getElementById("priceBookMethod").addEventListener("input", function() {
    var newValue = this.value; // Lấy giá trị mới từ priceBookMethod
    var inputPriceBook = document.getElementById("priceBookAttribute").value; // Lấy giá trị từ priceBookAttribute
    var activeButton = getActiveButton(); // Lấy nút đang được chọn
    var method = '';     // Khởi tạo method

    // Lắng nghe sự kiện khi giá trị trong input thay đổi
    var inputPriceBook = document.getElementById("priceBookAttribute");
    var priceBookMethodInput = document.getElementById("priceBookMethod");
    inputPriceBook.addEventListener("input", function() {
        performCalculation(inputPriceBook.value, priceBookMethodInput.value);
    });
    priceBookMethodInput.addEventListener("input", function() {
        performCalculation(inputPriceBook.value, priceBookMethodInput.value);
    });
});

// Hàm để lấy ra nút đang được chọn
function getActiveButton() {
    var additionButton = document.querySelector(".btn-addition");
    var subtractionButton = document.querySelector(".btn-subtraction");
    var vndButton = document.querySelector(".btn-VND");
    var percentButton = document.querySelector(".btn-percent");

    if (additionButton.classList.contains("btn-success")) {
        return additionButton;
    } else if (subtractionButton.classList.contains("btn-success")) {
        return subtractionButton;
    } else if (vndButton.classList.contains("btn-success")) {
        return vndButton;
    } else if (percentButton.classList.contains("btn-success")) {
        return percentButton;
    }
    // Trả về null nếu không có nút nào được chọn
    return null;
}

// Thực hiện phép tính dựa trên nút đang được chọn
function performCalculation(inputPriceBook, priceBookMethod) {
var activeButton = getActiveButton();
if (activeButton) {
    var method = '';
    if (activeButton.classList.contains("btn-addition")) {
        method = '+';
    } else if (activeButton.classList.contains("btn-subtraction")) {
        method = '-';
    } 
        
    if (activeButton.classList.contains("btn-VND")) {
        // Thực hiện phép tính
        var result = eval(inputPriceBook + method + priceBookMethod);
    } else if (activeButton.classList.contains("btn-percent")) {
        // Thực hiện phép tính
        var result = eval(inputPriceBook + method + '(' + priceBookMethod + '/100*' + inputPriceBook + ')');
    }

    // Gán kết quả vào span#priceUpdateForm
    var priceUpdateFormSpan = document.getElementById("priceUpdateForm");
    priceUpdateFormSpan.textContent = result;
}
}