// Hiển thị list department
/* Buoc 1:  Lay danh sach department duoi localStorage*/
var jsonDepartmentList = localStorage.getItem("departmentList");
var departmentList;
if (jsonDepartmentList === null) {
  departmentList = []; // Gán một mảng rỗng nếu danh sách chưa tồn tại trong localStorage
} else {
  departmentList = creatDepartment().fromJSONs(jsonDepartmentList);
}
console.log("Department List: ", departmentList);

/* Buoc 2: Chuyen danh sach doi tuong department sang doan HTML */
var HTML = convertDepartmentListToHTML(departmentList);

/* Buoc 3: Gan doan HTML do vao section departmentListId */
var nodeDepartmentListId = document.getElementById("departmentListId");
if (nodeDepartmentListId) {
    nodeDepartmentListId.innerHTML = HTML;
} else {
    console.error("Không tìm thấy phần tử với id 'departmentListId'");
}