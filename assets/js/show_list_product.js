// Hiển thị list product
/* Buoc 1:  Lay danh sach product duoi localStorage*/
var jsonProductList = localStorage.getItem("productList");
var productList;
if (jsonProductList === null) {
  productList = []; // Gán một mảng rỗng nếu danh sách chưa tồn tại trong localStorage
} else {
  productList = creatProduct().fromJSONs(jsonProductList);
}
console.log("Product List: ", productList);

/* Buoc 2: Chuyen danh sach doi tuong product sang doan HTML */
var HTML = convertProductListToHTML(productList);

// Sử dụng hàm để kiểm tra đóng mở các thẻ tags
var result = checkHTMLTags(HTML);
console.log("Kiểm tra đóng mở các thẻ tags: ", result);

/* Buoc 3: Gan doan HTML do vao section productListId */
var nodeProductListId = document.getElementById("productListId");
if (nodeProductListId) {
    nodeProductListId.innerHTML = HTML;
} else {
    console.error("Không tìm thấy phần tử với id 'productListId'");
}