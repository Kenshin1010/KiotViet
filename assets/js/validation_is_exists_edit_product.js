function validateAndFocusExistsFieldEditProduct(productId){
    var isExistsEdit = false;
    var isValid = !isExistsEdit;
    var productList = getProductListLocalStorage();
    var filteredProductListEdit = productListNotContainCurrentProduct(productList, productId);
    
    // Validate is exists product code
    var nodeCode = document.getElementById("productCode");
    var productCode = nodeCode.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
    if (productCode !==null && productCode !==''){
    // Kiểm tra mã số hàng hóa đã tồn tại
      // Kiểm tra kết quả
      if (isExistsOrNot(filteredProductListEdit, productCode, "code")) {
        console.log("Product code exists in the list.");
        //  alert("Product code exists in the list.")
         toastEdit({
            type:'error',
            message:'Mã hàng hóa đã tồn tại',
            duration:3000
          });
        nodeCode.classList.add("exists");
        nodeCode.focus();
        isExistsEdit = true;
        isValid = false 
        // return false; // productCode tồn tại trong danh sách thì isExistsEdit là true và validateAndFocusExistsField() là false
      } else {
        nodeCode.classList.remove("exists")
        console.log("Product code does not exist in the list.");
        isExistsEdit = false;
        isValid = true;
        // return true;
      }
    } 
    // else{
    //   return true; // Trường hợp rỗng thì bỏ qua
    // }
    
    // Validate is exists product productBarcode
    var nodeBarcode = document.getElementById("productBarcode");
    var productBarcode = nodeBarcode.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
    // Kiểm tra mã vạch đã tồn tại
      // Kiểm tra kết quả
      if (isValid && productBarcode !== null && productBarcode !== '') {
      if (isExistsOrNot(filteredProductListEdit, productBarcode, "barcode")) {
        console.log("Barcode exists in the list.");
        //  alert("Barcode exists in the list.")
         toastEdit({
            type:'error',
            message:'Mã vạch đã tồn tại',
            duration:3000
          });
        nodeBarcode.classList.add("exists");
        nodeBarcode.focus();
        isExistsEdit = true;
        isValid = false; // productBarcode tồn tại trong danh sách thì isExistsEdit là true và validateAndFocusExistsField() là false
      } else {
        nodeBarcode.classList.remove("exists")
        console.log("Barcode does not exist in the list.");
        isExistsEdit = false;
        isValid = true;
      }
    }
    
    // else{
    //   return true; // Trường hợp rỗng thì bỏ qua.
    // }
    
    // Thêm các điều kiện kiểm tra khác nếu cần ở đây
    return isValid;
  }