var productId = '';
var action = ''; // Khai báo biến action ở ngoài sự kiện click của nút "Add Product"
var cancelButtonClicked = false;
var closeButtonClicked = false;

// Lắng nghe sự kiện click trên nút "Add product" addComboProductButton
document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById('addComboProductButton').addEventListener('click', addComboForm);
});

 function addComboForm() {
    this.setAttribute('data-action', 'addCombo');
    action = this.getAttribute('data-action');
    console.log(this);
    console.log(event);
    console.log(event.target); // Truy cập chi tiết element được click
    // event.stopPropagation(); // Ngăn chặn bubbling
    // console.log(event.stopPropagation());

    var cancelButton = document.getElementById("cancelAddProduct");
    cancelButton.setAttribute('data-action', 'addCombo');

    var closeButton = document.getElementById("closeAddProduct");
    closeButton.setAttribute('data-action', 'addCombo');
  
    // Cập nhật giá trị data-action cho nút #btnSaveApplicationProduct
    var saveButton = document.getElementById("btnSaveApplicationProduct");
    saveButton.setAttribute('data-action', 'addCombo');

  

    // Thêm title tương ứng
    document.getElementById('titleAddProduct').innerText = 'Thêm combo - đóng gói';

    // Đặt lại thuộc tính top và left của phần tử .add-product
    var addProduct = document.getElementById("addProduct");
    // addProduct.style.sellingition = "fixed";
    // addProduct.style.top = targetTop + 59 + "px";
    // addProduct.style.left = targetLeft - 100 + "px"; // Để tạo khoảng cách bên trái lùi lại 100px so với tr
    // addProduct.style.right = "auto"; // Đặt lại thuộc tính left thành 'auto'
    addProduct.style.display = "block";
    focusOnInput("productCode");

  //   // Thêm sự kiện hiển thị div "add-product" khi click vào button #addComboProductButton
  // showDiv("addComboProductButton", ".add-product");
    
    // Thêm sự kiện hiển thị div "tab-content" khi click vào button #addComboProductButton
    showDiv("addComboProductButton", ".tab-content");

    var infoLink = document.querySelector('.active-info-product');
    var detailLink = document.querySelector('.active-detail-product');
    var ingredientLink = document.querySelector('.active-ingredient-product');
    var infoDiv = document.querySelector('.tab-content-form-product');
    var detailDiv = document.querySelector('.detail-product');
    var ingredientDiv = document.querySelector('.ingredient-product');

    // Mặc định hiển thị tab thông tin
    infoDiv.style.display = 'block';
    detailDiv.style.display = 'none';
    ingredientDiv.style.display = 'none';
    infoLink.classList.add('active');
    infoLink.classList.remove('remove-active');
    detailLink.classList.add('remove-active');
    detailLink.classList.remove('active');
    ingredientLink.classList.add('remove-active');
    ingredientLink.classList.remove('active');

    // Gọi hàm để xử lý sự kiện nhập barcode
    document.getElementById("productBarcode").addEventListener("input", function() {
      handleBarcodeInput("productBarcode");
    });

    // Sử dụng Number.toLocaleString để chuyển đổi số thành chuỗi với định dạng có dấu phẩy
   document.getElementById("costPrice").addEventListener("input", function() {
    formatInputValue("costPrice");
  });
  
  document.getElementById("sellingPrice").addEventListener("input", function() {
    formatInputValue("sellingPrice");
  });
  
  document.getElementById("productInventory").addEventListener("input", function() {
    formatInputValue("productInventory");
  });
  
  document.getElementById("productWeightNumber").addEventListener("input", function() {
    formatInputValue("productWeightNumber");
  });
  
  document.getElementById("minInventory").addEventListener("input", function() {
    formatInputValue("minInventory");
  });
  
  document.getElementById("maxInventory").addEventListener("input", function() {
    formatInputValue("maxInventory");
  });
  
  // Lắng nghe sự kiện khi click vào nút Save
  saveButton.addEventListener("click", addComboButtonClickHandler);

  // Sự kiện click cho nút cancelAddProduct
cancelButton.addEventListener("click", cancelComboButtonClickHandler);
// Sự kiện click cho nút closeAddProduct
closeButton.addEventListener("click", closeComboButtonClickHandler);

// // Kiểm tra nếu cả hai sự kiện đã không xảy ra
// if (!cancelButtonClicked && !closeButtonClicked) {
// console.log(true);
// } else {
// console.log(false);
// }
  }
  

  function addComboButtonClickHandler() {
    if (action === 'addCombo') {
      console.log("actionAddCombo: ", action);
    console.log("Kiểm tra hiển thị về productId addProduct", productId);
    
    var isValid = validateAndFocusInvalidFieldProduct();
    if (!isValid) {
      console.log("Điều kiện của hợp lệ !validateAndFocusInvalidFieldProduct() để tiếp tục thực thi !isValid: ", isValid);
      return; // Ngăn chặn hành động tiếp theo nếu thông tin không hợp lệ
    } else if (isValid){ 
      console.log("Điều kiện của hợp lệ validateAndFocusInvalidFieldProduct() để tiếp tục thực thi isValid: ", isValid);
      var ifIsNotExists = validateAndFocusExistsFieldProduct(); // ifIsNotExists = true đúng khi không tồn tại hay isExists = false và ngược lại.
      if(!ifIsNotExists){
      console.log("Điều kiện của hợp lệ validateAndFocusInvalidFieldProduct() để tiếp tục thực thi isValid, !validateAndFocusExistsFieldProduct(): isExists: ", isValid);
      console.log("Điều kiện của tồn tại !validateAndFocusExistsFieldProduct() để tiếp tục thực thi isValid, !validateAndFocusExistsFieldProduct(): isExists: ", ifIsNotExists);
        return; // Ngăn chặn hành động tiếp theo nếu thông tin đã tồn tại
      } else if(ifIsNotExists) {
      console.log("Điều kiện của hợp lệ validateAndFocusInvalidFieldProduct() để tiếp tục thực thi isValid, validateAndFocusExistsFieldProduct(): !isExists : ", isValid);
      console.log("Điều kiện của tồn tại validateAndFocusExistsFieldProduct() để tiếp tục thực thi isValid, validateAndFocusExistsFieldProduct(): !isExists: ", ifIsNotExists);
        // Gọi hàm để khởi tạo
        console.log("Add", productId);
        onClickAddNewProductCombo(); 
      }
    }
    } return;
    }

    function cancelComboButtonClickHandler() {
      hideAddProduct();
      console.log("actionAddCombo: ", action);
      action = ''; // Gán giá trị rỗng cho action
      cancelButtonClicked = true;
      }
      
      function closeComboButtonClickHandler() {
      hideAddProduct();
      console.log("actionAddCombo: ", action);
      action = ''; // Gán giá trị rỗng cho action
      closeButtonClicked = true;
      }
  
