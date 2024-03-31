// Hàm kiểm tra tính hợp lệ và trỏ chuột về trường không hợp lệ
function validateAndFocusInvalidFieldProduct() {
    var isValid = true;

    // Validate product name
    var nodeName = document.getElementById("productName");
    var productName = nodeName.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
    if (productName === null || productName === "") {
        isValid = false;
        // alert("product name cannot be empty");
        toastEdit({
            type:'error',
            message:'Tên không được để trống',
            duration:3000
          });
        nodeName.classList.add("invalid"); // Thêm lớp 'invalid' để đánh dấu trường không hợp lệ
        nodeName.focus(); // Focus trở lại trường nhập liệu
        return isValid;
    } else {
        nodeName.classList.remove("invalid"); // Xóa lớp 'invalid' nếu trường hợp lệ
    }

    // Validate barcode
    var nodeBarcode = document.getElementById("productBarcode");
    var productBarcode = nodeBarcode.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
    if (isValid && !validateProductBarcode(productBarcode)) {
        isValid = false;
        // alert("Invalid barcode");
        toastEdit({
            type:'error',
            message:'Mã vạch chưa hợp lệ. Định dạng EAN13: 12 chữ số. Không cần nhập chữ số cuối (chữ số để kiểm tra)',
            duration:3000
          });
        nodeBarcode.classList.add("invalid"); // Thêm lớp 'invalid' để đánh dấu trường không hợp lệ
        nodeBarcode.focus(); // Focus trở lại trường nhập liệu
        return isValid;
    } else {
        nodeBarcode.classList.remove("invalid"); // Xóa lớp 'invalid' nếu trường hợp lệ
    }

    // Thêm các điều kiện kiểm tra khác ở đây nếu cần

    return isValid;
}
  
// Hàm kiểm tra tính hợp lệ cho số barcode
function validateProductBarcode(productBarcode) {
    // Kiểm tra nếu barcode không rỗng và không null
    if (productBarcode && productBarcode.trim() !== '') {
        var barcodePattern = /^\d{12}$/; // Định dạng EAN13: 12 chữ số
        return barcodePattern.test(productBarcode);
    }
    // Trường hợp barcode trống hoặc null, không thực hiện kiểm tra validation và trả về true
    return true;
}