document.addEventListener('DOMContentLoaded', function() {
    var toTopButton = document.getElementById('toTop');

    // Lắng nghe sự kiện scroll trên cửa sổ
    window.addEventListener('scroll', function() {
        // Kiểm tra vị trí cuộn của trang
        if (window.pageYOffset > 10) { // Chỉnh số pixel tùy theo vị trí bạn muốn hiển thị nút
            // Nếu trang đã cuộn đủ xa, hiển thị nút #toTop
            toTopButton.style.display = 'block';
        } else {
            // Nếu không, ẩn nút #toTop
            toTopButton.style.display = 'none';
        }
    });

    // Lắng nghe sự kiện click trên nút #toTop
    toTopButton.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ 'a'

        // Sử dụng smooth scroll để kéo trang lên đầu
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});