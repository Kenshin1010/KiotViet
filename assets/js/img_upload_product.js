  function previewImageProduct(event, previewId) {
    var reader = new FileReader();
    reader.onload = function () {
        var imageDataURL = reader.result;
        var preview = document.getElementById(previewId);
        preview.src = imageDataURL;
        preview.style.display = "block";
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Lắng nghe sự kiện khi input file thay đổi cho các nút upload tương ứng
document.getElementById('uploadBtn1').addEventListener('change', function() {
    previewImageProduct(event, 'previewImg1');
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

document.getElementById('uploadBtn2').addEventListener('change', function() {
    previewImageProduct(event, 'previewImg2');
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

document.getElementById('uploadBtn3').addEventListener('change', function() {
    previewImageProduct(event, 'previewImg3');
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

document.getElementById('uploadBtn4').addEventListener('change', function() {
    previewImageProduct(event, 'previewImg4');
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

document.getElementById('uploadBtn5').addEventListener('change', function() {
    previewImageProduct(event, 'previewImg5');
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