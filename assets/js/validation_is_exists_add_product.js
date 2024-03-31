// Hàm kiểm tra tồn tại trong danh sách hay chưa
// Nếu tồn tại thì hàm validateAndFocusExistsFieldProduct() sẽ trả về false
// ngược lại nếu chưa tồn tại thì hàm validateAndFocusExistsFieldProduct() trả về true và tiếp tục thực hiện các bước tiếp theo.
function validateAndFocusExistsFieldProduct(){
    var isExists = false;
    var isValid = !isExists;
    var productList = getProductListLocalStorage();
    
    // Validate is exists product code
    var nodeCode = document.getElementById("productCode");
    var productCode = nodeCode.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
    if (productCode !==null && productCode !==''){
    // Kiểm tra mã số hàng hóa đã tồn tại
      // Kiểm tra kết quả
      if (isExistsOrNot(productList, productCode, "code")) {
        console.log("product code exists in the list.");
        //  alert("product code exists in the list.")
         toastEdit({
            type:'error',
            message:'Mã hàng hóa đã tồn tại',
            duration:3000
          });
        nodeCode.classList.add("exists");
        nodeCode.focus();
        isExists = true;
        isValid = false 
        // return false; // productCode tồn tại trong danh sách thì isExists là true và validateAndFocusExistsFieldProduct() là false
      } else {
        nodeCode.classList.remove("exists")
        console.log("product code does not exist in the list.");
        isExists = false;
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
    // Kiểm tra Mã vạch hàng hóa đã tồn tại
      // Kiểm tra kết quả
      if (isValid && productBarcode !== null && productBarcode !== '') {
      if (isExistsOrNot(productList, productBarcode, "barcode")) {
        console.log("Barcode exists in the list.");
        //  alert("Barcode exists in the list.")
         toastEdit({
            type:'error',
            message:'Mã vạch đã tồn tại',
            duration:3000
          });
        nodeBarcode.classList.add("exists");
        nodeBarcode.focus();
        isExists = true;
        isValid = false; // productBarcode tồn tại trong danh sách thì isExists là true và validateAndFocusExistsFieldProduct() là false
      } else {
        nodeBarcode.classList.remove("exists")
        console.log("Barcode does not exist in the list.");
        isExists = false;
        isValid = true;
      }
    }
    
    // else{
    //   return true; // Trường hợp rỗng thì bỏ qua.
    // }
    
    // Thêm các điều kiện kiểm tra khác nếu cần ở đây
    return isValid;
  }