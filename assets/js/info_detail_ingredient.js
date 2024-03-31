document.addEventListener('DOMContentLoaded', function() {
    var infoLink = document.querySelector('.active-info-product');
    var detailLink = document.querySelector('.active-detail-product');
    var ingredientLink = document.querySelector('.active-ingredient-product');
    var infoDiv = document.querySelector('.tab-content-form-product');
    var detailDiv = document.querySelector('.detail-product');
    var ingredientDiv = document.querySelector('.ingredient-product');

    // Mặc định hiển thị tab thông tin
    infoDiv.style.display = 'block';
    detailDiv.style.display = 'none';
    ingredientDiv.style.display = 'none';
    infoLink.classList.add('active');
    infoLink.classList.remove('remove-active');
    detailLink.classList.add('remove-active');
    detailLink.classList.remove('active');
    ingredientLink.classList.add('remove-active');
    ingredientLink.classList.remove('active');

    // Xử lý sự kiện click cho tab thông tin
    infoLink.addEventListener('click', function(event) {
        event.preventDefault();
        infoDiv.style.display = 'block';
        detailDiv.style.display = 'none';
        ingredientDiv.style.display = 'none';
        infoLink.classList.add('active');
        infoLink.classList.remove('remove-active');
        detailLink.classList.add('remove-active');
        detailLink.classList.remove('active');
        ingredientLink.classList.add('remove-active');
        ingredientLink.classList.remove('active');
    });

    // Xử lý sự kiện click cho tab thiết lập chi tiết
    detailLink.addEventListener('click', function(event) {
        event.preventDefault();
        infoDiv.style.display = 'none';
        detailDiv.style.display = 'block';
        ingredientDiv.style.display = 'none';
        infoLink.classList.add('remove-active');
        infoLink.classList.remove('active');
        detailLink.classList.add('active');
        detailLink.classList.remove('remove-active');
        ingredientLink.classList.add('remove-active');
        ingredientLink.classList.remove('active');
    });

    // Xử lý sự kiện click cho tab thiết lập thành phần
    ingredientLink.addEventListener('click', function(event) {
        event.preventDefault();
        infoDiv.style.display = 'none';
        detailDiv.style.display = 'none';
        ingredientDiv.style.display = 'block';
        infoLink.classList.add('remove-active');
        infoLink.classList.remove('active');
        detailLink.classList.add('remove-active');
        detailLink.classList.remove('active');
        ingredientLink.classList.add('active');
        ingredientLink.classList.remove('remove-active');
    });
});