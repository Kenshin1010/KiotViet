function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function () {
      var imageDataURL = reader.result;
      var preview = document.getElementById("previewImg");
      preview.src = imageDataURL;
      preview.style.display = "block";
      var hidden = document.getElementById("wrapImgIcon");
      hidden.style.display = "none";
  };
  reader.readAsDataURL(event.target.files[0]);
}

 // Lắng nghe sự kiện khi input file thay đổi
document.getElementById('uploadBtn').addEventListener('change', function() {
    // Hiển thị thông báo "Uploading" khi bắt đầu upload
    var uploadingStatus = document.querySelector('.upload-status');
    uploadingStatus.textContent = 'Uploading...';

    // Lấy tên của file được chọn
    var fileName = this.files[0].name;

    // Giả sử upload thành công sau một khoảng thời gian nhất định
    setTimeout(function() {
        // Hiển thị thông báo "Done" cùng với tên của hình ảnh
        uploadingStatus.innerHTML = 'Done <i class="fas fa-solid fa-check"></i>';
        uploadingStatus.innerHTML += ' - ' + fileName;
    }, 3000); // Giả sử upload thành công sau 3 giây
});