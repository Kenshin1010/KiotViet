var productId = null;
var action = ''; // Khai báo biến action ở ngoài sự kiện click của nút "Edit Product"
var cancelButtonClickedEdit = false;
var closeButtonClickedEdit = false;

// Lắng nghe sự kiện click trên tất cả các nút "Edit Product"
document.querySelectorAll(".btn-edit-product-service").forEach(function (button) {
  button.addEventListener("click", editServiceForm);
});
function editServiceForm() {
    // toggleDisplay(button.getAttribute('id'), '.add-product', 'productName');
    this.setAttribute('data-action', 'editService');
    action = this.getAttribute('data-action');
    console.log(action);

    var cancelButton = document.getElementById("cancelAddProduct");
    cancelButton.setAttribute('data-action', 'editService');

var closeButton = document.getElementById("closeAddProduct");
closeButton.setAttribute('data-action', 'editService');

// Cập nhật giá trị data-action cho nút #btnSaveApplicationProduct
var saveButton = document.getElementById("btnSaveApplicationProduct");
saveButton.setAttribute('data-action', 'editService');

    productId = this.getAttribute("data-product-id");
    console.log("productId nhận được khi click button cập nhật: ", productId);

    

  // Thêm title tương ứng
  document.getElementById('titleAddProduct').innerText = 'Sửa dịch vụ';
      
    // Tìm phần tử tr.table-row-data có cùng data-product-id
    var targetRow = document.querySelector(
      'tr.table-row-data[data-product-id="' + productId + '"]'
    );
    if (targetRow) {
      // Lấy vị trí top và right của targetRow
      // var targetRect = targetRow.getBoundingClientRect();
      // var targetTop = targetRect.top + window.scrollY;
      // var targetLeft = targetRect.left + window.scrollX;
  
      // Đặt lại thuộc tính top và left của phần tử .add-product
      var addProduct = document.getElementById("addProduct");
      // addProduct.style.sellingition = "fixed";
      // addProduct.style.top = targetTop + 59 + "px";
      // addProduct.style.left = targetLeft - 100 + "px"; // Để tạo khoảng cách bên trái lùi lại 100px so với tr
      // addProduct.style.right = "auto"; // Đặt lại thuộc tính left thành 'auto'
      addProduct.style.display = "block";
      focusOnInput("productCode");

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
  
      // var informationDiv = document.querySelector(".hide-show-information");
      // informationDiv.style.display = "block";
    }
  
    // Gọi hàm fillProductData để điền dữ liệu của dịch vụ vào form
    var editedProduct = fillProductData(productId);
    console.log("editedProduct: ", editedProduct);
  
    // Lấy thông tin dịch vụ đang chỉnh sửa
    // var productEditing = getProductById(productId);
    // console.log("productEditing: ", productEditing);
  
    // Lấy danh sách dịch vụ
    var productList = getProductListLocalStorage();
  
    // Tạo danh sách dịch vụ không chứa dịch vụ đang chỉnh sửa
    var filteredProductListEdit = productListNotContainCurrentProduct(
      productList,
      productId
    );
    console.log("filteredProductListEdit: ", filteredProductListEdit);

    // Gọi hàm để xử lý sự kiện nhập barcode
    document
    .getElementById("productBarcode")
    .addEventListener("input", function() {
      handleBarcodeInput("productBarcode");
    });
  
    // Sử dụng Number.toLocaleString để chuyển đổi số thành chuỗi với định dạng có dấu phẩy
    document
      .getElementById("costPrice")
      .addEventListener("input", function () {
        formatInputValue("costPrice");
      });
  
    document
      .getElementById("sellingPrice")
      .addEventListener("input", function () {
        formatInputValue("sellingPrice");
      });
  
    document
      .getElementById("productInventory")
      .addEventListener("input", function () {
        formatInputValue("productInventory");
      });
  
    document
      .getElementById("productWeightNumber")
      .addEventListener("input", function () {
        formatInputValue("productWeightNumber");
      });
  
    document
      .getElementById("minInventory")
      .addEventListener("input", function () {
        formatInputValue("minInventory");
      });
  
    document
      .getElementById("maxInventory")
      .addEventListener("input", function () {
        formatInputValue("maxInventory");
      });

      // Lắng nghe sự kiện khi click vào nút Save
      saveButton.addEventListener("click", editServiceButtonClickHandler);

// Sự kiện click cho nút cancelAddProduct
cancelButton.addEventListener("click", cancelEditServiceButtonClickHandler);
// Sự kiện click cho nút closeAddProduct
closeButton.addEventListener("click", closeEditServiceButtonClickHandler);


// // Kiểm tra nếu cả hai sự kiện đã không xảy ra
// if (!cancelButtonClickedEdit && !closeButtonClickedEdit) {
//   console.log(true);
// } else {
//   console.log(false);
// }
  }
  

  function editServiceButtonClickHandler() {
    if (action === "editService") {
      console.log("actionEdit: ", action);
    var isValid = validateAndFocusInvalidFieldProduct(); // Validate product information
    console.log("isValid validateAndFocusInvalidFieldProduct(): ", isValid);
    if (!isValid) {
      return; // Ngăn chặn hành động tiếp theo nếu thông tin không hợp lệ
    } else if (isValid) {
      console.log(
        "Điều kiện của hợp lệ validateAndFocusInvalidFieldProduct() để tiếp tục thực thi isValid: ",
        isValid
      );
      var ifIsNotExistsEdit =
        validateAndFocusExistsFieldEditProduct(productId); // ifIsNotExistsEdit = true đúng khi không tồn tại hay isExists = false và ngược lại.
      if (!ifIsNotExistsEdit) {
        console.log(
          "Điều kiện của hợp lệ validateAndFocusInvalidFieldProduct() để tiếp tục thực thi isValid, !validateAndFocusExistsFieldEdit(): isExists: ",
          isValid
        );
        console.log(
          "Điều kiện của tồn tại !validateAndFocusExistsFieldEdit() để tiếp tục thực thi isValid, !validateAndFocusExistsFieldEdit(): isExists: ",
          ifIsNotExistsEdit
        );
        return; // Ngăn chặn hành động tiếp theo nếu thông tin đã tồn tại
      } else if (ifIsNotExistsEdit) {
        console.log(
          "Điều kiện của hợp lệ validateAndFocusInvalidFieldProduct() để tiếp tục thực thi isValid, validateAndFocusExistsFieldEdit(): !isExists : ",
          isValid
        );
        console.log(
          "Điều kiện của tồn tại validateAndFocusExistsFieldEdit() để tiếp tục thực thi isValid, validateAndFocusExistsFieldEdit(): !isExists: ",
          ifIsNotExistsEdit
        );
        // Gọi hàm để khởi tạo
        // Nếu productId đã tồn tại, gọi hàm updateProductServiceInList
        // Lấy thông tin từ các trường nhập liệu trong form chỉnh sửa
        console.log("Edit");

        var nodeImg1 = document.getElementById("previewImg1");
        var imgInputFileSrc1 = getImageSrcEdit(nodeImg1);
        var nodeImg2 = document.getElementById("previewImg2");
        var imgInputFileSrc2 = getImageSrcEdit(nodeImg2);
        var nodeImg3 = document.getElementById("previewImg3");
        var imgInputFileSrc3 = getImageSrcEdit(nodeImg3);
        var nodeImg4 = document.getElementById("previewImg4");
        var imgInputFileSrc4 = getImageSrcEdit(nodeImg4);
        var nodeImg5 = document.getElementById("previewImg5");
        var imgInputFileSrc5 = getImageSrcEdit(nodeImg5);

        function getImageSrcEdit(nodeImg) {
          var imgSrc = nodeImg.getAttribute("src");
          if (!imgSrc || imgSrc === "#") {
            return "data:image/png;base64,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";
          }
          return imgSrc;
        }
        var codeInput = document.getElementById("productCode").value;
        /* lay danh sach cu tu duoi local storage len */
        var productList = getProductListLocalStorage();
        // Kiểm tra xem mã dịch vụ product.code có phải null hay rỗng không?
        // Nếu product.code null = eCodeCurrent thì Kiểm tra trong tất cả các product lấy ra các product.code có dạng SP{6digit} và tìm ra mã SP lớn nhất đang có là bao nhiêu đặt tên là eCodeMaxCurrent
        // Cập nhật product.code null đó theo mã động có giá trị chính là giá trị eCodeMaxCurrent +1

        // Sinh mã động cho dịch vụ dạng SP000001
        // Kiểm tra xem mã dịch vụ product.code có phải null hay rỗng không?
        if (codeInput === null || codeInput === "") {
          var prefix = "SP"; // Tiền tố cố định cho mã dịch vụ
          var digitCount = 6; // Số lượng chữ số trong mã dịch vụ

          // Lọc ra các dịch vụ có mã bắt đầu bằng 'SP'
          var productListSP = productList.filter(function (product) {
            // return product.code.startsWith("SP");
            return (
              /^SP\d+$/.test(product.code) && !/^SP0*$/.test(product.code)
            ); // Lọc ra các dịch vụ có mã bắt đầu bằng 'SP' và theo sau là ít nhất một chữ số, loại bỏ trường hợp toàn số 0
          });

          // Sắp xếp danh sách dịch vụ theo thứ tự tăng dần của mã dịch vụ trong mảng productListSP
          productListSP.sort(function (a, b) {
            var codeA = parseInt(a.code.substring(2)); // Lấy số từ mã dịch vụ
            var codeB = parseInt(b.code.substring(2));
            return codeA - codeB;
          });

          if (
            productListSP.length === 0 ||
            productListSP[0].code !== "SP000001"
          ) {
            var eCodeCurrent = prefix + "000001";
            codeInput = eCodeCurrent;
          } else {
            var eCodeCurrent = null;
            var existingCodes = productListSP.map((product) => codeInput);

            // Duyệt qua danh sách dịch vụ đã được sắp xếp để tìm mã dịch vụ mới
            for (var i = 0; i < productListSP.length - 1; i++) {
              var currentCode = parseInt(
                productListSP[i].code.substring(2)
              );
              var nextCode = parseInt(
                productListSP[i + 1].code.substring(2)
              );

              // Nếu có khoảng trống giữa các số dịch vụ
              if (nextCode - currentCode > 1) {
                eCodeCurrent =
                  prefix +
                  String(currentCode + 1).padStart(digitCount, "0");
                break;
              }
              return;
            }

            // Nếu không tìm thấy khoảng trống, tạo ra mã dịch vụ mới bằng cách tăng mã dịch vụ lớn nhất hiện có thêm một đơn vị
            if (eCodeCurrent === null) {
              var lastProductCode = parseInt(
                productListSP[productListSP.length - 1].code.substring(2)
              );
              var proposedCode =
                prefix +
                String(lastProductCode + 1).padStart(digitCount, "0");

              // Kiểm tra xem mã dịch vụ mới có trùng với bất kỳ mã nào trong danh sách không
              while (existingCodes.includes(proposedCode)) {
                lastProductCode++;
                proposedCode =
                  prefix +
                  String(lastProductCode).padStart(digitCount, "0");
              }

              eCodeCurrent = proposedCode;
            }

            // Sử dụng eCodeCurrent
            codeInput = eCodeCurrent;
          }

          // Xóa danh sách productListSP hoặc trả về null
          productListSP = null;
        }

        var barcodeNum = document.getElementById("productBarcode").value;
        var nameInput = document.getElementById("productName").value;
        var groupInput = document.getElementById("productGroup").value;
        var trademarkInput =
          document.getElementById("productTrademark").value;
        var locationInput =
          document.getElementById("productLocation").value;
        var costNum = document.getElementById("costPrice").value;
        var sellingNum = document.getElementById("sellingPrice").value;
        var inventoryNum =
          document.getElementById("productInventory").value;

        var weightNum = document.getElementById(
          "productWeightNumber"
        ).value;
        var weightType = document.getElementById("productWeightType").value;
        var weightInput = document.getElementById("productWeight").value;

        var directBoolean =
          document.getElementById("productDirectSale").value;
        var propertiesSelect =
          document.getElementById("productProperties").value;
        var unitSelect = document.getElementById(
          "productCalculationUnit"
        ).value;
        var minInventoryNum = document.getElementById("minInventory").value;
        var maxInventoryNum = document.getElementById("maxInventory").value;
        var descTextarea = document.getElementById("productDesc").value;
        var noteFormTextarea = document.getElementById(
          "noteFormInvoiceOrder"
        ).value;
        var componentsInput = document.getElementById(
          "commodityComponents"
        ).value;
        var productTypeService = "Dịch vụ";

        // Tạo một đối tượng mới chứa thông tin chỉnh sửa của dịch vụ
        var editedProduct = {
          img1: imgInputFileSrc1,
          img2: imgInputFileSrc2,
          img3: imgInputFileSrc3,
          img4: imgInputFileSrc4,
          img5: imgInputFileSrc5,
          code: codeInput,
          barcode: barcodeNum,
          name: nameInput,
          group: groupInput,
          trademark: trademarkInput,
          location: locationInput,
          cost: costNum,
          selling: sellingNum,
          inventory: inventoryNum,
          weight: weightInput,
          direct: directBoolean,
          properties: propertiesSelect,
          unit: unitSelect,
          mininventory: minInventoryNum,
          maxinventory: maxInventoryNum,
          desc: descTextarea,
          noteform: noteFormTextarea,
          components: componentsInput,
          type: productTypeService,
        };

        updateProductServiceInList(productId, editedProduct);
        // Thực hiện các hành động cần thiết để đóng cửa sổ và trở về product.html
        // window.location.href = "product.html";
      }
    }
  }
    return;
  }

  function cancelEditServiceButtonClickHandler() {
    hideEditProduct();
  console.log("actionAddService: ", action);
  action = ''; // Gán giá trị rỗng cho action
  cancelButtonClickedEdit = true;
  return;
  }
  
  function closeEditServiceButtonClickHandler() {
    hideEditProduct();
  console.log("actionAddService: ", action);
  action = ''; // Gán giá trị rỗng cho action
  closeButtonClickedEdit = true;
  return;
  }

