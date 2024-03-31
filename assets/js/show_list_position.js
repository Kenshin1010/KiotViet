// Hiển thị list position
/* Buoc 1:  Lay danh sach position duoi localStorage*/
var jsonPositionList = localStorage.getItem("positionList");
var positionList;
if (jsonPositionList === null) {
  positionList = []; // Gán một mảng rỗng nếu danh sách chưa tồn tại trong localStorage
} else {
  positionList = creatPosition().fromJSONs(jsonPositionList);
}
console.log("Position List: ", positionList);

/* Buoc 2: Chuyen danh sach doi tuong position sang doan HTML */
var HTML = convertPositionListToHTML(positionList);

/* Buoc 3: Gan doan HTML do vao section positionListId */
var nodePositionListId = document.getElementById("positionListId");
if (nodePositionListId) {
    nodePositionListId.innerHTML = HTML;
} else {
    console.error("Không tìm thấy phần tử với id 'positionListId'");
}