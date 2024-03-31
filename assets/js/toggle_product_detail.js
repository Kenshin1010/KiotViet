// Hàm hiển thị hoặc ẩn chi tiết của product dựa trên id
function toggleProductDetail(productId) {
    // Tìm tất cả các hàng chi tiết
    var detailRows = document.querySelectorAll('.row-detail');

    //     // Lấy các đối tượng img của các hình ảnh nhỏ
    // for (var i = 2; i <= 5; i++) {
    //     // Lấy đối tượng hình ảnh với class tương ứng
    //     var images = document.querySelectorAll('.preview-img-detail-' + i);
        
    //     // Thêm sự kiện cho mỗi hình ảnh
    //     images.forEach(function(imgDefault) {
    //     imgDefault.id = imgDefault.getAttribute('id');
    //     console.log("imgDefault: ", imgDefault.id);
    //     console.log("imgDefault.src", imgDefault.src);
        
    //     var defaultImgSrc = "data:image/png;base64,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";

    //     console.log(defaultImgSrc.includes(imgDefault.src));
    //     // Kiểm tra nếu các hình ảnh nhỏ có src mặc định, thì ẩn chúng
    //     if (imgDefault.src.includes(defaultImgSrc)) {
    //         imgDefault.setAttribute('style', 'display: none;');
    //         imgDefault.classList.add('hide-img');
    //         console.log("img", imgDefault);
    //         console.log("imgDefault.src", imgDefault.src);
    //     }
    //     });
    // }

    // Toggle hiển thị/ẩn đi tất cả các hàng chi tiết
    detailRows.forEach(function(detailRow) {
        if (detailRow.getAttribute('data-product-id') === productId) {
            if (detailRow.style.display === 'block') {
                detailRow.style.display = 'none';
            } else {
                detailRow.style.display = 'block';
            }
        } else {
            detailRow.style.display = 'none';
        } 
    });
}

// Lắng nghe sự kiện click vào các hàng dữ liệu
document.querySelectorAll('.table-row-data').forEach(function(row) {
    row.addEventListener('click', function() {
        // Lấy id của product
        var productId = this.getAttribute('data-product-id');

        // Toggle hiển thị/ẩn chi tiết dựa trên id của product
        toggleProductDetail(productId);
    });
});