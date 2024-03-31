function handleCancelAddEmployee() {
    var preview = document.getElementById("previewImg");
    preview.src = '';
    preview.style.display = "none";
    var hidden = document.getElementById("wrapImgIcon");
    hidden.style.display = "block";

    document.getElementById("employeeCode").value = '';
    document.getElementById("employeeName").value = '';
    document.getElementById("phoneNumber").value = '';
    document.getElementById("salaryBranch").value = 'Chi nhánh trung tâm';
    document.getElementById("workingBranch").value = 'Chi nhánh trung tâm';
    document.getElementById("firstDay").value = '';
    document.getElementById("employeeDepartment").value = '';
    document.getElementById("employeePosition").value = '';
    document.getElementById("accountNumber").value = '';
    document.getElementById("employeeNote").value = '';
    document.getElementById("idCard").value = '';
    document.getElementById("dateOfBirth").value = '';
    document.getElementById("employeeGender").value = '';

    //  Kiểm tra trạng thái của nhân viên và kiểm tra radio tương ứng
    document.getElementById("employeeMale").checked = false;
    document.getElementById("employeeFemale").checked = false;

    document.getElementById("employeeAddress").value = '';
    document.getElementById("employeeArea").value = '';
    document.getElementById("employeeEmail").value = '';
    document.getElementById("communeWard").value = '';
    document.getElementById("employeeFacebook").value = '';
}

function resetAddEmployeeForm() {
  // Đặt lại trạng thái của các nút
  document.getElementById("addEmployeeButton").disabled = false;
  document.querySelectorAll(".btn-edit-employee").forEach(function (button) {
    button.disabled = false;
  });

  // Đặt lại trạng thái của form và các trường nhập liệu
  document.getElementById("addEmployee").removeEventListener('click', addEmployeeForm);
  document.getElementById("addEmployee").removeEventListener('click', editEmployeeForm);
  
  // Đặt lại action cho form
  document.getElementById("addEmployee").setAttribute("data-action", "");

  // Đóng form
  document.getElementById("addEmployee").style.display = "none";
}

// Hàm để ẩn phần tử addEmployee và xóa thuộc tính data-action của #addEmployeeButton
function hideAddEmployee() {
  handleCancelAddEmployee();
  resetAddEmployeeForm();
 
  // Xóa thuộc tính data-action của các phần tử button
document.getElementById("addEmployeeButton").removeAttribute("data-action");

// Loại bỏ sự kiện lắng nghe tương ứng với từng button
document.getElementById("addEmployeeButton").removeEventListener("click", addEmployeeButtonClickHandler);
}

// Hàm để ẩn phần tử addEmployee và xóa thuộc tính data-action của #addEmployeeButton
function hideEditEmployee() {
  handleCancelAddEmployee();
  resetAddEmployeeForm();
 
  // Xóa thuộc tính data-action của các nút "Edit Product"
  document.querySelectorAll(".btn-edit-employee").forEach(function (button) {
      button.removeAttribute("data-action");
  });

// Loại bỏ sự kiện lắng nghe tương ứng với từng button
document.querySelectorAll(".btn-edit-employee").forEach(function (button) {
  button.removeEventListener("click", editEmployeeButtonClickHandler);
});
}