document.addEventListener("DOMContentLoaded", function() {
    var activeRadio = document.getElementById("departmentActive");
    var inactiveRadio = document.getElementById("departmentInactive");
    var departmentStatusInput = document.getElementById("departmentStatus");

    // Mặc định trạng thái là "Hoạt động" khi trang được tải
    departmentStatusInput.value = "Hoạt động";

    // Lắng nghe sự kiện thay đổi của các radio buttons
    activeRadio.addEventListener("change", updateStatus);
    inactiveRadio.addEventListener("change", updateStatus);

    // Hàm cập nhật trạng thái
    function updateStatus() {
        if (activeRadio.checked) {
            departmentStatusInput.value = "Hoạt động";
        } else if (inactiveRadio.checked) {
            departmentStatusInput.value = "Ngừng hoạt động";
        }
    }

    // Lắng nghe sự kiện khi click vào nút Save
    var saveButton = document.getElementById("btnSaveDepartment");
    saveButton.addEventListener("click", function() {
        // Kiểm tra nếu trạng thái đang rỗng, sử dụng trạng thái hiện tại của radio button
        if (departmentStatusInput.value === "") {
            updateStatus(); // Cập nhật trạng thái
        }
        // Tiếp tục xử lý lưu dữ liệu
        onClickAddNewDepartment();
        // closeButton("btnSaveDepartment", ".add-new-department")
        // Reload lại trang sau khi lưu dữ liệu thành công
        // location.reload();
    });
});

/* Buoc 1: lay danh sach department da co trong local storage */
var departmentList = JSON.parse(localStorage.getItem("departmentList"));
if (departmentList == null) departmentList = []; // Sử dụng mảng rỗng nếu danh sách không tồn tại

/* Nhiem vu:
   1. Lang nghe su kien onclick, khi nguoi dung click vao button them moi department
   2. Lay toan bo du lieu nguoi dung nhap vao
   3. Tao ra doi tuong tu cac du lieu nguoi dung nhap vao */
   function onClickAddNewDepartment() {
    console.log("Goi ham onClickAddNewDepartment()");
    /* 1. Truy cap cac node de lay duoc du lieu */
    var nodeName = document.getElementById("departmentName");
    var name = nodeName.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
    nodeName.value =  ""; // Xóa dữ liệu đã nhập sau khi lấy
  
    var nodeDesc = document.getElementById("departmentDesc");
    var desc = nodeDesc.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
    nodeDesc.value = ""; // Xóa dữ liệu đã nhập sau khi lấy
  
    var nodeStatus = document.getElementById("departmentStatus");
    var status = nodeStatus.value; // Không cần chuyển về kiểu số
    nodeStatus.value = ""; // Xóa dữ liệu đã nhập sau khi lấy
  
    // function cleanDescription(desc) {
    //     // Loại bỏ các dòng trống ở đầu và cuối chuỗi
    //     desc = desc.trim();
    //     // Loại bỏ các ký tự xuống dòng không mong muốn
    //     desc = desc.replace(/(\r\n|\n|\r)/gm, "");
    //     return desc;
    // }

    /* 2. Tao ra doi tuong tu cac du lieu nguoi dung nhap vao */
    var department = creatDepartment(
        name,
        // cleanDescription(desc),
        desc,
        status,
        null
    );
    console.log("Department form input: ", department);

    /* lay danh sach cu tu duoi local storage len */
    var jsonDepartmentList = localStorage.getItem("departmentList");
    var departmentList = JSON.parse(jsonDepartmentList);
    if (departmentList == null) {
        departmentList = new Array();
    }
    console.log("Department List: ",departmentList);

    console.log(
        "Tên của phòng ban vừa nhập vào là: " + department.name
    );

    console.log(
        "Mô tả của phòng ban vừa nhập vào là: " + department.desc
    );

    console.log(
        "Trạng thái của phòng ban vừa nhập vào là: " + department.status
    );

    console.log(
        "ID của phòng ban vừa nhập vào là: " + department.id
    );

    /* 3. Dua department vao danh sach */
    departmentList.push(department);
    console.log("Danh sách các phòng ban sau khi thêm mới là: ");
    console.log(departmentList);

    /* Buoc 2: Luu tru danh sach department xuong local storage */
    var jsonDepartmentList = JSON.stringify(departmentList);
    localStorage.setItem("departmentList", jsonDepartmentList);
    
    // alert("Thêm mới phòng ban thành công");
    closeButtonId("btnSaveDepartment", "addNewDepartmentForm");
    
    toast({
        type: 'success', 
        message: "Thêm mới phòng ban thành công", 
        duration: 1000
    });
}