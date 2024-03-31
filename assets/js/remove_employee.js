// Biến toàn cục để lưu ID của nhân viên cần xóa
var employeeIdToRemove = null;

document.addEventListener("DOMContentLoaded", function () {
    var removeButtons = document.querySelectorAll(".btn-remove-employee");

    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Lấy ID của nút được nhấp
            var buttonId = button.id;
            console.log("Trash Can Button ID:", buttonId);

            var employeeId = button.getAttribute('data-employee-id');
            console.log("Employee ID to remove:", employeeId);

            var employee = getEmployeeById(employeeId);
            console.log("Employee found from trash can button:", employee);

            if (employee) {
                // Lấy ID của nhân viên cần xóa
                employeeIdToRemove = employeeId;
                var divToShow = document.querySelector(".add-remove-employee");
                divToShow.style.display = 'block';
                showConfirmRemoveEmployeeDialog(employeeIdToRemove);
                employeeIdToRemove=null;
            } else {
                console.log("Không tìm thấy thông tin nhân viên với ID:", employeeId);
            }
        });
    });
});

function showConfirmRemoveEmployeeDialog(employeeId) {
    // Lắng nghe sự kiện click vào nút xác nhận xóa
    var acceptRemoveEmployeeButton = document.getElementById("acceptEmployeeRemove");
    acceptRemoveEmployeeButton.addEventListener("click", function () {
        // Xóa nhân viên từ danh sách
        removeEmployeeFromList(employeeId);

        // Ẩn hộp thoại xác nhận xóa
        var confirmationDialog = document.querySelector(".comfirmation-remove-employee");
        confirmationDialog.style.display = "none";

        var addRemoveEmployee = document.querySelector(".add-remove-employee");
        addRemoveEmployee.style.display = "none";
        // Reload lại trang sau khi xóa thành công
    // location.reload();
    });
}

// Hàm xóa nhân viên khỏi danh sách
function removeEmployeeFromList(employeeId) {
    // Lấy danh sách nhân viên từ Local Storage
    var employeeList = getEmployeeListLocalStorage();

    // Tìm vị trí của nhân viên cần xóa trong danh sách
    var indexToRemove = -1;
    for (var i = 0; i < employeeList.length; i++) {
        if (employeeList[i].id === employeeId) {
            indexToRemove = i;
            break;
        }
    }

    // Nếu tìm thấy vị trí của nhân viên, thực hiện xóa
    if (indexToRemove !== -1) {
        employeeList.splice(indexToRemove, 1); // Xóa nhân viên khỏi danh sách
        // Lưu danh sách nhân viên đã cập nhật vào Local Storage
        localStorage.setItem("employeeList", JSON.stringify(employeeList));
        console.log("Employee removed:", employeeId);
    // alert("Xóa nhân viên thành công");
    toast({
        type:'success',
        message:'Xóa nhân viên thành công',
        duration:1000
      });
    } else {
        console.log("Không tìm thấy nhân viên có ID:", employeeId);
    }
}