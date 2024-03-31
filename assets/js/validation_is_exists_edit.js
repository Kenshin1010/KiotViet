function validateAndFocusExistsFieldEdit(employeeId){
  var isExistsEdit = false;
  var isValid = !isExistsEdit;
  var employeeList = getEmployeeListLocalStorage();
  var filteredEmployeeListEdit = employeeListNotContainCurrentEmployee(employeeList, employeeId);
  
  // Validate is exists employee code
  var nodeCode = document.getElementById("employeeCode");
  var employeeCode = nodeCode.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  if (employeeCode !==null && employeeCode !==''){
  // Kiểm tra mã số nhân viên đã tồn tại
    // Kiểm tra kết quả
    if (isExistsOrNot(filteredEmployeeListEdit, employeeCode, "code")) {
      console.log("Employee code exists in the list.");
      //  alert("Employee code exists in the list.")
       toastEdit({
          type:'error',
          message:'Mã nhân viên đã tồn tại',
          duration:3000
        });
      nodeCode.classList.add("exists");
      nodeCode.focus();
      isExistsEdit = true;
      isValid = false 
      // return false; // employeeCode tồn tại trong danh sách thì isExistsEdit là true và validateAndFocusExistsField() là false
    } else {
      nodeCode.classList.remove("exists")
      console.log("Employee code does not exist in the list.");
      isExistsEdit = false;
      isValid = true;
      // return true;
    }
  } 
  // else{
  //   return true; // Trường hợp rỗng thì bỏ qua
  // }
  
  // Validate is exists employee phoneNumber
  var nodePhone = document.getElementById("phoneNumber");
  var phoneNumber = nodePhone.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  // Kiểm tra số điện thoại nhân viên đã tồn tại
    // Kiểm tra kết quả
    if (isValid && phoneNumber !== null && phoneNumber !== '') {
    if (isExistsOrNot(filteredEmployeeListEdit, phoneNumber, "phone")) {
      console.log("Phone number exists in the list.");
      //  alert("Phone number exists in the list.")
       toastEdit({
          type:'error',
          message:'Số điện thoại đã tồn tại',
          duration:3000
        });
      nodePhone.classList.add("exists");
      nodePhone.focus();
      isExistsEdit = true;
      isValid = false; // phoneNumber tồn tại trong danh sách thì isExistsEdit là true và validateAndFocusExistsField() là false
    } else {
      nodePhone.classList.remove("exists")
      console.log("Phone number does not exist in the list.");
      isExistsEdit = false;
      isValid = true;
    }
  }
  
  // Validate is exists employee email
  var nodeEmployeeEmail = document.getElementById("employeeEmail");
  var employeeEmail = nodeEmployeeEmail.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  // Kiểm tra email nhân viên đã tồn tại
    // Kiểm tra kết quả
    if (isValid && employeeEmail !== null && employeeEmail !== '') {
    if (isExistsOrNot(filteredEmployeeListEdit, employeeEmail, "email")) {
      console.log("Email exists in the list.");
      //  alert("Email exists in the list.")
       toastEdit({
          type:'error',
          message:'Email đã tồn tại',
          duration:3000
        });
      nodeEmployeeEmail.classList.add("exists");
      nodeEmployeeEmail.focus();
    isExistsEdit = true;
    isValid = false;
      // return false; // email tồn tại trong danh sách thì isExistsEdit là true và validateAndFocusExistsField() la false
    } else {
      nodeEmployeeEmail.classList.remove("exists");
      console.log("Email does not exist in the list.");
      isExistsEdit = false;
      isValid = true;
    }
  } 
  // else{
  //   return true; // Trường hợp rỗng thì bỏ qua.
  // }
  
  // Thêm các điều kiện kiểm tra khác nếu cần ở đây
  return isValid;
}