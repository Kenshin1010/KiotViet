var employeeId=null;
var action = '';
// Lắng nghe sự kiện click trên tất cả các nút "Edit Employee"
document.querySelectorAll('.btn-edit-employee').forEach(function(button) {
    button.addEventListener('click', editEmployeeForm, handleTabSwitching);
  });
    function editEmployeeForm() {
        // toggleDisplay(button.getAttribute('id'), '.add-employee', 'employeeName');
        this.setAttribute('data-action', 'editEmployee');
        action = this.getAttribute('data-action');
        console.log(action);

        employeeId = this.getAttribute('data-employee-id'); // Nếu dùng var employeeId lần nữa sẽ bị lỗi vì đã khai báo employeeId ngoài global.
        console.log(
            "employeeId nhận được khi click button cập nhật: ",
            employeeId
          );

          // Thêm title tương ứng
    document.getElementById('titleAddEmployee').innerText = 'Cập nhật nhân viên';

    // Tìm phần tử tr.table-row-data có cùng data-employee-id
    var targetRow = document.querySelector(
      'tr.table-row-data[data-employee-id="' + employeeId + '"]'
    );
    if (targetRow) {
      // Lấy vị trí top và right của targetRow
      // var targetRect = targetRow.getBoundingClientRect();
      // var targetTop = targetRect.top + window.scrollY;
      // var targetLeft = targetRect.left + window.scrollX;

      // Đặt lại thuộc tính top và left của phần tử .add-employee
      var addEmployee = document.getElementById("addEmployee");
      // addEmployee.style.position = "fixed";
      // addEmployee.style.top = targetTop + 59 + "px";
      // addEmployee.style.left = targetLeft - 100 + "px"; // Để tạo khoảng cách bên trái lùi lại 100px so với tr
      // addEmployee.style.right = "auto"; // Đặt lại thuộc tính left thành 'auto'
      addEmployee.style.display = "block";
      focusOnInput("employeeName");

      // Mặc định hiển thị tab thông tin và ẩn tab thiết lập lương
    var infoDiv = document.querySelector('.tab-content');
    var salaryDiv = document.querySelector('.set-salary');
    var infoLink = document.querySelector('.active-info-employee');
    var salaryLink = document.querySelector('.active-salary-setting');

    infoDiv.style.display = 'block';
    salaryDiv.style.display = 'none';
    infoLink.classList.add('active');
    infoLink.classList.remove('remove-active');
    salaryLink.classList.add('remove-active');
    salaryLink.classList.remove('active');
      
      // var informationDiv = document.querySelector(".hide-show-information");
      // informationDiv.style.display = "block";
    }

    // Gọi hàm fillEmployeeData để điền dữ liệu của nhân viên vào form
  var editedEmployee = fillEmployeeData(employeeId);
  console.log("editedEmployee: ", editedEmployee);
  
  // Lấy thông tin nhân viên đang chỉnh sửa
  // var employeeEditing = getEmployeeById(employeeId);
  // console.log("employeeEditing: ", employeeEditing);

  // Lấy danh sách nhân viên
  var employeeList = getEmployeeListLocalStorage();

  // Tạo danh sách nhân viên không chứa nhân viên đang chỉnh sửa
  var filteredEmployeeListEdit = employeeListNotContainCurrentEmployee(employeeList, employeeId);
  console.log("filteredEmployeeListEdit: ", filteredEmployeeListEdit);
        
        // Cập nhật giá trị data-action cho nút #btnSaveApplicationEmployee
  var saveButton = document.getElementById("btnSaveApplicationEmployee");
  saveButton.setAttribute('data-action', 'editEmployee');

  var cancelButton = document.getElementById("cancelAddEmployee");
  cancelButton.setAttribute('data-action', 'editEmployee');

  var closeButton = document.getElementById("closeAddEmployee");
  closeButton.setAttribute('data-action', 'editEmployee');

  // Lắng nghe sự kiện khi click vào nút Save
saveButton.addEventListener("click", editEmployeeButtonClickHandler);
// Sự kiện click cho nút cancelAddProduct
cancelButton.addEventListener("click", cancelEditEmployeeButtonClickHandler);
// Sự kiện click cho nút closeAddProduct
  closeButton.addEventListener("click", closeEditEmployeeButtonClickHandler);
}

function cancelEditEmployeeButtonClickHandler() {
  hideEditEmployee();
  var addEmployee = document.getElementById("addEmployee");
  // Đặt lại vị trí và ẩn phần tử addEmployee
  addEmployee.style.top = "60px";
  addEmployee.style.left = "0";
  addEmployee.style.right = "0";
  addEmployee.style.display = "none";

  var informationDiv = document.querySelector(".hide-show-information");
  // Ẩn phần tử .hide-show-information
  informationDiv.style.display = "none";

  return;
}
// console.log("employeeId ở thao tác hiện tại sau khi click button cancelAddEmployee là: ", employeeId);

