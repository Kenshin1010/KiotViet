// Cell Check
// Lắng nghe sự kiện khi người dùng thay đổi trạng thái của các checkbox trong .cell-check
document.querySelectorAll('.cell-check input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
        updateSelectedCountProduct();
        updateCheckAllProductState();
    });
});

// Hàm cập nhật số lượng .cell-check được chọn
function updateSelectedCountProduct() {
    var selectedCountProduct = 0;
    var cellCheckCheckboxes = document.querySelectorAll('.cell-check input[type="checkbox"]');
    
    // Đếm số lượng checkbox được chọn
    cellCheckCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedCountProduct++;
        }
    });

    // Hiển thị số lượng .cell-check được chọn lên màn hình
    var selectedCountProductElement = document.getElementById("selectedCountProduct");
    selectedCountProductElement.textContent = selectedCountProduct;

    // Kiểm tra và điều chỉnh hiển thị của .choosed-items
    toggleChoosedItemsVisibility();
}

// Lắng nghe sự kiện khi trang được load
window.addEventListener("load", function() {
    // Cập nhật số lượng .cell-check được chọn khi trang được load
    updateSelectedCountProduct();
});

// Lắng nghe sự kiện khi người dùng thay đổi trạng thái của checkbox "checkAllProduct"
document.getElementById("checkAllProduct").addEventListener("change", function() {
    var checkAllProductCheckbox = document.getElementById("checkAllProduct");
    var cellCheckCheckboxes = document.querySelectorAll('.cell-check input[type="checkbox"]');
    
    // Cập nhật trạng thái của tất cả các checkbox trong .cell-check dựa trên trạng thái của checkbox "checkAllProduct"
    cellCheckCheckboxes.forEach(function(checkbox) {
        checkbox.checked = checkAllProductCheckbox.checked;
    });

    // Cập nhật số lượng .cell-check được chọn
    updateSelectedCountProduct();
});

// Hàm cập nhật trạng thái của checkbox "checkAllProduct" dựa trên trạng thái của tất cả các checkbox trong .cell-check
function updateCheckAllProductState() {
    var checkAllProductCheckbox = document.getElementById("checkAllProduct");
    var cellCheckCheckboxes = document.querySelectorAll('.cell-check input[type="checkbox"]');
    var countChecked = 0;

    // Đếm số lượng checkbox được chọn
    cellCheckCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            countChecked++;
        }
    });

    // Cập nhật trạng thái của checkbox "checkAllProduct"
    if (countChecked === cellCheckCheckboxes.length) {
        checkAllProductCheckbox.checked = true;
    } else if (countChecked === 0) {
        checkAllProductCheckbox.checked = false;
    } else {
        checkAllProductCheckbox.checked = false; // Chỉ cần một checkbox không được chọn, #checkAllProduct cũng sẽ không được chọn
    }
}

// Hàm kiểm tra và điều chỉnh hiển thị của .choosed-items
function toggleChoosedItemsVisibility() {
    var selectedCountProductElement = document.getElementById("selectedCountProduct");
    var selectedCountProduct = parseInt(selectedCountProductElement.textContent.trim());
    
    // Nếu selectedCountProduct khác 0, hiển thị .choosed-items, ngược lại ẩn đi
    if (selectedCountProduct !== 0) {
        document.querySelector('.choosed-items').style.display = "flex";
        document.getElementById('showBtnOperationProduct').style.display = 'flex';
    } else {
        document.querySelector('.choosed-items').style.display = "none";
        document.getElementById('showBtnOperationProduct').style.display = 'none';
    }
}

// Lắng nghe sự kiện khi người dùng click vào nút đóng
document.getElementById("btnIconCloseProduct").addEventListener("click", function() {
    hideChoosedItems();
});

// Lắng nghe sự kiện khi người dùng click vào nút xóa
document.getElementById("btnOperationRemoveProduct").addEventListener("click", function() {
    // Hiện hộp thoại div.remove-row-table
    showDiv("btnOperationRemoveProduct", ".remove-row-table");
});

document.getElementById("removeRowTableProduct").addEventListener("click", function(event) {
    // Khai báo một mảng để lưu các productId cần xóa khỏi localStorage
    var deletedProductIds = [];
    
    // Kiểm tra xem người dùng đã click vào nút xác nhận chưa
    // Lấy tất cả các checkbox trong .cell-check
    var cellCheckCheckboxes = document.querySelectorAll('.cell-check input[type="checkbox"]');
    
    // Duyệt qua từng checkbox để kiểm tra xem có checkbox nào được chọn không
    cellCheckCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            // Nếu checkbox được chọn, tìm và xóa hàng chứa nó
            var row = checkbox.closest(".table-row-data");
            var productId = row.getAttribute('data-product-id');
            row.remove();

            // Xóa cả .row-detail có cùng data-product-id
            var detailRow = document.querySelector('.row-detail[data-product-id="' + productId + '"]');
            if (detailRow) {
                detailRow.remove();
            }

            // Thêm productId vào mảng deletedProductIds
            deletedProductIds.push(productId);
        }
    });

    // Xóa nhân viên khỏi mảng productList
    var productList = getProductListLocalStorage();
    productList = productList.filter(function(product) {
        return !deletedProductIds.includes(product.id);
    });

    // Cập nhật lại danh sách nhân viên trong localStorage
    localStorage.setItem('productList', JSON.stringify(productList));

    // Ẩn hộp thoại div.remove-row-table sau khi thực hiện xong
    hideDiv("btnOperationRemoveProduct", ".remove-row-table");

    // Sau khi xóa, cập nhật lại số lượng .cell-check được chọn và hiển thị/ẩn nút thao tác
    hideChoosedItems();
});

// Hàm ẩn hộp thoại
function hideDiv(btnOperationId, divClassName) {
    // Ẩn div
    document.querySelector(divClassName).style.display = "none";

    // Enable background
    document.getElementById(btnOperationId).removeAttribute("disabled");
}

// Hàm ẩn .choosed-items khi click vào #btnIconCloseProduct và bỏ tất cả checked để không có nhân viên nào được chọn
function hideChoosedItems() {
    // Ẩn .choosed-items
    document.querySelector('.choosed-items').style.display = "none";

    // Bỏ chọn tất cả checkbox trong .cell-check
    var cellCheckCheckboxes = document.querySelectorAll('.cell-check input[type="checkbox"]');
    cellCheckCheckboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });

    // Cập nhật số lượng .cell-check được chọn
    updateSelectedCountProduct();

    // Đặt trạng thái của #checkAllProduct thành checked:none
    document.getElementById("checkAllProduct").checked = false;
}

