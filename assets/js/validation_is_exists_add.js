// Hàm kiểm tra tồn tại trong danh sách hay chưa
// Nếu tồn tại thì hàm validateAndFocusExistsField() sẽ trả về false
// ngược lại nếu chưa tồn tại thì hàm validateAndFocusExistsField() trả về true và tiếp tục thực hiện các bước tiếp theo.
function validateAndFocusExistsField(){
  var isExists = false;
  var isValid = !isExists;
  var employeeList = getEmployeeListLocalStorage();
  
  // Validate is exists employee code
  var nodeCode = document.getElementById("employeeCode");
  var employeeCode = nodeCode.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  if (employeeCode !==null && employeeCode !==''){
  // Kiểm tra mã số nhân viên đã tồn tại
    // Kiểm tra kết quả
    if (isExistsOrNot(employeeList, employeeCode, "code")) {
      console.log("Employee code exists in the list.");
      //  alert("Employee code exists in the list.")
       toastEdit({
          type:'error',
          message:'Mã nhân viên đã tồn tại',
          duration:3000
        });
      nodeCode.classList.add("exists");
      nodeCode.focus();
      isExists = true;
      isValid = false 
      // return false; // employeeCode tồn tại trong danh sách thì isExists là true và validateAndFocusExistsField() là false
    } else {
      nodeCode.classList.remove("exists")
      console.log("Employee code does not exist in the list.");
      isExists = false;
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
    if (isExistsOrNot(employeeList, phoneNumber, "phone")) {
      console.log("Phone number exists in the list.");
      //  alert("Phone number exists in the list.")
       toastEdit({
          type:'error',
          message:'Số điện thoại đã tồn tại',
          duration:3000
        });
      nodePhone.classList.add("exists");
      nodePhone.focus();
      isExists = true;
      isValid = false; // phoneNumber tồn tại trong danh sách thì isExists là true và validateAndFocusExistsField() là false
    } else {
      nodePhone.classList.remove("exists")
      console.log("Phone number does not exist in the list.");
      isExists = false;
      isValid = true;
    }
  }
  
  // Validate is exists employee email
  var nodeEmployeeEmail = document.getElementById("employeeEmail");
  var employeeEmail = nodeEmployeeEmail.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  // Kiểm tra email nhân viên đã tồn tại
    // Kiểm tra kết quả
    if (isValid && employeeEmail !== null && employeeEmail !== '') {
    if (isExistsOrNot(employeeList, employeeEmail, "email")) {
      console.log("Email exists in the list.");
      //  alert("Email exists in the list.")
       toastEdit({
          type:'error',
          message:'Email đã tồn tại',
          duration:3000
        });
      nodeEmployeeEmail.classList.add("exists");
      nodeEmployeeEmail.focus();
    isExists = true;
    isValid = false;
      // return false; // email tồn tại trong danh sách thì isExists là true và validateAndFocusExistsField() la false
    } else {
      nodeEmployeeEmail.classList.remove("exists");
      console.log("Email does not exist in the list.");
      isExists = false;
      isValid = true;
    }
  } 
  // else{
  //   return true; // Trường hợp rỗng thì bỏ qua.
  // }
  
  // Thêm các điều kiện kiểm tra khác nếu cần ở đây
  return isValid;
}