function closeEditEmployeeButtonClickHandler() {
  hideEditEmployee();
  var addEmployee = document.getElementById("addEmployee");
  // Đặt lại vị trí và ẩn phần tử addEmployee
  addEmployee.style.top = "60px";
  addEmployee.style.left = "0";
  addEmployee.style.right = "0";
  addEmployee.style.display = "none";

  var informationDiv = document.querySelector(".hide-show-information");
  // Ẩn phần tử .hide-show-information
  informationDiv.style.display = "none";

  return;
}
// console.log("employeeId ở thao tác hiện tại sau khi click button closeAddEmployee là: ", employeeId);

    function editEmployeeButtonClickHandler() {
      if (action === 'editEmployee') { 
        console.log("actionEdit: ", action); 
      
      var isValid = validateAndFocusInvalidField(); // Validate employee information
      console.log("isValid validateAndFocusInvalidField(): ", isValid);
      if (!isValid) {
        return; // Ngăn chặn hành động tiếp theo nếu thông tin không hợp lệ
      } else if (isValid){
        console.log("Điều kiện của hợp lệ validateAndFocusInvalidField() để tiếp tục thực thi isValid: ", isValid);
        var ifIsNotExistsEdit = validateAndFocusExistsFieldEdit(employeeId); // ifIsNotExistsEdit = true đúng khi không tồn tại hay isExists = false và ngược lại.
        if(!ifIsNotExistsEdit){
        console.log("Điều kiện của hợp lệ validateAndFocusInvalidField() để tiếp tục thực thi isValid, !validateAndFocusExistsFieldEdit(): isExists: ", isValid);
        console.log("Điều kiện của tồn tại !validateAndFocusExistsFieldEdit() để tiếp tục thực thi isValid, !validateAndFocusExistsFieldEdit(): isExists: ", ifIsNotExistsEdit);
          return; // Ngăn chặn hành động tiếp theo nếu thông tin đã tồn tại
        } else if(ifIsNotExistsEdit) {
        console.log("Điều kiện của hợp lệ validateAndFocusInvalidField() để tiếp tục thực thi isValid, validateAndFocusExistsFieldEdit(): !isExists : ", isValid);
        console.log("Điều kiện của tồn tại validateAndFocusExistsFieldEdit() để tiếp tục thực thi isValid, validateAndFocusExistsFieldEdit(): !isExists: ", ifIsNotExistsEdit);
          // Gọi hàm để khởi tạo
        // Nếu employeeId đã tồn tại, gọi hàm updateEmployeeInList
        // Lấy thông tin từ các trường nhập liệu trong form chỉnh sửa
        console.log("Edit");
    
        var nodeImg = document.getElementById("previewImg");
        var imgInputFileSrc = getImageSrc(nodeImg);
        function getImageSrc(nodeImg) {
          var imgSrc = nodeImg.getAttribute("src");
          if (!imgSrc || imgSrc === "#") {
            return "data:image/png;base64,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";
          }
          return imgSrc;
        }
        var codeInput = document.getElementById("employeeCode").value;
        /* lay danh sach cu tu duoi local storage len */
        var employeeList = getEmployeeListLocalStorage();
        // Kiểm tra xem mã nhân viên employee.code có phải null hay rỗng không?
        // Nếu employee.code null = eCodeCurrent thì Kiểm tra trong tất cả các employee lấy ra các employee.code có dạng NV{6digit} và tìm ra mã NV lớn nhất đang có là bao nhiêu đặt tên là eCodeMaxCurrent
        // Cập nhật employee.code null đó theo mã động có giá trị chính là giá trị eCodeMaxCurrent +1
    
        // Sinh mã động cho nhân viên dạng NV000001
        // Kiểm tra xem mã nhân viên employee.code có phải null hay rỗng không?
        if (codeInput === null || codeInput === "") {
          var prefix = "NV"; // Tiền tố cố định cho mã nhân viên
          var digitCount = 6; // Số lượng chữ số trong mã nhân viên
    
          // Lọc ra các nhân viên có mã bắt đầu bằng 'NV'
      var employeeListNV = employeeList.filter(function (employee) {
        // return employee.code.startsWith("NV");
        return /^NV\d+$/.test(employee.code) && 
        !/^NV0*$/.test(employee.code); // Lọc ra các nhân viên có mã bắt đầu bằng 'NV' và theo sau là ít nhất một chữ số, loại bỏ trường hợp toàn số 0
      });
    
          // Sắp xếp danh sách nhân viên theo thứ tự tăng dần của mã nhân viên trong mảng employeeListNV
          employeeListNV.sort(function (a, b) {
            var codeA = parseInt(a.code.substring(2)); // Lấy số từ mã nhân viên
            var codeB = parseInt(b.code.substring(2));
            return codeA - codeB;
          });
    
          if (
            employeeListNV.length === 0 ||
            employeeListNV[0].code !== "NV000001"
          ) {
            var eCodeCurrent = prefix + "000001";
            codeInput = eCodeCurrent;
          } else {
            var eCodeCurrent = null;
            var existingCodes = employeeListNV.map((employee) => codeInput);
    
            // Duyệt qua danh sách nhân viên đã được sắp xếp để tìm mã nhân viên mới
            for (var i = 0; i < employeeListNV.length - 1; i++) {
              var currentCode = parseInt(employeeListNV[i].code.substring(2));
              var nextCode = parseInt(
                employeeListNV[i + 1].code.substring(2)
              );
    
              // Nếu có khoảng trống giữa các số nhân viên
              if (nextCode - currentCode > 1) {
                eCodeCurrent =
                  prefix + String(currentCode + 1).padStart(digitCount, "0");
                break;
              }
              return;
            }
    
            // Nếu không tìm thấy khoảng trống, tạo ra mã nhân viên mới bằng cách tăng mã nhân viên lớn nhất hiện có thêm một đơn vị
            if (eCodeCurrent === null) {
              var lastEmployeeCode = parseInt(
                employeeListNV[employeeListNV.length - 1].code.substring(2)
              );
              var proposedCode =
                prefix +
                String(lastEmployeeCode + 1).padStart(digitCount, "0");
    
              // Kiểm tra xem mã nhân viên mới có trùng với bất kỳ mã nào trong danh sách không
              while (existingCodes.includes(proposedCode)) {
                lastEmployeeCode++;
                proposedCode =
                  prefix + String(lastEmployeeCode).padStart(digitCount, "0");
              }
    
              eCodeCurrent = proposedCode;
            }
    
            // Sử dụng eCodeCurrent
            codeInput = eCodeCurrent;
          }
    
          // Xóa danh sách employeeListNV hoặc trả về null
          employeeListNV = null;
        }
    
        var nameInput = document.getElementById("employeeName").value;
        var phoneTel = document.getElementById("phoneNumber").value;
        var salaryBrInput = document.getElementById("salaryBranch").value;
        var workBrInput = document.getElementById("workingBranch").value;
        var firstDayTimeLocal = document.getElementById("firstDay").value;
        var departInput = document.getElementById("employeeDepartment").value;
        var posInput = document.getElementById("employeePosition").value;
        var accInput = document.getElementById("accountNumber").value;
        var noteInput = document.getElementById("employeeNote").value;
        var idCardNumber = document.getElementById("idCard").value;
        var birthDate = document.getElementById("dateOfBirth").value;
        var genderRadioMale = document.getElementById("employeeMale").value;
        var genderRadioFemale =
          document.getElementById("employeeFemale").value;
    
        // Kiểm tra xem radio nào được chọn
        var genderInput;
        if (document.getElementById("employeeMale").checked) {
          genderInput = "Nam";
        } else if (document.getElementById("employeeFemale").checked) {
          genderInput = "Nữ";
        } else {
          genderInput = ""; // Nếu không có radio nào được chọn
        }
        var addressInput = document.getElementById("employeeAddress").value;
        var areaInput = document.getElementById("employeeArea").value;
        var emailEmail = document.getElementById("employeeEmail").value;
        var communeWardInput = document.getElementById("communeWard").value;
        var facebookInput = document.getElementById("employeeFacebook").value;
    
        // Tạo một đối tượng mới chứa thông tin chỉnh sửa của nhân viên
        var editedEmployee = {
          img: imgInputFileSrc,
          code: codeInput,
          name: nameInput,
          phone: phoneTel,
          salarybr: salaryBrInput,
          workbr: workBrInput,
          fday: firstDayTimeLocal,
          depart: departInput,
          pos: posInput,
          acc: accInput,
          note: noteInput,
          idcard: idCardNumber,
          birthday: birthDate,
          gender: genderInput,
          address: addressInput,
          area: areaInput,
          email: emailEmail,
          cward: communeWardInput,
          facebook: facebookInput,
        };
    
        updateEmployeeInList(employeeId, editedEmployee);
        // Thực hiện các hành động cần thiết để đóng cửa sổ và trở về employee.html
        // window.location.href = "employee.html";
        }
      } return;
    }
      }

