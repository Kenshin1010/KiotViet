var employeeId = '';
var action = '';
// Lắng nghe sự kiện click trên nút "Add Employee" addEmployeeButton
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('addEmployeeButton').addEventListener('click',addEmployeeForm, handleTabSwitching);
});
 function addEmployeeForm() {
   this.setAttribute('data-action', 'addEmployee');
   action = this.getAttribute('data-action');
   console.log(action);
    // Thêm sự kiện hiển thị div "add-employee" khi click vào button #addEmployeeButton
  showDiv("addEmployeeButton", ".add-employee");
  // trả lại top: 60px cho .add-employee
  var addEmployee = document.getElementById("addEmployee");
  addEmployee.style.top = '60px';
  
  // Thêm title tương ứng
  document.getElementById('titleAddEmployee').innerText = 'Thêm mới nhân viên';

  var toggleButton = document.getElementById('toggleButton');
  var informationDiv = document.querySelector('.hide-show-information');
  var icon = toggleButton.querySelector('i');
  informationDiv.style.display = 'none';
  // Thay đổi icon và text của button
  toggleButton.querySelector('span').textContent = 'Thêm thông tin';
  icon.className = 'btn-form-icon fas fa-solid fa-angle-down'; // Thay đổi class của icon

  // Thêm sự kiện hiển thị div "tab-content" khi click vào button #addEmployeeButton
  showDiv("addEmployeeButton", ".tab-content");

  // Thêm sự kiện đóng div "setSalary" khi click vào button #addEmployeeButton
  closeButtonId("addEmployeeButton", "setSalary");

  // Thêm sự kiện đóng div "newApplication" khi click vào button #addEmployeeButton
  closeButtonId("addEmployeeButton", "newApplication");

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

// Cập nhật giá trị data-action cho nút #btnSaveApplicationEmployee
  var saveButton = document.getElementById("btnSaveApplicationEmployee");
  saveButton.setAttribute('data-action', 'addEmployee');

  var cancelButton = document.getElementById("cancelAddEmployee");
  cancelButton.setAttribute('data-action', 'addEmployee');

  var closeButton = document.getElementById("closeAddEmployee");
  closeButton.setAttribute('data-action', 'addEmployee');
    
    // Lắng nghe sự kiện khi click vào nút Save
    saveButton.addEventListener("click",addEmployeeButtonClickHandler);

    // Thêm sự kiện click cho nút cancelAddEmployee để ẩn phần tử addEmployee và .hide-show-information
cancelButton.addEventListener("click", cancelEmployeeButtonClickHandler);

// Thêm sự kiện click cho nút closeAddEmployee để ẩn phần tử addEmployee và .hide-show-information
closeButton.addEventListener("click", closeEmployeeButtonClickHandler);
}

