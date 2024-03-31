// Hiển thị list employee
/* Buoc 1:  Lay danh sach employee duoi localStorage*/
var jsonEmployeeList = localStorage.getItem("employeeList");
var employeeList;
if (jsonEmployeeList === null) {
  employeeList = []; // Gán một mảng rỗng nếu danh sách chưa tồn tại trong localStorage
} else {
  employeeList = creatEmployee().fromJSONs(jsonEmployeeList);
}
console.log("Employee List: ", employeeList);

/* Buoc 2: Chuyen danh sach doi tuong employee sang doan HTML */
var HTML = convertEmployeeListToHTML(employeeList);

/* Buoc 3: Gan doan HTML do vao section employeeListId */
var nodeEmployeeListId = document.getElementById("employeeListId");
if (nodeEmployeeListId) {
    nodeEmployeeListId.innerHTML = HTML;
} else {
    console.error("Không tìm thấy phần tử với id 'employeeListId'");
}