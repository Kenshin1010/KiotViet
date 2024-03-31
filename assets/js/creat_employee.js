function creatEmployee(
  previewImg,
  employeeCode,
  employeeName,
  phoneNumber,
  salaryBranch,
  workingBranch,
  firstDay,
  employeeDepartment,
  employeePosition,
  accountNumber,
  employeeNote,
  idCard,
  dateOfBirth,
  employeeGender,
  employeeAddress,
  employeeArea,
  employeeEmail,
  communeWard,
  employeeFacebook,
  employeeId
) {
  
    var employee = new Object();

    employee.img = previewImg;
    employee.code = employeeCode;
    employee.name = employeeName;
    employee.phone = phoneNumber;
    employee.salarybr = salaryBranch;
    employee.workbr = workingBranch;
    employee.fday = firstDay;
    employee.depart = employeeDepartment;
    employee.pos = employeePosition;
    employee.acc = accountNumber;
    employee.note = employeeNote;
    employee.idcard = idCard;
    employee.birthday = dateOfBirth;
    employee.gender = employeeGender;
    employee.address = employeeAddress;
    employee.area = employeeArea;
    employee.email = employeeEmail;
    employee.cward = communeWard;
    employee.facebook = employeeFacebook;
    employee.id = employeeId;
  
    if (employeeId != null) {
      employee.id = employeeId;
    } else {
      employee.id = creatId();
    }
  
    /* Chuyen ve json */
    employee.toJson = function () {
      var json = JSON.stringify(this);
      return json;
    };
  
    /* Chuyen doi tuong tu json ve object co day du thuoc tinh cua object */
    /* Tu json chuyen thanh mot doi tuong day du cac phuong thuc 
              input: json
              output: doi tuong day du
              */
    employee.fromJSON = function () {
      var objectFull = new Object();
      /* Buoc 1: chuyen tu json thanh doi tuong */
      var object = JSON.parse(json);
  
      /* Buoc 2: chuyen doi tuong thanh doi tuong day du phuong thuc */
      var objectFull = creatEmployee(
          object.img,
          object.code,
          object.name,
          object.phone,
          object.salarybr,
          object.workbr,
          object.fday,
          object.depart,
          object.pos,
          object.acc,
          object.note,
          object.idcard,
          object.birthday,
          object.gender,
          object.address,
          object.area,
          object.email,
          object.cward,
          object.facebook,
          object.id
      );
  
      return objectFull;
    };
  
    /* Tu json cua employee tra ve mot danh sach employee co day du cac phuong thuc
        Input: json cua danh sach position
        Output: danh sach position day du
         */
    employee.fromJSONs = function (jsonEmployeeList) {
      if (!jsonEmployeeList) return []; // Kiểm tra null hoặc undefined
  
      var employeeListFull = [];
      var employeeList = JSON.parse(jsonEmployeeList);
  
      for (const employee of employeeList) {
        if (!employee) continue; // Bỏ qua nếu dữ liệu không hợp lệ
        var employeeFull = creatEmployee(
            employee.img,
            employee.code,
            employee.name,
            employee.phone,
            employee.salarybr,
            employee.workbr,
            employee.fday,
            employee.depart,
            employee.pos,
            employee.acc,
            employee.note,
            employee.idcard,
            employee.birthday,
            employee.gender,
            employee.address,
            employee.area,
            employee.email,
            employee.cward,
            employee.facebook,
            employee.id
        );
        employeeListFull.push(employeeFull);
    }
      return employeeListFull;
    };
    return employee;
  }
//   if (!employeeName || !phoneNumber){
//     throw new Error('Cần có tên nhân viên và số điện thoại');
// };
  


/* Mo ta: Chuyen mot danh sach doi tuong, thanh mot doan HTML de hien thi duoc danh sach employee ra man hinh 
Input: Danh sach employee
Output: HTML hien thi danh sach employee
*/
function convertEmployeeListToHTML(employeeList) {
  if (!employeeList) return ''; // Kiểm tra null hoặc undefined
  
  var HTMLEmployeeList = '<div class="table-body-container">';
   // Thêm nhân viên vào đầu danh sách
   employeeList.reverse().forEach(function(employee) {
    var htmlEmployee = convertEmployeeToHTML(employee);
    HTMLEmployeeList += htmlEmployee;
});
//   for (const employee of employeeList) { // Sử dụng vòng lặp for...of
//     var htmlEmployee = convertEmployeeToHTML(employee);
//     HTMLEmployeeList += htmlEmployee;
// }
HTMLEmployeeList += '</div>';

  // for (var i = 0; i < employeeList.length; i++) {
  //   var employee = employeeList[i];
  //   var htmlEmployee = convertEmployeeToHTML(employee);
  //   HTMLEmployeeList = HTMLEmployeeList + htmlEmployee;
  // }
  // HTMLEmployeeList = HTMLEmployeeList + '</tbody>';

  return HTMLEmployeeList;
}

