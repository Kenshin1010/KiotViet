// Fetch header.html and insert it into the header div
fetch('index.html')
.then(response => response.text())
.then(html => {
    document.getElementById('mainHeader').innerHTML = html;
    // document.getElementById('homePage').addEventListener('click', function() {
    //     // Redirect to add_employee.html when the button is clicked
    //     window.location.href = 'main_header.html';});
})
.catch(error => console.error('Error loading header:', error)); 