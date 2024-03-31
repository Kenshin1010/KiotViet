document.addEventListener("DOMContentLoaded", function() {
    var activeRadio = document.getElementById("positionActive");
    var inactiveRadio = document.getElementById("positionInactive");
    var positionStatusInput = document.getElementById("positionStatus");

    // Mặc định trạng thái là "Hoạt động" khi trang được tải
    positionStatusInput.value = "Hoạt động";

    // Lắng nghe sự kiện thay đổi của các radio buttons
    activeRadio.addEventListener("change", updateStatus);
    inactiveRadio.addEventListener("change", updateStatus);

    // Hàm cập nhật trạng thái
    function updateStatus() {
        if (activeRadio.checked) {
            positionStatusInput.value = "Hoạt động";
        } else if (inactiveRadio.checked) {
            positionStatusInput.value = "Ngừng hoạt động";
        }
    }

    // Lắng nghe sự kiện khi click vào nút Save
    var saveButton = document.getElementById("btnSavePosition");
    saveButton.addEventListener("click", function() {
        // Kiểm tra nếu trạng thái đang rỗng, sử dụng trạng thái hiện tại của radio button
        if (positionStatusInput.value === "") {
            updateStatus(); // Cập nhật trạng thái
        }
        // Tiếp tục xử lý lưu dữ liệu

        // Reload lại trang sau khi lưu dữ liệu thành công
        // location.reload();
    });
});

/* Buoc 1: lay danh sach position da co trong local storage */
var positionList = JSON.parse(localStorage.getItem("positionList"));
if (positionList == null) positionList = []; // Sử dụng mảng rỗng nếu danh sách không tồn tại

/* Nhiem vu:
   1. Lang nghe su kien onclick, khi nguoi dung click vao button them moi position
   2. Lay toan bo du lieu nguoi dung nhap vao
   3. Tao ra doi tuong tu cac du lieu nguoi dung nhap vao */
   function onClickAddNewPosition() {
    console.log("Goi ham onClickAddNewPosition()");
    /* 1. Truy cap cac node de lay duoc du lieu */
    var nodeName = document.getElementById("positionName");
    var name = nodeName.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
    nodeName.value =  ""; // Xóa dữ liệu đã nhập sau khi lấy
  
    var nodeDesc = document.getElementById("positionDesc");
    var desc = nodeDesc.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
    nodeDesc.value = ""; // Xóa dữ liệu đã nhập sau khi lấy
  
    var nodeStatus = document.getElementById("positionStatus");
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
    var position = creatPosition(
        name,
        // cleanDescription(desc),
        desc,
        status,
        null
    );
    console.log("position form input: ", position);

    /* lay danh sach cu tu duoi local storage len */
    var jsonPositionList = localStorage.getItem("positionList");
    var positionList = JSON.parse(jsonPositionList);
    if (positionList == null) {
        positionList = new Array();
    }
    console.log("position List: ",positionList);

    console.log(
        "Tên của chức danh vừa nhập vào là: " + position.name
    );

    console.log(
        "Mô tả của chức danh vừa nhập vào là: " + position.desc
    );

    console.log(
        "Trạng thái của chức danh vừa nhập vào là: " + position.status
    );

    console.log(
        "ID của chức danh vừa nhập vào là: " + position.id
    );

    /* 3. Dua position vao danh sach */
    positionList.push(position);
    console.log("Danh sách các chức danh sau khi thêm mới là: ");
    console.log(positionList);

    /* Buoc 2: Luu tru danh sach position xuong local storage */
    var jsonPositionList = JSON.stringify(positionList);
    localStorage.setItem("positionList", jsonPositionList);
    // alert("Thêm mới chức danh thành công");
    toast({
        type:'success',
        message:'Thêm mới chức danh thành công',
        duration:1000
      });
}