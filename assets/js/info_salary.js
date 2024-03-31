function handleTabSwitching() {
    var infoLink = document.querySelector('.active-info-employee');
    var salaryLink = document.querySelector('.active-salary-setting');
    var infoDiv = document.querySelector('.tab-content');
    var salaryDiv = document.querySelector('.set-salary');

    // Mặc định hiển thị tab thông tin
    infoDiv.style.display = 'block';
    salaryDiv.style.display = 'none';
    infoLink.classList.add('active');
    infoLink.classList.remove('remove-active');
    salaryLink.classList.add('remove-active');
    salaryLink.classList.remove('active');

    // Xử lý sự kiện click cho tab thông tin
    infoLink.addEventListener('click', function(event) {
        event.preventDefault();
        infoDiv.style.display = 'block';
        salaryDiv.style.display = 'none';
        infoLink.classList.add('active');
        infoLink.classList.remove('remove-active');
        salaryLink.classList.add('remove-active');
        salaryLink.classList.remove('active');
    });

    // Xử lý sự kiện click cho tab thiết lập lương
    salaryLink.addEventListener('click', function(event) {
        event.preventDefault();
        infoDiv.style.display = 'none';
        salaryDiv.style.display = 'block';
        infoLink.classList.add('remove-active');
        infoLink.classList.remove('active');
        salaryLink.classList.add('active');
        salaryLink.classList.remove('remove-active');
    });
}

document.addEventListener('DOMContentLoaded', handleTabSwitching);