function cancelEmployeeButtonClickHandler() {
  hideAddEmployee();
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

function closeEmployeeButtonClickHandler() {
  hideAddEmployee();
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

function addEmployeeButtonClickHandler() {
  if (action === 'addEmployee') {   
    console.log("Kiểm tra hiển thị về employeeId addEmployee", employeeId);
    
    var isValid = validateAndFocusInvalidField();
    if (!isValid) {
      console.log("Điều kiện của hợp lệ !validateAndFocusInvalidField() để tiếp tục thực thi !isValid: ", isValid);
      return; // Ngăn chặn hành động tiếp theo nếu thông tin không hợp lệ
    } else if (isValid){ 
      console.log("Điều kiện của hợp lệ validateAndFocusInvalidField() để tiếp tục thực thi isValid: ", isValid);
      var ifIsNotExists = validateAndFocusExistsField(); // ifIsNotExists = true đúng khi không tồn tại hay isExists = false và ngược lại.
      if(!ifIsNotExists){
      console.log("Điều kiện của hợp lệ validateAndFocusInvalidField() để tiếp tục thực thi isValid, !validateAndFocusExistsField(): isExists: ", isValid);
      console.log("Điều kiện của tồn tại !validateAndFocusExistsField() để tiếp tục thực thi isValid, !validateAndFocusExistsField(): isExists: ", ifIsNotExists);
        return; // Ngăn chặn hành động tiếp theo nếu thông tin đã tồn tại
      } else if(ifIsNotExists) {
      console.log("Điều kiện của hợp lệ validateAndFocusInvalidField() để tiếp tục thực thi isValid, validateAndFocusExistsField(): !isExists : ", isValid);
      console.log("Điều kiện của tồn tại validateAndFocusExistsField() để tiếp tục thực thi isValid, validateAndFocusExistsField(): !isExists: ", ifIsNotExists);
        // Gọi hàm để khởi tạo
        var employeeGenderInput = initializeGenderInput();
        console.log("gender: ", employeeGenderInput);
        console.log("Add", employeeId);
        onClickAddNewEmployee();
      }
    } return;
  }
}
  
/* Nhiem vu:
     1. Lang nghe su kien onclick, khi nguoi dung click vao button them moi employee
     2. Lay toan bo du lieu nguoi dung nhap vao
     3. Tao ra doi tuong tu cac du lieu nguoi dung nhap vao */
function onClickAddNewEmployee() {
  // Sinh id cho employee
  /* 1. Truy cap cac node de lay duoc du lieu */
  var nodeImg = document.getElementById("previewImg");
  var img = getImageSrc(nodeImg);
  function getImageSrc(nodeImg) {
    var imgSrc = nodeImg.getAttribute("src");
    if (!imgSrc || imgSrc === "#") {
      return "data:image/png;base64,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";
    }
    return imgSrc;
  }

  var nodeCode = document.getElementById("employeeCode");
  var code = nodeCode.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeCode.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeName = document.getElementById("employeeName");
  var name = nodeName.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeName.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodePhone = document.getElementById("phoneNumber");
  var phone = nodePhone.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodePhone.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeSalaryBr = document.getElementById("salaryBranch");
  var salarybr = nodeSalaryBr.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeSalaryBr.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeWorkBr = document.getElementById("workingBranch");
  var workbr = nodeWorkBr.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeWorkBr.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeFirstDay = document.getElementById("firstDay");
  var fday = nodeFirstDay.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeFirstDay.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeEmployeeDepartment = document.getElementById("employeeDepartment");
  var depart = nodeEmployeeDepartment.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeEmployeeDepartment.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeEmployeePosition = document.getElementById("employeePosition");
  var pos = nodeEmployeePosition.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeEmployeePosition.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeAccountNumber = document.getElementById("accountNumber");
  var acc = nodeAccountNumber.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeAccountNumber.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeEmployeeNote = document.getElementById("employeeNote");
  var note = nodeEmployeeNote.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeEmployeeNote.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeIdCard = document.getElementById("idCard");
  var idcard = nodeIdCard.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeIdCard.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeDateOfBirth = document.getElementById("dateOfBirth");
  var birthday = nodeDateOfBirth.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeDateOfBirth.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeGender = document.getElementById("employeeGender");
  var gender = nodeGender.value; // Không cần chuyển về kiểu số
  nodeGender.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeEmployeeAddress = document.getElementById("employeeAddress");
  var address = nodeEmployeeAddress.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeEmployeeAddress.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeEmployeeArea = document.getElementById("employeeArea");
  var area = nodeEmployeeArea.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeEmployeeArea.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeEmployeeEmail = document.getElementById("employeeEmail");
  var email = nodeEmployeeEmail.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeEmployeeEmail.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeCommuneWard = document.getElementById("communeWard");
  var cward = nodeCommuneWard.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeCommuneWard.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeEmployeeFacebook = document.getElementById("employeeFacebook");
  var facebook = nodeEmployeeFacebook.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeEmployeeFacebook.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  /* 2. Tao ra doi tuong tu cac du lieu nguoi dung nhap vao */
  var employeeAdd = creatEmployee(
    img,
    code,
    name,
    phone,
    salarybr,
    workbr,
    fday,
    depart,
    pos,
    acc,
    note,
    idcard,
    birthday,
    gender,
    address,
    area,
    email,
    cward,
    facebook,
    null
  );
  console.log("employee form input: ", employeeAdd);

  /* Buoc 1: lay danh sach employee da co trong local storage */
  /* lay danh sach cu tu duoi local storage len */
  var employeeList = getEmployeeListLocalStorage();
  // Kiểm tra xem mã nhân viên employee.code có phải null hay rỗng không?
  // Nếu employee.code null = eCodeCurrent thì Kiểm tra trong tất cả các employee lấy ra các employee.code có dạng NV{6digit} và tìm ra mã NV lớn nhất đang có là bao nhiêu đặt tên là eCodeMaxCurrent
  // Cập nhật employee.code null đó theo mã động có giá trị chính là giá trị eCodeMaxCurrent +1

  // Sinh mã động cho nhân viên dạng NV000001
  // Kiểm tra xem mã nhân viên employee.code có phải null hay rỗng không?
  if (employeeAdd.code === null || employeeAdd.code === "") {
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
      employeeAdd.code = eCodeCurrent;
    } else {
      var eCodeCurrent = null;
      var existingCodes = employeeListNV.map((employee) => employeeAdd.code);

      // Duyệt qua danh sách nhân viên đã được sắp xếp để tìm mã nhân viên mới
      for (var i = 0; i < employeeListNV.length - 1; i++) {
        var currentCode = parseInt(employeeListNV[i].code.substring(2));
        var nextCode = parseInt(employeeListNV[i + 1].code.substring(2));

        // Nếu có khoảng trống giữa các số nhân viên
        if (nextCode - currentCode > 1) {
          eCodeCurrent =
            prefix + String(currentCode + 1).padStart(digitCount, "0");
          break;
        };
      };

      // Nếu không tìm thấy khoảng trống, tạo ra mã nhân viên mới bằng cách tăng mã nhân viên lớn nhất hiện có thêm một đơn vị
      if (eCodeCurrent === null) {
        var lastEmployeeCode = parseInt(
          employeeListNV[employeeListNV.length - 1].code.substring(2)
        );
        var proposedCode =
          prefix + String(lastEmployeeCode + 1).padStart(digitCount, "0");

        // Kiểm tra xem mã nhân viên mới có trùng với bất kỳ mã nào trong danh sách không
        while (existingCodes.includes(proposedCode)) {
          lastEmployeeCode++;
          proposedCode =
            prefix + String(lastEmployeeCode).padStart(digitCount, "0");
        }

        eCodeCurrent = proposedCode;
      }

      // Sử dụng eCodeCurrent
      employeeAdd.code = eCodeCurrent;
    }

    // Xóa danh sách employeeListNV hoặc trả về null
    employeeListNV = null;
  }

  console.log("employee List: ", employeeList);

  console.log("Hình ảnh của nhân viên vừa nhập vào là: " + employeeAdd.img);

  console.log("Mã của nhân viên là: " + employeeAdd.code);

  console.log("Tên của nhân viên vừa nhập vào là: " + employeeAdd.name);

  console.log(
    "Số điện thoại của nhân viên vừa nhập vào là: " + employeeAdd.phone
  );

  console.log("Email của nhân viên vừa nhập vào là: " + employeeAdd.email);

  console.log("ID của nhân viên vừa nhập vào là: " + employeeAdd.id);

  /* 3. Dua employee vao danh sach */
  employeeList.push(employeeAdd);
  console.log("Danh sách các nhân viên sau khi thêm mới là: ");
  console.log(employeeList);

  /* Buoc 2: Luu tru danh sach employee xuong local storage */
  var jsonEmployeeList = JSON.stringify(employeeList);
  localStorage.setItem("employeeList", jsonEmployeeList);
  closeButtonId("btnSaveApplicationEmployee", "addEmployee");
  // alert("Thêm mới nhân viên thành công");
  toast({
    type:'success',
    message:'Thêm mới nhân viên thành công',
    duration:1000
  });
  
  // Reload lại trang sau khi thêm mới dữ liệu thành công
  console.log("employeeId ở thao tác hiện tại sau khi click button btnSaveApplicationEmployee trong quá trình thêm nhân viên là: ", employeeId);
  // location.reload();
  closeButtonId('btnSaveApplicationEmployee', 'addEmployee');
};

function initializeGenderInput() {
  var employeeMale = document.getElementById("employeeMale");
  var employeeFemale = document.getElementById("employeeFemale");
  var employeeGenderInput = document.getElementById("employeeGender");

  // Mặc định giới tính là "" khi trang được tải
  employeeGenderInput.value = "";

  // Lắng nghe sự kiện thay đổi của các radio buttons
  employeeMale.addEventListener("change", updateGender());
  employeeFemale.addEventListener("change", updateGender());

  // Hàm cập nhật giới tính
  function updateGender() {
    if (employeeMale.checked) {
      employeeGenderInput.value = "Nam";
    } else if (employeeFemale.checked) {
      employeeGenderInput.value = "Nữ";
    } else {
      employeeGenderInput.value = "";
    }
  }
}