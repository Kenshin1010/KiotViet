// Cell Check
// Lắng nghe sự kiện khi người dùng thay đổi trạng thái của các checkbox trong .cell-check
document.querySelectorAll('.cell-check input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
        updateSelectedCount();
        updateCheckAllState();
    });
});

// Hàm cập nhật số lượng .cell-check được chọn
function updateSelectedCount() {
    var selectedCount = 0;
    var cellCheckCheckboxes = document.querySelectorAll('.cell-check input[type="checkbox"]');
    
    // Đếm số lượng checkbox được chọn
    cellCheckCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedCount++;
        }
    });

    // Hiển thị số lượng .cell-check được chọn lên màn hình
    var selectedCountElement = document.getElementById("selectedCount");
    selectedCountElement.textContent = selectedCount;

    // Kiểm tra và điều chỉnh hiển thị của .choosed-items
    toggleChoosedItemsVisibility();
}

// Lắng nghe sự kiện khi trang được load
window.addEventListener("load", function() {
    // Cập nhật số lượng .cell-check được chọn khi trang được load
    updateSelectedCount();
});

// Lắng nghe sự kiện khi người dùng thay đổi trạng thái của checkbox "checkAll"
document.getElementById("checkAll").addEventListener("change", function() {
    var checkAllCheckbox = document.getElementById("checkAll");
    var cellCheckCheckboxes = document.querySelectorAll('.cell-check input[type="checkbox"]');
    
    // Cập nhật trạng thái của tất cả các checkbox trong .cell-check dựa trên trạng thái của checkbox "checkAll"
    cellCheckCheckboxes.forEach(function(checkbox) {
        checkbox.checked = checkAllCheckbox.checked;
    });

    // Cập nhật số lượng .cell-check được chọn
    updateSelectedCount();
});

// Hàm cập nhật trạng thái của checkbox "checkAll" dựa trên trạng thái của tất cả các checkbox trong .cell-check
function updateCheckAllState() {
    var checkAllCheckbox = document.getElementById("checkAll");
    var cellCheckCheckboxes = document.querySelectorAll('.cell-check input[type="checkbox"]');
    var countChecked = 0;

    // Đếm số lượng checkbox được chọn
    cellCheckCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            countChecked++;
        }
    });

    // Cập nhật trạng thái của checkbox "checkAll"
    if (countChecked === cellCheckCheckboxes.length) {
        checkAllCheckbox.checked = true;
    } else if (countChecked === 0) {
        checkAllCheckbox.checked = false;
    } else {
        checkAllCheckbox.checked = false; // Chỉ cần một checkbox không được chọn, #checkAll cũng sẽ không được chọn
    }
}

// Hàm kiểm tra và điều chỉnh hiển thị của .choosed-items
function toggleChoosedItemsVisibility() {
    var selectedCountElement = document.getElementById("selectedCount");
    var selectedCount = parseInt(selectedCountElement.textContent.trim());
    
    // Nếu selectedCount khác 0, hiển thị .choosed-items, ngược lại ẩn đi
    if (selectedCount !== 0) {
        document.querySelector('.choosed-items').style.display = "flex";
        document.getElementById('showBtnOperation').style.display = 'flex';
    } else {
        document.querySelector('.choosed-items').style.display = "none";
        document.getElementById('showBtnOperation').style.display = 'none';
    }
}

// Lắng nghe sự kiện khi người dùng click vào nút đóng
document.getElementById("btnIconClose").addEventListener("click", function() {
    hideChoosedItems();
});

// Lắng nghe sự kiện khi người dùng click vào nút xóa
document.getElementById("btnOperation").addEventListener("click", function() {
    // Hiện hộp thoại div.remove-row-table
    showDiv("btnOperation", ".remove-row-table");
});

document.getElementById("removeRowTable").addEventListener("click", function(event) {
    // Khai báo một mảng để lưu các employeeId cần xóa khỏi localStorage
    var deletedEmployeeIds = [];
    
    // Kiểm tra xem người dùng đã click vào nút xác nhận chưa
    // Lấy tất cả các checkbox trong .cell-check
    var cellCheckCheckboxes = document.querySelectorAll('.cell-check input[type="checkbox"]');
    
    // Duyệt qua từng checkbox để kiểm tra xem có checkbox nào được chọn không
    cellCheckCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            // Nếu checkbox được chọn, tìm và xóa hàng chứa nó
            var row = checkbox.closest(".table-row-data");
            var employeeId = row.getAttribute('data-employee-id');
            row.remove();

            // Xóa cả .row-detail có cùng data-employee-id
            var detailRow = document.querySelector('.row-detail[data-employee-id="' + employeeId + '"]');
            if (detailRow) {
                detailRow.remove();
            }

            // Thêm employeeId vào mảng deletedEmployeeIds
            deletedEmployeeIds.push(employeeId);
        }
    });

    // Xóa nhân viên khỏi mảng employeeList
    var employeeList = getEmployeeListLocalStorage();
    employeeList = employeeList.filter(function(employee) {
        return !deletedEmployeeIds.includes(employee.id);
    });

    // Cập nhật lại danh sách nhân viên trong localStorage
    localStorage.setItem('employeeList', JSON.stringify(employeeList));

    // Ẩn hộp thoại div.remove-row-table sau khi thực hiện xong
    hideDiv("btnOperation", ".remove-row-table");

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

// Hàm ẩn .choosed-items khi click vào #btnIconClose và bỏ tất cả checked để không có nhân viên nào được chọn
function hideChoosedItems() {
    // Ẩn .choosed-items
    document.querySelector('.choosed-items').style.display = "none";

    // Bỏ chọn tất cả checkbox trong .cell-check
    var cellCheckCheckboxes = document.querySelectorAll('.cell-check input[type="checkbox"]');
    cellCheckCheckboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });

    // Cập nhật số lượng .cell-check được chọn
    updateSelectedCount();

    // Đặt trạng thái của #checkAll thành checked:none
    document.getElementById("checkAll").checked = false;
}