/* Mo ta: Chuyen mot doi tuong thanh mot doan HTML
Dau vao: Doi tuong
Dau ra: Doan HTML cua doi tuong do
 */
function convertEmployeeToHTML(employee) {
  // Tạo một đối tượng employee mới từ thông tin của employee hiện tại
  var employeeObject = creatEmployee(
    employee.img,
    employee.code,
employee.name,
employee.phone,
employee.salarybr,
employee.workbr,
employee.fday,
employee.depart,
employee.pos,
employee.acc,
employee.note,
employee.idcard,
employee.birthday,
employee.gender,
employee.address,
employee.area,
employee.email,
employee.cward,
employee.facebook,
employee.id
  );

  var employeeId = employee.id;
  var html = "";
  var showDataEmployeeId = creatId();
  var showDetailEmployeeId = creatId(); // Đảm bảo rằng showEditEmployeeId cũng được tạo ra một cách duy nhất
  var showCreatDynamicCode = creatId();
  var showEditEmployee = creatId();
  var showRemoveEmployee = creatId();
  var verificationCode = creatId();
  var closeVerificationCode = creatId();
  var confirmationCode = creatId();
  var countdownTimer = creatId();

  html +=  '<tr id="'+showDataEmployeeId+'" class="table-row-data" data-employee-id="' + employeeId + '">\n';
  html +='                  <td class="cell-check">\n';
  html +='                    <label class="container-check-box">\n';
  html +='                      <input id="checkBox1" type="checkbox" />\n';
  html +='                      <span class="checkmark"></span>\n';
  html +='                    </label>\n';
  html +='                  </td>\n';
  html +='                  <td class="cell-img" for="containerCheckBoxCellImg">\n';
  html +='                    <img src="'+employee.img+'" class="img-thumb" />\n';
  html +='                    <div class="img-show">\n';
  html +='                      <img src="'+employee.img+'" class="img-preview" />\n';
  html +='                    </div>\n';
  html +='                  </td>\n';
  html +='                  <td class="employee-code" for="containerCheckBoxEmployeeCode">\n';
  html +='                    '+employee.code+'\n';
  html +='                  </td>\n';
  html +='                  <td class="time-keeping-code" for="containerCheckBoxTimeKeepingCode"></td>\n';
  html +='                  <td class="employee-name" for="containerCheckBoxEmployeeName">\n';
  html +='                    '+employee.name+'\n';
  html +='                  </td>\n';
  html +='                  <td class="phone-number" for="containerCheckBoxPhoneNumber">\n';
  html +='                    '+employee.phone+'\n';
  html +='                  </td>\n';
  html +='                  <td class="id-card" for="containerCheckBoxIdCard"></td>\n';
  html +='                  <td class="employee-unpaid-salary" for="containerCheckBoxEmployeeUnpaidSalary">\n';
  html +='                    0\n';
  html +='                  </td>\n';
  html +='                  <td class="notes" for="containerCheckBoxNotes">'+employee.note+'</td>\n';
  html +='                  <td class="mobile-devices" for="containerCheckBoxMobileDevices"></td>\n';
  html +='                  <td class="date-of-birth" for="containerCheckBoxDateOfBirth">'+employee.birthday+'</td>\n';
  html +='                  <td class="gender" for="containerCheckBoxGender">'+employee.gender+'</td>\n';
  html +='                  <td class="email" for="containerCheckBoxEmail">'+employee.email+'</td>\n';
  html +='                  <td class="facebook" for="containerCheckBoxFacebook">'+employee.facebook+'</td>\n';
  html +='                  <td class="address" for="containerCheckBoxAddress">'+employee.address+'</td>\n';
  html +='                  <td class="salary-branch" for="containerCheckBoxSalaryBranch">'+employee.salarybr+'</td>\n';
  html +='                  <td class="working-branch" for="containerCheckBoxWorkingBranch">'+employee.workbr+'</td>\n';
  html +='                  <td class="department" for="containerCheckBoxDepartment">\n';
  html +='                    '+employee.depart+'\n';
  html +='                  </td>\n';
  html +='                  <td class="position" for="containerCheckBoxPosition">'+employee.pos+'</td>\n';
  html +='                </tr>\n';
  html +='\n';
  html +='                <!-- row-detail -->\n';
  html +='                <tr id="'+showDetailEmployeeId+'" class="row-detail" data-employee-id="' + employeeId + '">\n';
  html +='                  <td class="cell-detail">\n';
  html +='                    <div class="make-boder-table"></div>\n';
  html +='                    <div class="employee-detail">\n';
  html +='                      <div class="employee-detail-container">\n';
  html +='                        <div class="employee-detail-menu">\n';
  html +='                          <ul class="employee-detail-menu-items">\n';
  html +='                            <li class="employee-detail-menu-item">\n';
  html +='                              <span class="detail-item">Thông tin</span>\n';
  html +='                            </li>\n';
  html +='                            <li class="employee-detail-menu-item">\n';
  html +='                              <span class="detail-item">Lịch làm việc</span>\n';
  html +='                            </li>\n';
  html +='                            <li class="employee-detail-menu-item">\n';
  html +='                              <span class="detail-item">Thiết lập lương</span>\n';
  html +='                            </li>\n';
  html +='                            <li class="employee-detail-menu-item">\n';
  html +='                              <span class="detail-item">Nợ lương nhân viên</span>\n';
  html +='                            </li>\n';
  html +='                          </ul>\n';
  html +='                        </div>\n';
  html +='\n';
  html +='                        <!-- employee-detail-body -->\n';
  html +='                        <div class="employee-detail-body">\n';
  html +='                          <div class="form-wrapper employee-detail-body-container">\n';
  html +='                            <!-- employee-detail-left -->\n';
  html +='                            <div class="employee-detail-left">\n';
  html +='                              <div class="profile-img-detail">\n';
  html +='                                <div class="wrap-img-detail">\n';
  html +='                                  <img id="previewImgDetailTable" src="'+employee.img+'"\n';
  html +='                                    alt="Preview Image" />\n';
  html +='                                </div>\n';
  html +='                              </div>\n';
  html +='                            </div>\n';
  html +='\n';
  html +='                            <!-- employee detail right -->\n';
  html +='                            <div class="employee-detail-right">\n';
  html +='                            <div class="employee-detail-right-content">\n';
  html +='                              <!-- employee-detail-indentification -->\n';
  html +='                              <div class="employee-detail-identification">\n';
  html +='                                <!-- identification-group -->\n';
  html +='                                <div class="identification-group">\n';
  html +='                                  <div class="identification-item">\n';
  html +='                                    <span class="identification-item-name">Mã nhân viên:</span>\n';
  html +='                                    <span id="identificationEmployeeCode"\n';
  html +='                                      class="identification-item-code">'+employee.code+'</span>\n';
  html +='                                  </div>\n';
  html +='\n';
  html +='                                  <div class="identification-item">\n';
  html +='                                    <span class="identification-item-name">Tên nhân viên:\n';
  html +='                                    </span>\n';
  html +='                                    <span id="identificationEmployeeName" class="identification-item-code">'+employee.name+'</span>\n';
  html +='                                  </div>\n';
  html +='\n';
  html +='                                  <div class="identification-item">\n';
  html +='                                    <span class="identification-item-name">Mã chấm công:</span>\n';
  html +='                                    <span id="identificationEmployeeTimekeepingCode"\n';
  html +='                                      class="identification-item-code"></span>\n';
  html +='                                  </div>\n';
  html +='\n';
  html +='                                  <div class="identification-item">\n';
  html +='                                    <span class="identification-item-name">Ngày sinh:</span>\n';
  html +='                                    <span id="identificationEmployeeBirthday" class="identification-item-code">'+employee.birthday+'</span>\n';
  html +='                                  </div>\n';
  html +='\n';
  html +='                                  <div class="identification-item">\n';
  html +='                                    <span class="identification-item-name">Giới tính:</span>\n';
  html +='                                    <span id="identificationEmployeeGender" class="identification-item-code">'+employee.gender+'</span>\n';
  html +='                                  </div>\n';
  html +='\n';
  html +='                                  <div class="identification-item">\n';
  html +='                                    <span class="identification-item-name">Số CMND/CCCD:</span>\n';
  html +='                                    <span id="identificationEmployeeIdCard" class="identification-item-code">'+employee.idcard+'</span>\n'
  html +='                                  </div>\n';
  html +='\n';
  html +='                                  <div class="identification-item">\n';
  html +='                                    <span class="identification-item-name">Phòng ban:</span>\n';
  html +='                                    <span id="identificationEmployeeDepartment" class="identification-item-code">'+employee.depart+'</span>\n';
  html +='                                  </div>\n';
  html +='\n';
  html +='                                  <div class="identification-item">\n';
  html +='                                    <span class="identification-item-name">Chức danh:</span>\n'
  html +='                                    <span id="identificationEmployeePosition" class="identification-item-code">'+employee.pos+'</span>\n';
  html +='                                  </div>\n';
  html +='\n';
  html +='                                </div>\n';
  html +='                              </div>\n';
  html +='\n';
  html +='                            <!-- employee-detail-contact -->\n';
  html +='                            <div class="employee-detail-contact">\n';
  html +='                              <div class="contact-group">\n';
  html +='                                <div class="contact-item">\n';
  html +='                                  <span class="contact-item-name">Ngày bắt đầu làm việc:</span>\n'
  html +='                                  <span id="contactEmployeeStartDay" class="contact-item-code">'+employee.fday+'</span>\n';
  html +='                                </div>\n';
  html +='\n';
  html +='                                <div class="contact-item">\n';
  html +='                                  <span class="contact-item-name">Chi nhánh trả lương:</span>\n';
  html +='                                  <span id="contactEmployeeBranchPay" class="contact-item-code">'+employee.salarybr+'</span>\n';
  html +='                                </div>\n';
  html +='\n';
  html +='                                <div class="contact-item">\n';
  html +='                                  <span class="contact-item-name">Chi nhánh làm việc:</span>\n';
  html +='                                  <span id="contactEmployeeBranchWork" class="contact-item-code">'+employee.workbr+'</span>\n';
  html +='                                </div>\n';
  html +='\n';
  html +='                                <div class="contact-item">\n';
  html +='                                  <span class="contact-item-name">Tài khoản KiotViet:</span>\n';
  html +='                                  <span id="contactEmployeeAccount" class="contact-item-code">'+employee.acc+'</span>\n';
  html +='                                </div>\n';
  html +='\n';
  html +='                                <div class="contact-item">\n';
  html +='                                  <span class="contact-item-name">Số điện thoại:</span>\n';
  html +='                                  <span id="contactEmployeePhoneNumber" class="contact-item-code">'+employee.phone+'</span>\n';
  html +='                                </div>\n';
  html +='\n';
  html +='                                <div class="contact-item">\n';
  html +='                                  <span class="contact-item-name">Email:</span>\n';
  html +='                                  <span id="contactEmployeeEmail" class="contact-item-code">'+employee.email+'</span>\n';
  html +='                                </div>\n';
  html +='\n';
  html +='                                <div class="contact-item">\n';
  html +='                                  <span class="contact-item-name">Facebook:</span>\n';
  html +='                                  <span id="contactEmployeeFacebook" class="contact-item-code">'+employee.facebook+'</span>\n';
  html +='                                </div>\n';
  html +='\n';
  html +='                                <div class="contact-item">\n';
  html +='                                  <span class="contact-item-name">Địa chỉ:</span>\n';
  html +='                                  <span id="contactEmployeeAddress" class="contact-item-code">'+employee.address+'</span>\n';
  html +='                                </div>\n';
  html +='\n';
  html +='                                <div class="contact-item">\n';
  html +='                                  <span class="contact-item-name">Thiết bị di động:</span>\n';
  html +='                                  <span id="contactEmployeeDevices" class="contact-item-code"></span>\n';
  html +='                                </div>\n';
  html +='                              </div>\n';
  html +='                            </div>\n';
  html +='\n';
  html +='                            <!-- employee-detail-noted -->\n';
  html +='                            <div class="employee-detail-noted">\n';
  html +='                              <div class="note-item">\n';
  html +='                                <span class="note-item-name">Ghi chú...</span>\n';
  html +='                                <span class="note-item-code">'+employee.note+'</span>\n';
  html +='                              </div>\n';
  html +='                            </div>\n';
  html +='                            </div>\n';

  html +='\n';
  html +='                          <!-- add-edit-employee -->\n';
  html +='                          <div class="add-edit-employee">\n';
  html +='                            <button id="'+showCreatDynamicCode+'" class="btn btn-primary btn-primary-bottom btn-primary-code" data-employee-id="' + employeeId + '">\n';
  html +='                              <i class="btn-primary-icon fas fa-solid fa-plus"></i>\n';
  html +='                              <span>Lấy mã xác nhận</span>\n';
  html +='                            </button>\n';
  html +='\n';
  html +='                            <button id="'+showEditEmployee+'" class="btn btn-success btn-success-bottom btn-edit-employee" data-action="editEmployee" data-employee-id="' + employeeId + '">\n';
  html +='                              <i class="btn-success-icon fas fa-solid fa-check-square"></i>\n';
  html +='                              <span>Cập nhật</span>\n';
  html +='                            </button>\n';
  html +='                            <button id="'+showRemoveEmployee+'" class="btn btn-red btn-red-bottom btn-remove-employee" data-employee-id="' + employeeId + '">\n';
  html +='                              <i class="btn-success-icon fas fa-solid fa-trash-can"></i>\n';
  html +='                              <span>Xóa nhân viên</span>\n';
  html +='                            </button>\n';
  html +='                          </div>\n';
  html +='                          </div>\n';
  

  html +='<!-- verification code -->\n';
  html +='          <div id="'+verificationCode+'" class="verification-code" data-employee-id="' + employeeId + '">\n';
  html +='            <div class="mask mask-remove">\n';
  html +='              <div class="verification-code-container remove-container">\n';
  html +='                <div class="add-remove-title">\n';
  html +='                  <span class="remove-title">Mã xác nhận</span>\n';
  html +='                  <i id="'+closeVerificationCode+'" class="close-verification-code fas fa-solid fa-close" data-employee-id="' + employeeId + '"></i>\n';
  html +='                  <script src="./assets/js/btn_close_id.js"></script>\n';
  html +='                  <script>\n';
  html +='                    document.addEventListener(\n';
  html +='                      "DOMContentLoaded",\n';
  html +='                      function () {\n';
  html +='                        closeButtonId(\n';
  html +='                          "'+closeVerificationCode+'",\n';
  html +='                          "'+verificationCode+'"\n';
  html +='                        );\n';
  html +='                      }\n';
  html +='                    );\n';
  html +='                  </script>\n';
  html +='                </div>\n';
  html +='                <div class="add-remove-body">\n';
  html +='                  <div class="form-group">\n';
  html +='                    <span id="'+confirmationCode+'" class="code-number" data-employee-id="' + employeeId + '"></span>\n';
  html +='                    <p>\n';
  html +='                      Mã xác nhận chỉ hiệu lực trong vòng\n';
  html +='                      <span id="'+countdownTimer+'" class="time-minutes" data-employee-id="' + employeeId + '"></span> phút. Vui lòng\n';
  html +='                      lấy lại mã xác nhận khi hết thời gian.\n';
  html +='                    </p>\n';
  html +='                  </div>\n';
  html +='                </div>\n';
  html +='              </div>\n';
  html +='            </div>\n';
  html +='          </div>';
  html +='                            </div>\n';
  html +='                        </div>\n';
  html +='                      </div>\n';
  html +='                    </div>\n';
  html +='\n';
  html +='                  </td>\n';
  html +='                </tr>';
  return html;
}