// Fill Data & Edit Update
function fillProductData(productId) {
  // Lấy danh sách dịch vụ từ localStorage
  var productList = JSON.parse(localStorage.getItem("productList"));

  // Tìm dịch vụ cần chỉnh sửa trong danh sách dịch vụ
  var editedProduct = productList.find(function (product) {
    return product.id === productId;
  });

  // Điền dữ liệu của dịch vụ vào các trường của form chỉnh sửa
  var preview1 = document.getElementById("previewImg1");
  preview1.src = editedProduct.img1;
  preview1.style.display = "block";
  var preview2 = document.getElementById("previewImg2");
  preview2.src = editedProduct.img2;
  preview2.style.display = "block";
  var preview3 = document.getElementById("previewImg3");
  preview3.src = editedProduct.img3;
  preview3.style.display = "block";
  var preview4 = document.getElementById("previewImg4");
  preview4.src = editedProduct.img4;
  preview4.style.display = "block";
  var preview5 = document.getElementById("previewImg5");
  preview5.src = editedProduct.img5;
  preview5.style.display = "block";

  document.getElementById("productCode").value = editedProduct.code;
  document.getElementById("productBarcode").value = editedProduct.barcode;
  document.getElementById("productName").value = editedProduct.name;
  document.getElementById("productGroup").value = editedProduct.group;
  document.getElementById("productTrademark").value = editedProduct.trademark;
  document.getElementById("productLocation").value = editedProduct.location;
  document.getElementById("costPrice").value = editedProduct.cost;
  document.getElementById("sellingPrice").value = editedProduct.selling;
  document.getElementById("productInventory").value = editedProduct.inventory;

  document.getElementById("productWeight").value = editedProduct.weight;
  var weightInput = editedProduct.weight;
  var weightNum;
  var weightType;
  if (weightInput) {
    // Tìm vị trí đầu tiên của ký tự không phải là số trong chuỗi weightInput
    var nonDigitIndex = weightInput.search(/\D/);

    // Nếu không tìm thấy ký tự không phải số, có thể chuỗi chỉ chứa số
    if (nonDigitIndex === -1) {
      weightNum = weightInput;
    } else {
      // Nếu tìm thấy ký tự không phải số, tách chuỗi thành phần số và hậu tố
      weightNum = weightInput.substring(0, nonDigitIndex);
      weightType = weightInput.substring(nonDigitIndex);
    }
  }

  // Đặt giá trị cho input với id là "productWeightNumber"
  document.getElementById("productWeightNumber").value = weightNum;

  // Đặt giá trị cho input với id là "productWeightType"
  document.getElementById("productWeightType").value.option = " " + weightType;

  document.getElementById("productDirectSale").value = editedProduct.direct;
  document.getElementById("productProperties").value = editedProduct.properties;
  document.getElementById("productCalculationUnit").value = editedProduct.unit;
  document.getElementById("minInventory").value = editedProduct.mininventory;
  document.getElementById("maxInventory").value = editedProduct.maxinventory;
  document.getElementById("productDesc").value = editedProduct.desc;
  document.getElementById("noteFormInvoiceOrder").value =
    editedProduct.noteform;
  document.getElementById("commodityComponents").value =
    editedProduct.components;
  var productTypeService = "Dịch vụ";
  productTypeService = editedProduct.type;
  // Trả về đối tượng dịch vụ đã chỉnh sửa
  return editedProduct;
}