// Fill Data & Edit Update
function fillEmployeeData(employeeId) {
    // Lấy danh sách nhân viên từ localStorage
    var employeeList = JSON.parse(localStorage.getItem("employeeList"));

    // Tìm nhân viên cần chỉnh sửa trong danh sách nhân viên
    var editedEmployee = employeeList.find(function (employee) {
      return employee.id === employeeId;
    });

    // Điền dữ liệu của nhân viên vào các trường của form chỉnh sửa
    var preview = document.getElementById("previewImg");
    preview.src = editedEmployee.img;
    preview.style.display = "block";
    var hidden = document.getElementById("wrapImgIcon");
    hidden.style.display = "none";

    document.getElementById("employeeCode").value = editedEmployee.code;
    document.getElementById("employeeName").value = editedEmployee.name;
    document.getElementById("phoneNumber").value = editedEmployee.phone;
    document.getElementById("salaryBranch").value = editedEmployee.salarybr;
    document.getElementById("workingBranch").value = editedEmployee.workbr;
    document.getElementById("firstDay").value = editedEmployee.fday;
    document.getElementById("employeeDepartment").value = editedEmployee.depart;
    document.getElementById("employeePosition").value = editedEmployee.pos;
    document.getElementById("accountNumber").value = editedEmployee.acc;
    document.getElementById("employeeNote").value = editedEmployee.note;
    document.getElementById("idCard").value = editedEmployee.idcard;
    document.getElementById("dateOfBirth").value = editedEmployee.birthday;
    document.getElementById("employeeGender").value = editedEmployee.gender;

    //  Kiểm tra trạng thái của nhân viên và kiểm tra radio tương ứng
    if (editedEmployee.gender === "Nam") {
      document.getElementById("employeeMale").checked = true;
    } else if (employeeGender === "Nữ") {
      document.getElementById("employeeFemale").checked = true;
    } else {
      document.getElementById("employeeMale").checked = false;
      document.getElementById("employeeFemale").checked = false;
    }

    document.getElementById("employeeAddress").value = editedEmployee.address;
    document.getElementById("employeeArea").value = editedEmployee.area;
    document.getElementById("employeeEmail").value = editedEmployee.email;
    document.getElementById("communeWard").value = editedEmployee.cward;
    document.getElementById("employeeFacebook").value = editedEmployee.facebook;
    
    // Trả về đối tượng nhân viên đã chỉnh sửa
    return editedEmployee;
  }