/* Input: id
  Output: doi tuong co Id=id */

/* Mo ta: Tu id employee lay len doi tuong employee voi day du cac ham ben trong doi tuong 
Input: employeeId
Output: doi tuong employee
*/
function getEmployeeById(employeeId) {
  // Lấy danh sách phòng ban từ Local Storage
  var employeeList = JSON.parse(localStorage.getItem("employeeList"));

  // Tìm phòng ban có ID tương ứng
  for (var i = 0; i < employeeList.length; i++) {
    var employeeCurrent = employeeList[i];
    if (employeeCurrent.id == employeeId) {
      // Tạo một đối tượng employee mới từ thông tin của employee hiện tại và trả về nó
      return creatEmployee(
        employeeCurrent.img,
employeeCurrent.code,
employeeCurrent.name,
employeeCurrent.phone,
employeeCurrent.salarybr,
employeeCurrent.workbr,
employeeCurrent.fday,
employeeCurrent.depart,
employeeCurrent.pos,
employeeCurrent.acc,
employeeCurrent.note,
employeeCurrent.idcard,
employeeCurrent.birthday,
employeeCurrent.gender,
employeeCurrent.address,
employeeCurrent.area,
employeeCurrent.email,
employeeCurrent.cward,
employeeCurrent.facebook,
employeeCurrent.id
      );
    }
  }
  return null; // Trả về null nếu không tìm thấy nhân viên
}

// Tạo danh sách nhân viên không chứa nhân viên đang chỉnh sửa
function employeeListNotContainCurrentEmployee(employeeList, employeeId) {
  return employeeList.filter(function(employee) {
      return employee.id !== employeeId;
  });
}

/* Mo ta: lay toan bo danh sach nv duoi local storage len */
function getEmployeeListLocalStorage() {
  /* Buoc 1: load json */
  var jsonEmployeeList = localStorage.getItem("employeeList");

  /* Buoc 2: Chuyen json thanh doi tuong */
  var employeeList = JSON.parse(jsonEmployeeList);
  
  if (employeeList == null) {
    employeeList = new Array();
  }

  return employeeList;
}