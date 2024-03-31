var addProductFormPopup=`
`;
var nodeProductListId = document.getElementById("addProduct");
if (nodeProductListId) {
    nodeProductListId.innerHTML = addProductFormPopup;
} else {
    console.error("Không tìm thấy phần tử với id 'productListId'");
}