/* Nhiem vu:
     1. Lang nghe su kien onclick, khi nguoi dung click vao button them moi product
     2. Lay toan bo du lieu nguoi dung nhap vao
     3. Tao ra doi tuong tu cac du lieu nguoi dung nhap vao */
function onClickAddNewProductCombo() {
  // Sinh id cho product
  /* 1. Truy cap cac node de lay duoc du lieu */
  var nodeImg1 = document.getElementById("previewImg1");
  var img1 = getImageSrc(nodeImg1);
  var nodeImg2 = document.getElementById("previewImg2");
  var img2 = getImageSrc(nodeImg2);
  var nodeImg3 = document.getElementById("previewImg3");
  var img3 = getImageSrc(nodeImg3);
  var nodeImg4 = document.getElementById("previewImg4");
  var img4 = getImageSrc(nodeImg4);
  var nodeImg5 = document.getElementById("previewImg5");
  var img5 = getImageSrc(nodeImg5);

  function getImageSrc(nodeImg) {
    var imgSrc = nodeImg.getAttribute("src");
    if (!imgSrc || imgSrc === "#") {
      return "data:image/png;base64,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";
    }
    return imgSrc;
  }

  var nodeCode = document.getElementById("productCode");
  var code = nodeCode.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeCode.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeBarcode = document.getElementById("productBarcode");
  var barcode = nodeBarcode.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeBarcode.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeName = document.getElementById("productName");
  var name = nodeName.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeName.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeGroup = document.getElementById("productGroup");
  var group = nodeGroup.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeGroup.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeTrademark = document.getElementById("productTrademark");
  var trademark = nodeTrademark.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeTrademark.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeLocation = document.getElementById("productLocation");
  var location = nodeLocation.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeLocation.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeCost = document.getElementById("costPrice");
  var cost = nodeCost.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeCost.value = "0"; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeSelling = document.getElementById("sellingPrice");
  var selling = nodeSelling.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeSelling.value = "0"; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeInventory = document.getElementById("productInventory");
  var inventory = nodeInventory.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeInventory.value = "0"; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeWeightNumber = document.getElementById("productWeightNumber");
  var weightNumber = nodeWeightNumber.value; // Loại bỏ khoảng trắng đầu và cuối chuỗi
  var nodeWeightType = document.getElementById("productWeightType");
  var weightType = nodeWeightType.value; // Loại bỏ khoảng trắng đầu và cuối chuỗi
  var nodeWeight = document.getElementById("productWeight");
  nodeWeight.value = weightNumber + ' ' + weightType;
  var weight = nodeWeight.value; // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeWeightNumber.value = ""; // Xóa dữ liệu đã nhập sau khi lấy
  nodeWeightType.value = " gram"; // Xóa dữ liệu đã nhập sau khi lấy
  nodeWeight.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeDirect = document.getElementById("productDirectSale");
  var direct = nodeDirect.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeDirect.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeProperties = document.getElementById("productProperties");
  var properties = nodeProperties.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeProperties.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeUnit = document.getElementById("productCalculationUnit");
  var unit = nodeUnit.value; // Không cần chuyển về kiểu số
  nodeUnit.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeMinInventory = document.getElementById("minInventory");
  var mininventory = nodeMinInventory.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeMinInventory.value = "0"; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeMaxInventory = document.getElementById("maxInventory");
  var maxinventory = nodeMaxInventory.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeMaxInventory.value = "999,999,999"; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeDesc = document.getElementById("productDesc");
  var desc = nodeDesc.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeDesc.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeNoteForm = document.getElementById("noteFormInvoiceOrder");
  var noteform = nodeNoteForm.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeNoteForm.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var nodeComponents = document.getElementById("commodityComponents");
  var components = nodeComponents.value.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi
  nodeComponents.value = ""; // Xóa dữ liệu đã nhập sau khi lấy

  var type = "Combo-đóng gói"; // Trường hợp này đang thêm mới combo-đóng gói
  console.log(type);

  /* 2. Tao ra doi tuong tu cac du lieu nguoi dung nhap vao */
  var productAdd = creatProduct(
    img1,
    img2,
    img3,
    img4,
    img5,
    code,
    barcode,
    name,
    group,
    trademark,
    location,
    cost,
    selling,
    inventory,
    weight,
    direct,
    properties,
    unit,
    mininventory,
    maxinventory,
    desc,
    noteform,
    components,
    type,
    null
  );
  console.log("product form input: ", productAdd);

  /* Buoc 1: lay danh sach product da co trong local storage */
  /* lay danh sach cu tu duoi local storage len */
  var productList = getProductListLocalStorage();
  // Kiểm tra xem mã combo-đóng gói product.code có phải null hay rỗng không?
  // Nếu product.code null = eCodeCurrent thì Kiểm tra trong tất cả các product lấy ra các product.code có dạng SP{6digit} và tìm ra mã SP lớn nhất đang có là bao nhiêu đặt tên là eCodeMaxCurrent
  // Cập nhật product.code null đó theo mã động có giá trị chính là giá trị eCodeMaxCurrent +1

  // Sinh mã động cho combo-đóng gói dạng SP000001
  // Kiểm tra xem mã combo-đóng gói product.code có phải null hay rỗng không?
  if (productAdd.code === null || productAdd.code === "") {
    var prefix = "SP"; // Tiền tố cố định cho mã combo-đóng gói
    var digitCount = 6; // Số lượng chữ số trong mã combo-đóng gói

    // Lọc ra các combo-đóng gói có mã bắt đầu bằng 'SP'
    var productListSP = productList.filter(function (product) {
      // return product.code.startsWith("SP");
      return /^SP\d+$/.test(product.code) && 
      !/^SP0*$/.test(product.code); // Lọc ra các combo-đóng gói có mã bắt đầu bằng 'SP' và theo sau là ít nhất một chữ số, loại bỏ trường hợp toàn số 0
    });

    // Sắp xếp danh sách combo-đóng gói theo thứ tự tăng dần của mã combo-đóng gói trong mảng productListSP
    productListSP.sort(function (a, b) {
      var codeA = parseInt(a.code.substring(2)); // Lấy số từ mã combo-đóng gói
      var codeB = parseInt(b.code.substring(2));
      return codeA - codeB;
    });

    if (
      productListSP.length === 0 ||
      productListSP[0].code !== "SP000001"
    ) {
      var eCodeCurrent = prefix + "000001";
      productAdd.code = eCodeCurrent;
    } else {
      var eCodeCurrent = null;
      var existingCodes = productListSP.map((product) => productAdd.code);

      // Duyệt qua danh sách combo-đóng gói đã được sắp xếp để tìm mã combo-đóng gói mới
      for (var i = 0; i < productListSP.length - 1; i++) {
        var currentCode = parseInt(productListSP[i].code.substring(2));
        var nextCode = parseInt(productListSP[i + 1].code.substring(2));

        // Nếu có khoảng trống giữa các số combo-đóng gói
        if (nextCode - currentCode > 1) {
          eCodeCurrent =
            prefix + String(currentCode + 1).padStart(digitCount, "0");
          break;
        };
      };

      // Nếu không tìm thấy khoảng trống, tạo ra mã combo-đóng gói mới bằng cách tăng mã combo-đóng gói lớn nhất hiện có thêm một đơn vị
      if (eCodeCurrent === null) {
        var lastproductCode = parseInt(
          productListSP[productListSP.length - 1].code.substring(2)
        );
        var prosellingedCode =
          prefix + String(lastproductCode + 1).padStart(digitCount, "0");

        // Kiểm tra xem mã combo-đóng gói mới có trùng với bất kỳ mã nào trong danh sách không
        while (existingCodes.includes(prosellingedCode)) {
          lastproductCode++;
          prosellingedCode =
            prefix + String(lastproductCode).padStart(digitCount, "0");
        }

        eCodeCurrent = prosellingedCode;
      }

      // Sử dụng eCodeCurrent
      productAdd.code = eCodeCurrent;
    }

    // Xóa danh sách productListSP hoặc trả về null
    productListSP = null;
  }

  console.log("product List: ", productList);

  console.log("Hình ảnh của combo-đóng gói vừa nhập vào là: " + productAdd.img);

  console.log("Mã của combo-đóng gói là: " + productAdd.code);

  console.log("Tên của combo-đóng gói vừa nhập vào là: " + productAdd.name);

  console.log(
    "Mã vạch của combo-đóng gói vừa nhập vào là: " + productAdd.barcode
  );

  console.log("Thương hiệu của combo-đóng gói vừa nhập vào là: " + productAdd.trademark);

  console.log("ID của combo-đóng gói vừa nhập vào là: " + productAdd.id);

  /* 3. Dua product vao danh sach */
  productList.push(productAdd);
  console.log("Danh sách các combo-đóng gói sau khi thêm mới là: ");
  console.log(productList);

  /* Buoc 2: Luu tru danh sach product xuong local storage */
  var jsonProductList = JSON.stringify(productList);
  localStorage.setItem("productList", jsonProductList);
  closeButtonId("btnSaveApplicationProduct", "addProduct");
  // alert("Thêm mới combo-đóng gói thành công");
  toast({
    type:'success',
    message:'Thêm mới combo-đóng gói thành công',
    duration:1000
  });
  console.log(type);
  
  // Reload lại trang sau khi thêm mới dữ liệu thành công
  console.log("productId ở thao tác hiện tại sau khi click button btnSaveApplicationProduct trong quá trình thêm combo-đóng gói là: ", productId);
  // location.reload();
  closeButtonId('btnSaveApplicationProduct', 'addProduct');
};