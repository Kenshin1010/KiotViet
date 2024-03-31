// Close from add_employee.html to employee.html
function closeFromAddEmployeeToEmployee(closeId) {
    var closeButton = document.getElementById(closeId);
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            // Thực hiện các hành động cần thiết để đóng cửa sổ và trở về employee.html
            // Ví dụ:
            window.location.href = 'employee.html';
            // Hoặc:
            // window.history.back();
        });
    }
};

// // Fetch header.html and insert it into the header div
// fetch('employee.html')
// .then(response => response.text())
// .then(html => {
//     document.getElementById('sectionEmployee').innerHTML = html;
//     // Add event listener to the sectionEmployee button
//     document.getElementById('sectionEmployee').addEventListener('click', function() {
//         // Redirect to add_employee.html when the button is clicked
//         window.location.href = 'employee.html';
//     });
// })
// .catch(error => console.error('Error loading header:', error));