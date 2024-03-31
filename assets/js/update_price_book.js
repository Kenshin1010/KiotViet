var priceBookId = null;
var action = '';

// Lắng nghe sự kiện click trên tất cả các nút "Edit PriceBook"
document.querySelectorAll('.general-price-book-input').forEach(function(inputPriceBook) {
    inputPriceBook.addEventListener('focus', function(event) {
        var clickedElement = event.currentTarget;
        clickedElement.setAttribute('data-action', 'editPriceBook');
        action = clickedElement.getAttribute('data-action');
        console.log("Current action:", action);
    
        var productId = clickedElement.getAttribute('data-product-id');
        console.log("productId:", productId);

        priceBookId = productId;
        console.log("priceBookId nhận được khi click inputPriceBook cập nhật: ", priceBookId);

        // Sử dụng Number.toLocaleString để chuyển đổi số thành chuỗi với định dạng có dấu phẩy
        var inputPriceBookId = this.id;
        console.log("inputPriceBookId: ", inputPriceBookId);
        console.log("inputPriceBook.id:", inputPriceBook.id);
        console.log("inputPriceBook: ", inputPriceBook);

         // Sử dụng Number.toLocaleString để chuyển đổi số thành chuỗi với định dạng có dấu phẩy
        document.getElementById(this.id).addEventListener("input", function() {
            formatInputValue(this.id);
        });
        
        var inputPriceBookEdit = inputPriceBook.value;
        document.getElementById("priceBookMethod").value = inputPriceBookEdit;
            
        editPriceBookForm(event, productId);
        handleTabSwitching(event, productId);

        // // Lắng nghe sự kiện khi giá trị trong input thay đổi
        // var inputPriceBook = document.getElementById("priceBookAttribute");
        // var priceBookMethodInput = document.getElementById("priceBookMethod");
        // inputPriceBook.addEventListener("input", function() {
        //     performCalculation(inputPriceBook.value, priceBookMethodInput.value);
        // });
        // priceBookMethodInput.addEventListener("input", function() {
        //     performCalculation(inputPriceBook.value, priceBookMethodInput.value);
        // });
    });
});

function editPriceBookForm(event, elementId) {
    console.log("productId: ", elementId);
    // Tìm phần tử tr.table-row-data-price-book có cùng data-product-id
    var targetRow = document.querySelector('tr.table-row-data-price-book[data-product-id="' + elementId + '"]');
    if (targetRow) {
        // Lấy vị trí top và left của targetRow
        var targetRect = targetRow.getBoundingClientRect();
        var targetTop = targetRect.top + window.scrollY;
        var targetLeft = targetRect.left + window.scrollX;

        // Đặt lại thuộc tính top và left của phần tử .add-update-price-book
        var addUpdatePriceBook = document.querySelector(".add-update-price-book");
        addUpdatePriceBook.style.position = "absolute";
        addUpdatePriceBook.style.top = targetTop + "px";
        addUpdatePriceBook.style.left = targetLeft + "px"; // Để tạo khoảng cách bên trái lùi lại 100px so với tr
        addUpdatePriceBook.style.right = "auto"; // Đặt lại thuộc tính left thành 'auto'
        addUpdatePriceBook.style.display = "block";

        // Gọi hàm focusOnInput đã được định nghĩa
        // focusOnInput("priceBookMethod");

        // Format lại number cho input
         // Sử dụng Number.toLocaleString để chuyển đổi số thành chuỗi với định dạng có dấu phẩy
        document.getElementById("priceBookMethod").addEventListener("input", function() {
            formatInputValue("priceBookMethod");
        }); 

        } else {
        console.error("Không tìm thấy phần tử tr.table-row-data-price-book có data-product-id tương ứng.");
    }
}

// Hàm handleTabSwitching cần được định nghĩa riêng trong code của bạn
function handleTabSwitching(event, elementId) {
    // Lấy giá trị từ input#priceBookMethod
    var priceBookMethodInput = document.getElementById("priceBookMethod");
    var newValue = priceBookMethodInput.value;
    
    // Cập nhật giá trị mới vào span#priceUpdateForm
    var priceUpdateFormSpan = document.getElementById("priceUpdateForm");
    priceUpdateFormSpan.textContent = newValue;

    document.getElementById("priceUpdateForm").addEventListener("input", function() {
        formatInputValue("priceUpdateForm");
    });
    
    // Code xử lý tab switching
    // Lắng nghe sự kiện click trên button#acceptPriceBookUpdate
    document.getElementById('acceptPriceBookUpdate').addEventListener('click', function() {
        
        // Cập nhật giá trị mới vào input giá chung đang focus trong table
        // document.querySelector('.general-price-book-input[data-product-id="' + elementId + '"]').value = newValue;
        
        // Đóng form update khi thực hiện lưu data
        var addUpdatePriceBook = document.querySelector(".add-update-price-book");
            addUpdatePriceBook.style.display = "none";

    // Hiển thị thông báo hoặc thực hiện các hành động khác tùy thuộc vào việc cập nhật giá trị
    // Ví dụ: Gửi yêu cầu cập nhật đến máy chủ, lưu trữ dữ liệu, vv.
});
}