function updateProductServiceInList(productId, editedProduct) {
  console.log("Goi ham updateProductServiceInList()");

  // Lấy danh sách dịch vụ từ Local Storage
  var productList = JSON.parse(localStorage.getItem("productList"));

  // Tìm dịch vụ có ID tương ứng và cập nhật thông tin
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].id === productId) {
      productList[i].img1 = editedProduct.img1;
      productList[i].img2 = editedProduct.img2;
      productList[i].img3 = editedProduct.img3;
      productList[i].img4 = editedProduct.img4;
      productList[i].img5 = editedProduct.img5;
      productList[i].code = editedProduct.code;
      productList[i].barcode = editedProduct.barcode;
      productList[i].name = editedProduct.name;
      productList[i].group = editedProduct.group;
      productList[i].trademark = editedProduct.trademark;
      productList[i].location = editedProduct.location;
      productList[i].cost = editedProduct.cost;
      productList[i].selling = editedProduct.selling;
      productList[i].inventory = editedProduct.inventory;
      productList[i].weight = editedProduct.weight;
      productList[i].direct = editedProduct.direct;
      productList[i].properties = editedProduct.properties;
      productList[i].unit = editedProduct.unit;
      productList[i].mininventory = editedProduct.mininventory;
      productList[i].maxinventory = editedProduct.maxinventory;
      productList[i].desc = editedProduct.desc;
      productList[i].noteform = editedProduct.noteform;
      productList[i].components = editedProduct.components;
      productList[i].type = editedProduct.type;
      break; // Dừng vòng lặp sau khi cập nhật thông tin
    }
  }

  console.log("product ID: ", productId);
  console.log("Dịch vụ được sửa có mã hàng là: ", editedProduct.code);
  console.log("Update information: ", editedProduct);
  console.log("Product List updated: ", productList);

  // Lưu danh sách dịch vụ đã cập nhật vào Local Storage
  localStorage.setItem("productList", JSON.stringify(productList));

  // alert("Sửa dịch vụ thành công");
  toast({
    type: "success",
    message: "Sửa dịch vụ thành công",
    duration: 1000,
  });

  // // Đặt lại thuộc tính top và right của phần tử .add-product
  // var addProduct = document.getElementById("addProduct");
  // addProduct.style.top = 60 + "px";
  // addProduct.style.left = 0 + "px";
  // addProduct.style.right = 0 + "px";
  // addProduct.style.display = "none";

  // Reload lại trang sau khi sửa dữ liệu thành công
  // location.reload();
  closeButtonId("btnSaveApplicationProduct", "addProduct");
}
