document.addEventListener("DOMContentLoaded", function () {
    // Kích hoạt hàm closeButtonId từ tệp btn_close_id.js
    closeButtonId("closePrintBarcode", "barcodeContainerShowPrint");

    // Lắng nghe sự kiện click cho các button ".btn-default-product[data-product-id]"
    const showBarcodeButtons = document.querySelectorAll(".btn-default-product[data-product-id]");
    showBarcodeButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            // Ngăn chặn sự kiện click lan truyền đến sự kiện document click
            event.stopPropagation();

            // Xử lý mã vạch
            const productId = button.dataset.productId;
            const product = getProductById(productId);
            if (!product) {
                console.error("Không tìm thấy sản phẩm có ID", productId);
                return;
            }

            // Đảm bảo rằng dữ liệu mã vạch có đúng 12 chữ số
            let identificationProductBarcode = product.barcode;
            if (identificationProductBarcode.length !== 12) {
                console.error("Dữ liệu mã vạch không hợp lệ");
                return;
            }

            // Tính toán chữ số kiểm tra và thêm vào cuối dữ liệu mã vạch
            identificationProductBarcode += calculateChecksum(identificationProductBarcode);

            const barcodeContainer = document.getElementById("barcodeContainerShowPrint");
            const context = barcodeContainer.getContext("2d");

            JsBarcode(context, identificationProductBarcode, {
                format: "EAN13",
                width: 2,
                height: 100,
                fontSize: 20,
                textMargin: 10,
                margin: 10,
                lineColor: "#000",
                displayValue: true
            });

            barcodeContainer.style.display = "block"; // Hiển thị container khi mã vạch được tạo
        });
    });
});

// Hàm tính số kiểm tra (checksum) cho mã vạch EAN-13
function calculateChecksum(barcode) {
    let sum = 0;
    for (let i = 0; i < barcode.length; i++) {
        sum += parseInt(barcode[i]) * (i % 2 === 0 ? 1 : 3);
    }
    const checksum = (10 - (sum % 10)) % 10;
    return String(checksum);
}