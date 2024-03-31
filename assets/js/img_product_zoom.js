// Biến global để lưu trữ hình ảnh đang được chọn
var currentSelectedImage = null;

// Function để thêm sự kiện click cho các hình ảnh .preview-img-detail-1 đến .preview-img-detail-5
function addClickListenerToImages() {
  // Lặp qua từng số để xử lý các hình ảnh tương ứng
  for (var i = 1; i <= 5; i++) {
      // Lấy đối tượng hình ảnh với class tương ứng
      var images = document.querySelectorAll('.preview-img-detail-' + i);
      
      // Thêm sự kiện click cho mỗi hình ảnh
      images.forEach(function(img) {
          img.addEventListener('click', function() {
              // Lấy id của hình ảnh được click
              var dynamicId = this.id;
              console.log("Id của image đang đặt ở zoomImage: ", dynamicId);

              // Lấy productId từ thuộc tính data-product-id của hình ảnh được click
              var productId = this.getAttribute('data-product-id');
              
              // Lấy src của hình ảnh được click
              var srcCurrentImg = this.src;
              
              // Lấy ra hình ảnh chính (có id là 'previewImgZoom')
              var zoomImage = document.querySelector('.preview-img-detail-large[data-product-id="' + productId + '"]');
              console.log("Id của zoomImage lúc này là: ", zoomImage.id);

              // Nếu đã có một hình ảnh được chọn trước đó, hãy xóa lớp 'active' của nó
              if (currentSelectedImage) {
                  currentSelectedImage.classList.remove('active-img');
              }
              
              // Thêm lớp 'active' cho hình ảnh được click
              this.classList.add('active-img');
              
              // Lưu trữ hình ảnh được chọn hiện tại
              currentSelectedImage = this;
              
              // Gán src của hình ảnh được click cho hình ảnh chính
              zoomImage.src = srcCurrentImg;
              
              // Hiển thị productId trong console (nếu cần)
              console.log('Product ID:', productId);
          });
      });
  }
}

// Thêm sự kiện cho các hình ảnh
addClickListenerToImages();