function updateEmployeeInList(employeeId, editedEmployee) {
    console.log("Goi ham updateEmployeeInList()");

    // Lấy danh sách nhân viên từ Local Storage
    var employeeList = JSON.parse(localStorage.getItem("employeeList"));

    // Tìm nhân viên có ID tương ứng và cập nhật thông tin
    for (var i = 0; i < employeeList.length; i++) {
      if (employeeList[i].id === employeeId) {
        employeeList[i].img = editedEmployee.img;
        employeeList[i].code = editedEmployee.code;
        employeeList[i].name = editedEmployee.name;
        employeeList[i].phone = editedEmployee.phone;
        employeeList[i].salarybr = editedEmployee.salarybr;
        employeeList[i].workbr = editedEmployee.workbr;
        employeeList[i].fday = editedEmployee.fday;
        employeeList[i].depart = editedEmployee.depart;
        employeeList[i].pos = editedEmployee.pos;
        employeeList[i].acc = editedEmployee.acc;
        employeeList[i].note = editedEmployee.note;
        employeeList[i].idcard = editedEmployee.idcard;
        employeeList[i].birthday = editedEmployee.birthday;
        employeeList[i].gender = editedEmployee.gender;
        employeeList[i].address = editedEmployee.address;
        employeeList[i].area = editedEmployee.area;
        employeeList[i].email = editedEmployee.email;
        employeeList[i].cward = editedEmployee.cward;
        employeeList[i].facebook = editedEmployee.facebook;
        break; // Dừng vòng lặp sau khi cập nhật thông tin
      }
    }

    console.log("employee ID: ", employeeId);
    console.log(
      "Nhân viên được sửa có mã nhân viên là: ",
      editedEmployee.code
    );
    console.log("Update information: ", editedEmployee);
    console.log("Employee List updated: ", employeeList);

    // Lưu danh sách nhân viên đã cập nhật vào Local Storage
    localStorage.setItem("employeeList", JSON.stringify(employeeList));

    // alert("Sửa nhân viên thành công");
    toast({
      type:'success',
      message:'Sửa nhân viên thành công',
      duration:1000
    });

    // Đặt lại thuộc tính top và right của phần tử .add-employee
    var addEmployee = document.getElementById("addEmployee");
    addEmployee.style.top = 60 + "px";
    addEmployee.style.left = 0 + "px";
    addEmployee.style.right = 0 + "px";
    addEmployee.style.display = "none";
    var informationDiv = document.querySelector(".hide-show-information");
    informationDiv.style.display = "none";

    // Reload lại trang sau khi sửa dữ liệu thành công
    // location.reload();
    closeButtonId('btnSaveApplicationEmployee', 'addEmployee');
  }