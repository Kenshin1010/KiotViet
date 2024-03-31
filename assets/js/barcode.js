// Hàm tạo mã barcode
function generateBarcode(code, containerId) {
    // Lấy ra đối tượng container dựa trên id
    var container = document.getElementById(containerId);
    // Xóa nội dung cũ của container (nếu có)
    container.innerHTML = '';

    // Tạo mã barcode trong container
    JsBarcode(container, code, {
        format: "EAN13", // Loại mã barcode (ví dụ: EAN-13)
        width: 2, // Độ rộng của thanh barcode
        height: 100, // Độ cao của thanh barcode
        displayValue: true // Hiển thị giá trị mã code bên dưới barcode
    });
}

// Hàm tạo mã vạch tự động
function generateBarcodeAuto() {
    var barcode = ""; // Khởi tạo mã vạch rỗng
  
    // Tạo mã vạch ngẫu nhiên gồm 13 chữ số
    for (var i = 0; i < 13; i++) {
        barcode += Math.floor(Math.random() * 10); // Thêm một chữ số ngẫu nhiên vào mã vạch
    }
  
    return barcode; // Trả về mã vạch đã tạo
  }

// Gọi hàm để tạo mã barcode với mã code và id của container
generateBarcode('123456789012', 'barcodeRandom');