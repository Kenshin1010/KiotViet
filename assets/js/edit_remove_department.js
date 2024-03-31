// Biến toàn cục để lưu ID của department cần xóa
var departmentIdToRemove = null;

document.addEventListener("DOMContentLoaded", function () {
    var editButtons = document.querySelectorAll(".edit-department");

    editButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Lấy ID của nút được nhấp
            var buttonId = button.id;
            console.log("Pen Button ID:", buttonId);

            var departmentId = findDepartmentIdByEditIconId(buttonId);
            var department = getDepartmentById(departmentId);
            console.log("Department find from button pen: ", department);

            if (department) {
                // Nếu tìm thấy phòng ban, hiển thị thông tin và chỉnh sửa
                showEditDepartment(department);

                // Thêm xử lý sự kiện cho nút "Lưu"
                var saveButton = document.getElementById("btnSaveDepartmentEdit");
                saveButton.addEventListener("click", function () {
                    // Lấy thông tin từ các trường nhập liệu trong form chỉnh sửa
                    var nameInput = document.getElementById("departmentNameEdit").value;
                    var descTextarea = document.getElementById("departmentDescEdit").value;
                    var statusRadioActive = document.getElementById("departmentActiveEdit").checked;
                    var status = statusRadioActive ? "Hoạt động" : "Ngừng hoạt động";

                    // Tạo một đối tượng mới chứa thông tin chỉnh sửa của phòng ban
                    var editedDepartment = {
                        name: nameInput,
                        desc: descTextarea,
                        status: status
                    };

                    // Cập nhật thông tin phòng ban trong danh sách phòng ban
                    updateDepartmentInList(departmentId, editedDepartment);
                    


                    //  Đóng hộp thoại sửa xóa department
            var removeDepartmentDialog = document.querySelector(".add-edit-department");
            removeDepartmentDialog.style.display = "none";

                });

                // Thêm xử lý sự kiện cho nút "Xóa"
                var showRemoveDepartmentButton = document.getElementById("showRemoveDepartment");
                showRemoveDepartmentButton.addEventListener("click", function () {
                    // Hiển thị hộp thoại xác nhận xóa department
                    var removeDepartmentDialog = document.querySelector(".add-remove-department");
                    removeDepartmentDialog.style.display = "block";
                });

                // Lắng nghe sự kiện click vào nút xác nhận xóa department
                var acceptRemoveDepartmentButton = document.getElementById("acceptDepartmentRemove");
                acceptRemoveDepartmentButton.addEventListener("click", function () {
                    // Lấy ID của department cần xóa
                    var departmentIdToRemove = departmentId;// Lấy ID của department cần xóa từ nơi bạn lưu trữ, chẳng hạn từ một phần tử trong DOM hoặc từ một biến khác

                        // Gọi hàm xóa department
                        removeDepartmentFromList(departmentIdToRemove);

                        // Đặt lại giá trị của departmentIdToRemove về null để sử dụng lại
            departmentIdToRemove = null;

                    // Đóng hộp thoại xác nhận xóa department
                    var removeDepartmentDialog = document.querySelector(".add-remove-department");
                    removeDepartmentDialog.style.display = "none";

    // Reload lại trang sau khi xóa dữ liệu thành công
    // location.reload();

                });

            } else {
                console.log("Không tìm thấy thông tin phòng ban với ID:", buttonId);
            }
        });
    });
    

});

function findDepartmentIdByEditIconId(editIconId) {
    var editIcon = document.getElementById(editIconId);
    if (editIcon) {
        var listItem = editIcon.parentElement; // Lấy phần tử li chứa biểu tượng chỉnh sửa
        if (listItem) {
            var departmentId = listItem.id; // Lấy id của phần tử li
            console.log("Department ID:", departmentId);
            return departmentId; // Trả về id của phần tử li
        } else {
            console.log("Không tìm thấy phần tử li chứa biểu tượng chỉnh sửa.");
            return null;
        }
    } else {
        console.log("Không tìm thấy biểu tượng chỉnh sửa có id:", editIconId);
        return null;
    }
}

function showEditDepartment(department) {
    // Lấy thông tin của phòng ban
    var departmentName = department.name;
    var departmentDesc = department.desc;
    var departmentStatus = department.status;

    // Cập nhật giao diện chỉnh sửa thông tin phòng ban
    var nameInput = document.getElementById("departmentNameEdit");
    var descTextarea = document.getElementById("departmentDescEdit");
    var statusRadioActive = document.getElementById("departmentActiveEdit");
    var statusRadioInactive = document.getElementById("departmentInactiveEdit");

    nameInput.value = departmentName;
    descTextarea.value = departmentDesc;

    // Kiểm tra trạng thái của phòng ban và kiểm tra radio tương ứng
    if (departmentStatus === "Hoạt động") {
        statusRadioActive.checked = true;
    } else if (departmentStatus === "Ngừng hoạt động") {
        statusRadioInactive.checked = true;
    }

    // Hiển thị bảng chỉnh sửa thuộc tính
    var addEditDepartment = document.querySelector(".add-edit-department");
    addEditDepartment.style.display = "block";
}


// Save
function updateDepartmentInList(departmentId, editedDepartment) {
    // Lấy danh sách phòng ban từ Local Storage
    var departmentList = JSON.parse(localStorage.getItem("departmentList"));

    // Tìm phòng ban có ID tương ứng và cập nhật thông tin
    for (var i = 0; i < departmentList.length; i++) {
        if (departmentList[i].id === departmentId) {
            departmentList[i].name = editedDepartment.name;
            departmentList[i].desc = editedDepartment.desc;
            departmentList[i].status = editedDepartment.status;
            break; // Dừng vòng lặp sau khi cập nhật thông tin
        }
    }

    console.log("Department ID: ", departmentId);
    console.log("Update information: ", editedDepartment);
    console.log("Department List updated: ", departmentList);


    // Lưu danh sách phòng ban đã cập nhật vào Local Storage
    localStorage.setItem("departmentList", JSON.stringify(departmentList));

    // alert("Sửa phòng ban thành công");
    toast({
        type:'success',
        message:'Sửa phòng ban thành công',
        duration:1000
      });

    // Reload lại trang sau khi sửa dữ liệu thành công
    // location.reload();
}

// Remove


// Hàm xóa department khỏi danh sách
function removeDepartmentFromList(departmentId) {
    // Lấy danh sách phòng ban từ Local Storage
    var departmentList = JSON.parse(localStorage.getItem("departmentList"));

    // Tìm vị trí của department cần xóa trong danh sách
    var indexToRemove = -1;
    for (var i = 0; i < departmentList.length; i++) {
        if (departmentList[i].id === departmentId) {
            indexToRemove = i;
            break;
        }
    }

    // Nếu tìm thấy vị trí của department, thực hiện xóa
    if (indexToRemove !== -1) {
        departmentList.splice(indexToRemove, 1); // Xóa department khỏi danh sách
        // Lưu danh sách phòng ban đã cập nhật vào Local Storage
        localStorage.setItem("departmentList", JSON.stringify(departmentList));
        console.log("Department removed:", departmentId);
    } else {
        console.log("Không tìm thấy phòng ban có ID:", departmentId);
    }
    // alert("Xóa phòng ban thành công");
    toast({
        type:'success',
        message:'Xóa phòng ban thành công',
        duration:1000
      });
}