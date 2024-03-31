// Biến toàn cục để lưu ID của position cần xóa
var positionIdToRemove = null;

document.addEventListener("DOMContentLoaded", function () {
    var editButtons = document.querySelectorAll(".edit-position");

    editButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Lấy ID của nút được nhấp
            var buttonId = button.id;
            console.log("Pen Button ID:", buttonId);

            var positionId = findPositionIdByEditIconId(buttonId);
            var position = getPositionById(positionId);
            console.log("position find from button pen: ", position);

            if (position) {
                // Nếu tìm thấy chức danh, hiển thị thông tin và chỉnh sửa
                showEditPosition(position);

                // Thêm xử lý sự kiện cho nút "Lưu"
                var saveButton = document.getElementById("btnSavePositionEdit");
                saveButton.addEventListener("click", function () {
                    // Lấy thông tin từ các trường nhập liệu trong form chỉnh sửa
                    var nameInput = document.getElementById("positionNameEdit").value;
                    var descTextarea = document.getElementById("positionDescEdit").value;
                    var statusRadioActive = document.getElementById("positionActiveEdit").checked;
                    var status = statusRadioActive ? "Hoạt động" : "Ngừng hoạt động";

                    // Tạo một đối tượng mới chứa thông tin chỉnh sửa của chức danh
                    var editedPosition = {
                        name: nameInput,
                        desc: descTextarea,
                        status: status
                    };

                    // Cập nhật thông tin chức danh trong danh sách chức danh
                    updatePositionInList(positionId, editedPosition);
                    


                    //  Đóng hộp thoại sửa xóa position
            var removePositionDialog = document.querySelector(".add-edit-position");
            removePositionDialog.style.display = "none";

                });

                // Thêm xử lý sự kiện cho nút "Xóa"
                var showRemovePositionButton = document.getElementById("showRemovePosition");
                showRemovePositionButton.addEventListener("click", function () {
                    // Hiển thị hộp thoại xác nhận xóa position
                    var removePositionDialog = document.querySelector(".add-remove-position");
                    removePositionDialog.style.display = "block";
                });

                // Lắng nghe sự kiện click vào nút xác nhận xóa position
                var acceptRemovePositionButton = document.getElementById("acceptPositionRemove");
                acceptRemovePositionButton.addEventListener("click", function () {
                    // Lấy ID của position cần xóa
                    var positionIdToRemove = positionId;// Lấy ID của position cần xóa từ nơi bạn lưu trữ, chẳng hạn từ một phần tử trong DOM hoặc từ một biến khác

                        // Gọi hàm xóa position
                        removePositionFromList(positionIdToRemove);

                        // Đặt lại giá trị của positionIdToRemove về null để sử dụng lại
            positionIdToRemove = null;

                    // Đóng hộp thoại xác nhận xóa position
                    var removePositionDialog = document.querySelector(".add-remove-position");
                    removePositionDialog.style.display = "none";

    // Reload lại trang sau khi xóa dữ liệu thành công
    // location.reload();

                });

            } else {
                console.log("Không tìm thấy thông tin chức danh với ID:", buttonId);
            }
        });
    });
    

});

function findPositionIdByEditIconId(editIconId) {
    var editIcon = document.getElementById(editIconId);
    if (editIcon) {
        var listItem = editIcon.parentElement; // Lấy phần tử li chứa biểu tượng chỉnh sửa
        if (listItem) {
            var positionId = listItem.id; // Lấy id của phần tử li
            console.log("position ID:", positionId);
            return positionId; // Trả về id của phần tử li
        } else {
            console.log("Không tìm thấy phần tử li chứa biểu tượng chỉnh sửa.");
            return null;
        }
    } else {
        console.log("Không tìm thấy biểu tượng chỉnh sửa có id:", editIconId);
        return null;
    }
}

function showEditPosition(position) {
    // Lấy thông tin của chức danh
    var positionName = position.name;
    var positionDesc = position.desc;
    var positionStatus = position.status;

    // Cập nhật giao diện chỉnh sửa thông tin chức danh
    var nameInput = document.getElementById("positionNameEdit");
    var descTextarea = document.getElementById("positionDescEdit");
    var statusRadioActive = document.getElementById("positionActiveEdit");
    var statusRadioInactive = document.getElementById("positionInactiveEdit");

    nameInput.value = positionName;
    descTextarea.value = positionDesc;

    // Kiểm tra trạng thái của chức danh và kiểm tra radio tương ứng
    if (positionStatus === "Hoạt động") {
        statusRadioActive.checked = true;
    } else if (positionStatus === "Ngừng hoạt động") {
        statusRadioInactive.checked = true;
    }

    // Hiển thị bảng chỉnh sửa thuộc tính
    var addEditPosition = document.querySelector(".add-edit-position");
    addEditPosition.style.display = "block";
}


// Save
function updatePositionInList(positionId, editedPosition) {
    // Lấy danh sách chức danh từ Local Storage
    var positionList = JSON.parse(localStorage.getItem("positionList"));

    // Tìm chức danh có ID tương ứng và cập nhật thông tin
    for (var i = 0; i < positionList.length; i++) {
        if (positionList[i].id === positionId) {
            positionList[i].name = editedPosition.name;
            positionList[i].desc = editedPosition.desc;
            positionList[i].status = editedPosition.status;
            break; // Dừng vòng lặp sau khi cập nhật thông tin
        }
    }

    console.log("position ID: ", positionId);
    console.log("Update information: ", editedPosition);
    console.log("position List updated: ", positionList);


    // Lưu danh sách chức danh đã cập nhật vào Local Storage
    localStorage.setItem("positionList", JSON.stringify(positionList));

    // alert("Sửa chức danh thành công");
    toast({
        type:'success',
        message:'Sửa chức danh thành công',
        duration:1000
      });


    // Reload lại trang sau khi sửa dữ liệu thành công
    // location.reload();
}

// Remove


// Hàm xóa position khỏi danh sách
function removePositionFromList(positionId) {
    // Lấy danh sách chức danh từ Local Storage
    var positionList = JSON.parse(localStorage.getItem("positionList"));

    // Tìm vị trí của position cần xóa trong danh sách
    var indexToRemove = -1;
    for (var i = 0; i < positionList.length; i++) {
        if (positionList[i].id === positionId) {
            indexToRemove = i;
            break;
        }
    }

    // Nếu tìm thấy vị trí của position, thực hiện xóa
    if (indexToRemove !== -1) {
        positionList.splice(indexToRemove, 1); // Xóa position khỏi danh sách
        // Lưu danh sách chức danh đã cập nhật vào Local Storage
        localStorage.setItem("positionList", JSON.stringify(positionList));
        console.log("position removed:", positionId);
    } else {
        console.log("Không tìm thấy chức danh có ID:", positionId);
    }
    // alert("Xóa chức danh thành công");
    toast({
        type:'success',
        message:'Xóa chức danh thành công',
        duration:1000
      });
}