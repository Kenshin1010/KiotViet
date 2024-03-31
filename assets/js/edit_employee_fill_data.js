// function fillEmployeeData(employeeId) {
//     // Lấy danh sách nhân viên từ localStorage
//     var employeeList = JSON.parse(localStorage.getItem("employeeList"));

//     // Tìm nhân viên cần chỉnh sửa trong danh sách nhân viên
//     var editedEmployee = employeeList.find(function (employee) {
//       return employee.id === employeeId;
//     });

//     // Điền dữ liệu của nhân viên vào các trường của form chỉnh sửa
//     var preview = document.getElementById("previewImg");
//     preview.src = editedEmployee.img;
//     preview.style.display = "block";
//     var hidden = document.getElementById("wrapImgIcon");
//     hidden.style.display = "none";

//     document.getElementById("employeeCode").value = editedEmployee.code;
//     document.getElementById("employeeName").value = editedEmployee.name;
//     document.getElementById("phoneNumber").value = editedEmployee.phone;
//     document.getElementById("salaryBranch").value = editedEmployee.salarybr;
//     document.getElementById("workingBranch").value = editedEmployee.workbr;
//     document.getElementById("firstDay").value = editedEmployee.fday;
//     document.getElementById("employeeDepartment").value = editedEmployee.depart;
//     document.getElementById("employeePosition").value = editedEmployee.pos;
//     document.getElementById("accountNumber").value = editedEmployee.acc;
//     document.getElementById("employeeNote").value = editedEmployee.note;
//     document.getElementById("idCard").value = editedEmployee.idcard;
//     document.getElementById("dateOfBirth").value = editedEmployee.birthday;
//     document.getElementById("employeeGender").value = editedEmployee.gender;

//     //  Kiểm tra trạng thái của nhân viên và kiểm tra radio tương ứng
//     if (editedEmployee.gender === "Nam") {
//       document.getElementById("employeeMale").checked = true;
//     } else if (employeeGender === "Nữ") {
//       document.getElementById("employeeFemale").checked = true;
//     } else {
//       document.getElementById("employeeMale").checked = false;
//       document.getElementById("employeeFemale").checked = false;
//     }

//     document.getElementById("employeeAddress").value = editedEmployee.address;
//     document.getElementById("employeeArea").value = editedEmployee.area;
//     document.getElementById("employeeEmail").value = editedEmployee.email;
//     document.getElementById("communeWard").value = editedEmployee.cward;
//     document.getElementById("employeeFacebook").value = editedEmployee.facebook;
    
//     // Trả về đối tượng nhân viên đã chỉnh sửa
//     return editedEmployee;
//   }
