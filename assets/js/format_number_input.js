// Lưu ý khi dùng formatInpurValue thì nên để input type="text" thay vì type="number"
function formatInputValue(inputId) {
    var nodeInput = document.getElementById(inputId);
    var inputValue = nodeInput.value.trim();

    if (inputValue === '') {
        nodeInput.classList.remove("invalid"); // Xóa lớp 'invalid' nếu trường hợp lệ
        return nodeInput.value = ''; // Gán giá trị rỗng cho input nếu giá trị đã được xóa
    }

    // Loại bỏ các dấu phẩy từ giá trị nhập vào
    var sanitizedValue = inputValue.replace(/,/g, '');
    
    // Kiểm tra xem giá trị nhập vào có phải là số hay không
    if (!isNaN(sanitizedValue)) {
        // Chuyển đổi giá trị thành số nguyên
        var integerValue = parseInt(sanitizedValue);

        // Sử dụng Number.toLocaleString để chuyển đổi số thành chuỗi với định dạng có dấu phẩy
        var formattedValue = integerValue.toLocaleString('en-US');
        nodeInput.value = formattedValue;
        nodeInput.classList.remove("invalid"); // Xóa lớp 'invalid' nếu trường hợp lệ
    } else {
        // alert("Invalid barcode");
        toastEdit({
            type:'error',
            message:'Dữ liệu nhập vào không phải số nguyên',
            duration:500
        });
        nodeInput.classList.add("invalid"); // Thêm lớp 'invalid' để đánh dấu trường không hợp lệ
        nodeInput.focus(); // Focus trở lại trường nhập liệu
    }
}

function handleBarcodeInput(inputId) {
    // Lấy tham chiếu đến input element
    var inputElement = document.getElementById(inputId);

    // Thêm sự kiện 'input' để kiểm tra mỗi khi người dùng nhập vào input
    inputElement.addEventListener("input", function() {
        // Lấy giá trị đã nhập
        var barcodeValue = this.value;
        var length = barcodeValue.length;

        // Kiểm tra nếu giá trị nhập vào là số và không vượt quá 11 ký tự
        if (/^\d{1,11}$/.test(barcodeValue)) {
            // Loại bỏ lớp CSS nếu có
            this.classList.remove("invalid-barcode");
            this.classList.remove("info-barcode");
        } else if (length === 12) {
            // Nếu bằng số 12 thêm một lớp CSS để thay đổi màu sắc thành xanh
            this.classList.add("info-barcode");
            this.classList.remove("invalid-barcode");
        } else {
            // Nếu không phải là số hoặc vượt quá 12 ký tự, thêm một lớp CSS để thay đổi màu sắc thành đỏ
            this.classList.add("invalid-barcode");
            this.classList.remove("info-barcode");
        }
    });
}

function formatInputPhoneNumber(inputId) {
    var nodeInput = document.getElementById(inputId);
    var inputValue = nodeInput.value.trim();

    if (inputValue === '') {
        nodeInput.classList.remove("invalid"); // Xóa lớp 'invalid' nếu trường hợp lệ
        return nodeInput.value = ''; // Gán giá trị rỗng cho input nếu giá trị đã được xóa
    }

    // Loại bỏ các dấu gạch ngang và dấu phẩy từ giá trị nhập vào
    var sanitizedValue = inputValue.replace(/[-,]/g, '');

    // Kiểm tra xem giá trị nhập vào có phải là số điện thoại hợp lệ không
    if (validatePhoneNumber(sanitizedValue)) {
        // Chuyển đổi giá trị thành định dạng số điện thoại
        var formattedValue = formatPhoneNumber(sanitizedValue);
        nodeInput.value = formattedValue;
        nodeInput.classList.remove("invalid"); // Xóa lớp 'invalid' nếu trường hợp lệ
    } 
    // else {
    //     // Hiển thị thông báo lỗi
    //     toastEdit({
    //         type: 'error',
    //         message: 'Số điện thoại không hợp lệ',
    //         duration: 500
    //     });
    //     // Thêm lớp 'invalid' để đánh dấu trường không hợp lệ
    //     nodeInput.classList.add("invalid");
    //     // Focus trở lại trường nhập liệu
    //     nodeInput.focus();
    // }
}

// Hàm chuyển đổi số điện thoại thành định dạng có dấu gạch ngang
function formatPhoneNumber(phoneNumber) {
    // Định dạng: XXXX-XXX-XXX
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3");
}