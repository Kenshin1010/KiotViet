function creatProduct(
    previewImg1,
    previewImg2,
    previewImg3,
    previewImg4,
    previewImg5,
    productCode,
    productBarcode,
    productName,
    productGroup,
    productTrademark,
    productLocation,
    costPrice,
    sellingPrice,
    productInventory,
    productWeight,
    productDirectSale,
    productProperties,
    productCalculationUnit,
    minInventory,
    maxInventory,
    productDesc,
    noteFormInvoiceOrder,
    commodityComponents,
    productType,
    productId
  ) {
    
      var product = new Object();
  
      product.img1 = previewImg1;
      product.img2 = previewImg2;
      product.img3 = previewImg3;
      product.img4 = previewImg4;
      product.img5 = previewImg5;
      product.code = productCode;
      product.barcode = productBarcode;
      product.name = productName;
      product.group = productGroup;
      product.trademark = productTrademark;
      product.location = productLocation;
      product.cost = costPrice;
      product.selling = sellingPrice;
      product.inventory = productInventory;
      product.weight = productWeight;
      product.direct = productDirectSale;
      product.properties = productProperties;
      product.unit = productCalculationUnit;
      product.mininventory = minInventory;
      product.maxinventory = maxInventory;
      product.desc = productDesc;
      product.noteform = noteFormInvoiceOrder;
      product.components = commodityComponents;
      product.type = productType;
      product.id = productId;
    
      if (productId != null) {
        product.id = productId;
      } else {
        product.id = creatId();
      }
    
      /* Chuyen ve json */
      product.toJson = function () {
        var json = JSON.stringify(this);
        return json;
      };
    
      /* Chuyen doi tuong tu json ve object co day du thuoc tinh cua object */
      /* Tu json chuyen thanh mot doi tuong day du cac phuong thuc 
                input: json
                output: doi tuong day du
                */
      product.fromJSON = function () {
        var objectFull = new Object();
        /* Buoc 1: chuyen tu json thanh doi tuong */
        var object = JSON.parse(json);
    
        /* Buoc 2: chuyen doi tuong thanh doi tuong day du phuong thuc */
        var objectFull = creatProduct(
            object.img1,
            object.img2,
            object.img3,
            object.img4,
            object.img5,
            object.code,
            object.barcode,
            object.name,
            object.group,
            object.trademark,
            object.location,
            object.cost,
            object.selling,
            object.inventory,
            object.weight,
            object.direct,
            object.properties,
            object.unit,
            object.mininventory,
            object.maxinventory,
            object.desc,
            object.noteform,
            object.components,
            object.type,
            object.id
        );
    
        return objectFull;
      };
    
      /* Tu json cua product tra ve mot danh sach product co day du cac phuong thuc
          Input: json cua danh sach sellingition
          Output: danh sach sellingition day du
           */
      product.fromJSONs = function (jsonProductList) {
        if (!jsonProductList) return []; // Kiểm tra null hoặc undefined
    
        var productListFull = [];
        var productList = JSON.parse(jsonProductList);
    
        for (const product of productList) {
          if (!product) continue; // Bỏ qua nếu dữ liệu không hợp lệ
          var productFull = creatProduct(
              product.img1,
              product.img2,
              product.img3,
              product.img4,
              product.img5,
              product.code,
              product.barcode,
              product.name,
              product.group,
              product.trademark,
              product.location,
              product.cost,
              product.selling,
              product.inventory,
              product.weight,
              product.direct,
              product.properties,
              product.unit,
              product.mininventory,
              product.maxinventory,
              product.desc,
              product.noteform,
              product.components,
              product.type,
              product.id
          );
          productListFull.push(productFull);
      }
        return productListFull;
      };
      return product;
    }
  //   if (!productName || !productBarcode){
  //     throw new Error('Cần có tên hàng và số điện thoại');
  // };
    
  
  
  /* Mo ta: Chuyen mot danh sach doi tuong, thanh mot doan HTML de hien thi duoc danh sach product ra man hinh 
  Input: Danh sach product
  Output: HTML hien thi danh sach product
  */
  function convertProductListToHTML(productList) {
    if (!productList) return ''; // Kiểm tra null hoặc undefined
    
    var HTMLProductList = '<div class="table-body-container">';

    productList.reverse().forEach(function(product) {
      // Kiểm tra loại sản phẩm và chuyển đổi sang HTML tương ứng
      switch(product.type) {
        case "Hàng hóa":
          var htmlProduct = convertProductCommodityToHTML(product);
          HTMLProductList += htmlProduct;
          break;
        case "Dịch vụ":
          var htmlProduct = convertProductServiceToHTML(product);
          HTMLProductList += htmlProduct;
          break;
        case "Combo-đóng gói":
          var htmlProduct = convertProductComboToHTML(product);
          HTMLProductList += htmlProduct;
          break;
        default:
          console.error("Loại sản phẩm không hợp lệ: ", product.type);
      }
    });
  HTMLProductList += '</div>';

  //   for (const product of productList) { // Sử dụng vòng lặp for...of
  //     var htmlProduct = convertProductToHTML(product);
  //     HTMLProductList += htmlProduct;
  // }
  // HTMLProductList += '</div>';
  
    // for (var i = 0; i < productList.length; i++) {
    //   var product = productList[i];
    //   var htmlProduct = convertProductToHTML(product);
    //   HTMLProductList = HTMLProductList + htmlProduct;
    // }
    // HTMLProductList = HTMLProductList + '</tbody>';
  
    return HTMLProductList;
  }
  
  /* Mo ta: Chuyen mot doi tuong thanh mot doan HTML
  Dau vao: Doi tuong
  Dau ra: Doan HTML cua doi tuong do
   */
  function convertProductCommodityToHTML(product) {
    // Tạo một đối tượng product mới từ thông tin của product hiện tại
    var productObject = creatProduct(
      product.img1,
      product.img2,
      product.img3,
      product.img4,
      product.img5,
      product.code,
      product.barcode,
      product.name,
      product.group,
      product.trademark,
      product.location,
      product.cost,
      product.selling,
      product.inventory,
      product.weight,
      product.direct,
      product.properties,
      product.unit,
      product.mininventory,
      product.maxinventory,
      product.desc,
      product.noteform,
      product.components,
      product.type,
      product.id
    );
   
    var productId = product.id;
    var html = "";
    var showDataProductId = creatId();
    var showDetailProductId = creatId(); // Đảm bảo rằng showEditProductId cũng được tạo ra một cách duy nhất
    // var showCreatDynamicCode = creatId();
    var previewImgZoom = creatId();
    var previewImg1Id = creatId();
    var previewImg2Id = creatId();
    var previewImg3Id = creatId();
    var previewImg4Id = creatId();
    var previewImg5Id = creatId();
    var identificationProductBarcode = creatId();
    var showEditProduct = creatId();
    var showPrintCodeStamp = creatId();
    var showCopyProduct = creatId();
    var showStatusProduct = creatId();
    var showRemoveProduct = creatId();
    var showMoreOperationProduct = creatId();
    var operationDetailProductList = creatId();
  
    html +='<tr id="'+showDataProductId+'" for="containerCheckBoxCommodityProduct" class="table-row-data table-row-data-commodity" data-product-id="' + productId + '">\n';
    html +='                  <td class="cell-check">\n';
    html +='                    <label class="container-check-box">\n';
    html +='                      <input id="checkBox1" type="checkbox" />\n';
    html +='                      <span class="checkmark"></span>\n';
    html +='                    </label>\n';
    html +='                  </td>\n';
    html +='                  <td class="cell-img" for="containerCheckBoxCellImgProduct">\n';
    html +='                    <img src="'+product.img1+'" class="img-thumb" />\n';
    html +='                    <div class="img-show">\n';
    html +='                      <img src="'+product.img1+'" class="img-preview" />\n';
    html +='                    </div>\n';
    html +='                  </td>\n';
    html +='                  <td class="product-code" for="containerCheckBoxProductCode">\n';
    html +='                    '+product.code+'\n';
    html +='                  </td>\n';
    html +='                  <td class="barcode" for="containerCheckBoxBarcode">\n';
    html +='                    '+product.barcode+'\n';
    html +='                  </td>\n';
    html +='                  <td class="product-name" for="containerCheckBoxProductName">\n';
    html +='                    '+product.name+'\n';
    html +='                  </td>\n';
    html +='                  <td class="product-group" for="containerCheckBoxProductGroup">'+product.group+'</td>\n';
    html +='                  <td class="product-type" for="containerCheckBoxProductType">'+product.type+'</td>\n';
    html +='                  <td class="sales-channel-link" for="containerCheckBoxSalesChannelLink">'+product.direct+'</td>\n';
    html +='                  <td class="selling-price" for="containerCheckBoxSellingPrice">'+product.selling+'</td>\n';
    html +='                  <td class="cost-price" for="containerCheckBoxCostPrice">\n';
    html +='                    '+product.cost+'\n';
    html +='                  </td>\n';
    html +='                  <td class="trademark" for="containerCheckBoxTrademark">'+product.trademark+'</td>\n';
    html +='                  <td class="inventory" for="containerCheckBoxInventory">'+product.inventory+'</td>\n';
    html +='                  <td class="location" for="containerCheckBoxLocation">'+product.location+'</td>\n';
    html +='                  <td class="guest-booked" for="containerCheckBoxGuestBooked"></td>\n';
    html +='                  <td class="estimated-OOS-date" for="containerCheckBoxEstimatedOOSDate"></td>\n';
    html +='                  <td class="min-inventory" for="containerCheckBoxMinInventory">'+product.mininventory+'</td>\n';
    html +='                  <td class="max-inventory" for="containerCheckBoxMaxInventory">'+product.maxinventory+'</td>\n';
    html +='                  <td class="product-status" for="containerCheckBoxProductStatus"></td>\n';
    html +='\n';
    html +='                </tr>\n';
    html +='                <!-- row-detail -->\n';
    html +='                <tr id="'+showDetailProductId+'" class="row-detail row-detail-commodity" data-product-id="' + productId + '">\n';
    html +='                  <td class="cell-detail">\n';
    html +='                    <div class="make-boder-table"></div>\n';
    html +='                    <div class="product-detail">\n';
    html +='                      <div class="product-detail-container">\n';
    html +='                        <div class="product-detail-menu">\n';
    html +='                          <ul class="product-detail-menu-items">\n';
    html +='                            <li class="product-detail-menu-item">\n';
    html +='                              <span class="detail-item">Thông tin</span>\n';
    html +='                            </li>\n';
    html +='                            <li class="product-detail-menu-item">\n';
    html +='                              <span class="detail-item">Thẻ kho</span>\n';
    html +='                            </li>\n';
    html +='                            <li class="product-detail-menu-item">\n';
    html +='                              <span class="detail-item">Tồn kho</span>\n';
    html +='                            </li>\n';
    html +='                          </ul>\n';
    html +='                        </div>\n';
    html +='\n';
    html +='                        <!-- product-detail-body -->\n';
    html +='                        <div class="product-detail-body">\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <h3 id="identificationProductName" class="identification-item-title">'+product.name+'</h3>\n';
    html +='                                    <ul class="identification-item-direct">\n';
    html +='                                      <li class="identification-item-directly">\n';
    html +='                                        <i class="direct-icon fas fa-solid fa-check"></i>Bán trực tiếp\n';
    html +='                                      </li>\n';
    html +='                                      <li class="identification-item-not-directly">\n';
    html +='                                        <i class="not-direct-icon fas fa-solid fa-times"></i>Không tích điểm\n';
    html +='                                       </li>\n';
    html +='                                    </ul>';
    html +='                                  </div>\n';
    html +='\n';
    html +='                          <div class="form-wrapper product-detail-body-container">\n';
    html +='                            <!-- product-detail-left -->\n';
    html +='                            <div class="product-detail-left">\n';
    html +='                              <div class="profile-img-detail-large">\n';
    html +='                                <div class="wrap-img-detail-large">\n';
    html +='                                  <img id="'+previewImgZoom+'" class="preview-img-detail-large" src="'+product.img1+'"\n';
    html +='                                    alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                </div>\n';
    html +='                              </div>\n';
    html +='                              <div class="profile-img-detail-group">\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg1Id+'" class="preview-img-detail-1" src="'+product.img1+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg2Id+'" class="preview-img-detail-2" src="'+product.img2+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '" />\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg3Id+'" class="preview-img-detail-3" src="'+product.img3+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg4Id+'" class="preview-img-detail-4" src="'+product.img4+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg5Id+'" class="preview-img-detail-5" src="'+product.img5+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                               </div>\n';
    html +='                            </div>\n';
    html +='\n';
    html +='                            <!-- product detail right -->\n';
    html +='                            <div class="product-detail-right">\n';
    html +='                            <div class="product-detail-right-content">\n';
    html +='                              <!-- product-detail-indentification -->\n';
    html +='                              <div class="product-detail-identification">\n';
    html +='                                <!-- identification-group -->\n';
    html +='                                <div class="identification-group">\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Mã hàng:</span>\n';
    html +='                                    <span id="identificationProductCode"\n';
    html +='                                      class="identification-item-code">'+product.code+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Mã vạch:</span>\n';
    html +='                                  <span id="'+identificationProductBarcode+'" class="identification-item-code" data-product-id="' + productId + '">'+product.barcode+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Nhóm hàng:</span>\n';
    html +='                                  <span id="identificationProductGroup" class="identification-item-code">'+product.group+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Loại hàng:</span>\n';
    html +='                                    <span id="identificationproductproperties" class="identification-item-code">'+product.type+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Thương hiệu:</span>\n';
    html +='                                  <span id="identificationProductTrademark" class="identification-item-code">'+product.trademark+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Định mức tồn:</span>\n';
    html +='                                  <span id="identificationProductInventory" class="identification-item-code">'+product.mininventory+'>'+product.maxinventory+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Giá bán:</span>\n'
    html +='                                    <span id="identificationSellingPrice" class="identification-item-code">'+product.selling+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Giá vốn:</span>\n';
    html +='                                    <span id="identificationCostPrice" class="identification-item-code">'+product.cost+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Trọng lượng:</span>\n';
    html +='                                    <span id="identificationProductWeight" class="identification-item-code">'+product.weight+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Vị trí:</span>\n'
    html +='                                  <span id="identificationProductLocation" class="identification-item-code">'+product.location+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                </div>\n';
    html +='                              </div>\n';
    html +='\n';
    html +='                            <!-- product-detail-description -->\n';
    html +='                            <div class="product-detail-description">\n';
    html +='                              <div class="description-group">\n';
    html +='                                <div class="description-item">\n';
    html +='                                  <span class="description-item-name">Mô tả</span>\n';
    html +='                                  <span id="descriptionProductDesc" class="description-item-code">'+product.desc+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                  <div class="description-item">\n';
    html +='                                    <span class="description-item-name">Ghi chú đặt hàng</span>\n';
    html +='                                    <span id="descriptionProductNoteForm" class="description-item-code">'+product.noteform+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                  <div class="description-item">\n';
    html +='                                    <span class="description-item-name">Nhà cung cấp</span>\n';
    html +='                                    <span id="descriptionProductSupplier" class="description-item-code"></span>\n'
    html +='                                  </div>\n';
    html +='\n';
    html +='                              </div>\n';
    html +='                            </div>\n';
    html +='                          </div>\n';
    html +='                        </div>\n';
    html +='                      </div>';
    html +='\n';
    html +='                          <!-- add-edit-product -->\n';
    html +='                          <div class="add-edit-product">\n';
    html +='                            <button id="'+showEditProduct+'" class="btn btn-success btn-success-bottom btn-edit-product" data-action="editCommodity" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-check-square"></i>\n';
    html +='                              <span>Cập nhật</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showPrintCodeStamp+'" class="btn btn-default btn-red-bottom btn-default-product" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-barcode"></i>\n';
    html +='                              <span>In tem mã</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showCopyProduct+'" class="btn btn-success btn-success-bottom btn-copy-product" data-action="copyCommodity" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fa fa-regular fa-copy"></i>\n';
    html +='                              <span>Sao chép</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showStatusProduct+'" class="btn btn-red btn-red-bottom btn-lock-product" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-lock"></i>\n';
    html +='                              <span>Ngừng kinh doanh</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showRemoveProduct+'" class="btn btn-red btn-red-bottom btn-remove-product" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-trash-can"></i>\n';
    html +='                              <span>Xóa</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showMoreOperationProduct+'" class="btn btn-more btn-more-bottom btn-more-product" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-ellipsis-vertical"></i>\n';
    html +='                            </button>\n';
    html +='                  <ul class="operation-detail-list" id="'+operationDetailProductList+'" data-product-id="' + productId + '">\n';
    html +='                    <li>\n';
    html +='                      <button class="operation" id="btnOperationInboxProduct">\n';
    html +='                        <i class="btn-icon fas fa-solid fa-inbox"></i>\n';
    html +='                        <span>Đặt nhập hàng</span>\n';
    html +='                      </button>\n';
    html +='                    </li>\n';
    html +='                    <li>\n';
    html +='                      <button class="operation" id="btnOperationFlatbedProduct">\n';
    html +='                        <i class="btn-icon fas fa-solid fa-cart-flatbed"></i>\n';
    html +='                        <span>Nhập hàng</span>\n';
    html +='                      </button>\n';
    html +='                    </li>\n';
    html +='                  </ul>';
    html +='                        </div>\n';
    html +='                      </div>\n';
    html +='                    </div>\n';
    html +='\n';
    html +='                    </div>\n';
    html +='                  </td>\n';
    html +='                </tr>';
    return html;
  }

// convertHTML price book
function convertPriceBookToHTML(product) {
  // Tạo một đối tượng product mới từ thông tin của product hiện tại
  var productObject = creatProduct(
    product.img1,
    product.img2,
    product.img3,
    product.img4,
    product.img5,
    product.code,
    product.barcode,
    product.name,
    product.group,
    product.trademark,
    product.location,
    product.cost,
    product.selling,
    product.inventory,
    product.weight,
    product.direct,
    product.properties,
    product.unit,
    product.mininventory,
    product.maxinventory,
    product.desc,
    product.noteform,
    product.components,
    product.type,
    product.id
  );
 
  var productId = product.id;
  var html = "";
  var showDataPriceBookId = creatId();
  var inputPriceBookId = creatId();

  html +='<tr id="'+showDataPriceBookId+'" for="containerCheckBoxComboPackaging" class="table-row-data table-row-data-price-book" data-product-id="' + productId + '">\n';
  html +='                  <td class="price-book-code" for="containerCheckBoxPriceBookCode">\n';
  html +='                    '+product.code+'\n';
  html +='                  </td>\n';
  html +='                  <td class="price-book-name" for="containerCheckBoxPriceBookName">\n';
  html +='                    '+product.name+'\n';
  html +='                  </td>\n';
  html +='                  <td class="inventory-price-book" for="containerCheckBoxInventory">'+product.inventory+'</td>\n';
  html +='                  <td class="cost-price-book" for="containerCheckBoxCostPriceBook">\n';
  html +='                    '+product.cost+'\n';
  html +='                  </td>\n';
  html +='                  <td class="last-entry-price-book" for="containerCheckBoxLastEntryPriceBook">'+product.selling+'</td>\n';
  html +='                  <td id="'+inputPriceBookId+'" class="general-price-book" for="containerCheckBoxGeneralPriceBook"> <input type="number" class="form-control general-price-book-input" data-product-id="' + productId + '"></td>\n';
  html +='                </tr>\n';
  return html;
}

  // convertHTML product service
  function convertProductServiceToHTML(product) {
    // Tạo một đối tượng product mới từ thông tin của product hiện tại
    var productObject = creatProduct(
      product.img1,
      product.img2,
      product.img3,
      product.img4,
      product.img5,
      product.code,
      product.barcode,
      product.name,
      product.group,
      product.trademark,
      product.location,
      product.cost,
      product.selling,
      product.inventory,
      product.weight,
      product.direct,
      product.properties,
      product.unit,
      product.mininventory,
      product.maxinventory,
      product.desc,
      product.noteform,
      product.components,
      product.type,
      product.id
    );
   
    var productId = product.id;
    var html = "";
    var showDataProductId = creatId();
    var showDetailProductId = creatId(); // Đảm bảo rằng showEditProductId cũng được tạo ra một cách duy nhất
    // var showCreatDynamicCode = creatId();
    var previewImgZoom = creatId();
    var previewImg1Id = creatId();
    var previewImg2Id = creatId();
    var previewImg3Id = creatId();
    var previewImg4Id = creatId();
    var previewImg5Id = creatId();
    var identificationProductBarcode = creatId();
    var showEditProduct = creatId();
    var showPrintCodeStamp = creatId();
    var showCopyProduct = creatId();
    var showStatusProduct = creatId();
    var showRemoveProduct = creatId();
    var addProductTheSameType = creatId();
  
    html +='<tr id="'+showDataProductId+'" for="containerCheckBoxServiceProduct" class="table-row-data table-row-data-service" data-product-id="' + productId + '">\n';
    html +='                  <td class="cell-check">\n';
    html +='                    <label class="container-check-box">\n';
    html +='                      <input id="checkBox1" type="checkbox" />\n';
    html +='                      <span class="checkmark"></span>\n';
    html +='                    </label>\n';
    html +='                  </td>\n';
    html +='                  <td class="cell-img" for="containerCheckBoxCellImgProduct">\n';
    html +='                    <img src="'+product.img1+'" class="img-thumb" />\n';
    html +='                    <div class="img-show">\n';
    html +='                      <img src="'+product.img1+'" class="img-preview" />\n';
    html +='                    </div>\n';
    html +='                  </td>\n';
    html +='                  <td class="product-code" for="containerCheckBoxProductCode">\n';
    html +='                    '+product.code+'\n';
    html +='                  </td>\n';
    html +='                  <td class="barcode" for="containerCheckBoxBarcode">\n';
    html +='                    '+product.barcode+'\n';
    html +='                  </td>\n';
    html +='                  <td class="product-name" for="containerCheckBoxProductName">\n';
    html +='                    '+product.name+'\n';
    html +='                  </td>\n';
    html +='                  <td class="product-group" for="containerCheckBoxProductGroup">'+product.group+'</td>\n';
    html +='                  <td class="product-type" for="containerCheckBoxProductType">'+product.type+'</td>\n';
    html +='                  <td class="sales-channel-link" for="containerCheckBoxSalesChannelLink">'+product.direct+'</td>\n';
    html +='                  <td class="selling-price" for="containerCheckBoxSellingPrice">'+product.selling+'</td>\n';
    html +='                  <td class="cost-price" for="containerCheckBoxCostPrice">\n';
    html +='                    '+product.cost+'\n';
    html +='                  </td>\n';
    html +='                  <td class="trademark" for="containerCheckBoxTrademark">'+product.trademark+'</td>\n';
    html +='                  <td class="inventory" for="containerCheckBoxInventory">'+product.inventory+'</td>\n';
    html +='                  <td class="location" for="containerCheckBoxLocation">'+product.location+'</td>\n';
    html +='                  <td class="guest-booked" for="containerCheckBoxGuestBooked"></td>\n';
    html +='                  <td class="estimated-OOS-date" for="containerCheckBoxEstimatedOOSDate"></td>\n';
    html +='                  <td class="min-inventory" for="containerCheckBoxMinInventory">'+product.mininventory+'</td>\n';
    html +='                  <td class="max-inventory" for="containerCheckBoxMaxInventory">'+product.maxinventory+'</td>\n';
    html +='                  <td class="product-status" for="containerCheckBoxProductStatus"></td>\n';
    html +='\n';
    html +='                </tr>\n';
    html +='                <!-- row-detail -->\n';
    html +='                <tr id="'+showDetailProductId+'" class="row-detail row-detail-service" data-product-id="' + productId + '">\n';
    html +='                  <td class="cell-detail">\n';
    html +='                    <div class="make-boder-table"></div>\n';
    html +='                    <div class="product-detail">\n';
    html +='                      <div class="product-detail-container">\n';
    html +='                        <div class="product-detail-menu">\n';
    html +='                          <ul class="product-detail-menu-items">\n';
    html +='                            <li class="product-detail-menu-item">\n';
    html +='                              <span class="detail-item">Thông tin</span>\n';
    html +='                            </li>\n';
    html +='                            <li class="product-detail-menu-item">\n';
    html +='                              <span class="detail-item">Thẻ kho</span>\n';
    html +='                            </li>\n';
    html +='                          </ul>\n';
    html +='                        </div>\n';
    html +='\n';
    html +='                        <!-- product-detail-body -->\n';
    html +='                        <div class="product-detail-body">\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <h3 id="identificationProductName" class="identification-item-title">'+product.name+'</h3>\n';
    html +='                                    <ul class="identification-item-direct">\n';
    html +='                                      <li class="identification-item-directly">\n';
    html +='                                        <i class="direct-icon fas fa-solid fa-check"></i>Bán trực tiếp\n';
    html +='                                      </li>\n';
    html +='                                      <li class="identification-item-not-directly">\n';
    html +='                                        <i class="not-direct-icon fas fa-solid fa-times"></i>Không tích điểm\n';
    html +='                                       </li>\n';
    html +='                                    </ul>';
    html +='                                  </div>\n';
    html +='\n';
    html +='                          <div class="form-wrapper product-detail-body-container">\n';
    html +='                            <!-- product-detail-left -->\n';
    html +='                            <div class="product-detail-left">\n';
    html +='                              <div class="profile-img-detail-large">\n';
    html +='                                <div class="wrap-img-detail-large">\n';
    html +='                                  <img id="'+previewImgZoom+'" class="preview-img-detail-large" src="'+product.img1+'"\n';
    html +='                                    alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                </div>\n';
    html +='                              </div>\n';
    html +='                              <div class="profile-img-detail-group">\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg1Id+'" class="preview-img-detail-1" src="'+product.img1+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg2Id+'" class="preview-img-detail-2" src="'+product.img2+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '" />\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg3Id+'" class="preview-img-detail-3" src="'+product.img3+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg4Id+'" class="preview-img-detail-4" src="'+product.img4+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg5Id+'" class="preview-img-detail-5" src="'+product.img5+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                               </div>\n';
    html +='                            </div>\n';
    html +='\n';
    html +='                            <!-- product detail right -->\n';
    html +='                            <div class="product-detail-right">\n';
    html +='                            <div class="product-detail-right-content">\n';
    html +='                              <!-- product-detail-indentification -->\n';
    html +='                              <div class="product-detail-identification">\n';
    html +='                                <!-- identification-group -->\n';
    html +='                                <div class="identification-group">\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Mã hàng:</span>\n';
    html +='                                    <span id="identificationProductCode"\n';
    html +='                                      class="identification-item-code">'+product.code+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Mã vạch:</span>\n';
    html +='                                  <span id="'+identificationProductBarcode+'" class="identification-item-code" data-product-id="' + productId + '">'+product.barcode+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Nhóm hàng:</span>\n';
    html +='                                  <span id="identificationProductGroup" class="identification-item-code">'+product.group+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Loại hàng:</span>\n';
    html +='                                    <span id="identificationproductproperties" class="identification-item-code">'+product.type+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Thương hiệu:</span>\n';
    html +='                                  <span id="identificationProductTrademark" class="identification-item-code">'+product.trademark+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Định mức tồn:</span>\n';
    html +='                                  <span id="identificationProductInventory" class="identification-item-code">'+product.mininventory+' > '+product.maxinventory+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Giá bán:</span>\n'
    html +='                                    <span id="identificationSellingPrice" class="identification-item-code">'+product.selling+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Giá vốn:</span>\n';
    html +='                                    <span id="identificationCostPrice" class="identification-item-code">'+product.cost+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Trọng lượng:</span>\n';
    html +='                                    <span id="identificationProductWeight" class="identification-item-code">'+product.weight+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Vị trí:</span>\n'
    html +='                                  <span id="identificationProductLocation" class="identification-item-code">'+product.location+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                </div>\n';
    html +='                              </div>\n';
    html +='\n';
    html +='                            <!-- product-detail-description -->\n';
    html +='                            <div class="product-detail-description">\n';
    html +='                              <div class="description-group">\n';
    html +='                                <div class="description-item">\n';
    html +='                                  <span class="description-item-name">Mô tả</span>\n';
    html +='                                  <span id="descriptionProductDesc" class="description-item-code">'+product.desc+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                  <div class="description-item">\n';
    html +='                                    <span class="description-item-name">Ghi chú đặt hàng</span>\n';
    html +='                                    <span id="descriptionProductNoteForm" class="description-item-code">'+product.noteform+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                  <div class="description-item">\n';
    html +='                                    <span class="description-item-name">Nhà cung cấp</span>\n';
    html +='                                    <span id="descriptionProductSupplier" class="description-item-code"></span>\n'
    html +='                                  </div>\n';
    html +='\n';
    html +='                              </div>\n';
    html +='                            </div>\n';
    html +='                          </div>\n';
    html +='                        </div>\n';
    html +='                      </div>';
    html +='\n';
    html +='                          <!-- add-edit-product -->\n';
    html +='                          <div class="add-edit-product">\n';
    html +='                            <button id="'+showEditProduct+'" class="btn btn-success btn-success-bottom btn-edit-product-service" data-action="editService" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-check-square"></i>\n';
    html +='                              <span>Cập nhật</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showPrintCodeStamp+'" class="btn btn-default btn-red-bottom btn-default-product-service" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-barcode"></i>\n';
    html +='                              <span>In tem mã</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showCopyProduct+'" class="btn btn-success btn-success-bottom btn-copy-product-service" data-action="copyService" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fa fa-regular fa-copy"></i>\n';
    html +='                              <span>Sao chép</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showStatusProduct+'" class="btn btn-red btn-red-bottom btn-lock-product-service" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-lock"></i>\n';
    html +='                              <span>Ngừng kinh doanh</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showRemoveProduct+'" class="btn btn-red btn-red-bottom btn-remove-product-service" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-trash-can"></i>\n';
    html +='                              <span>Xóa</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+addProductTheSameType+'" class="btn btn-primary btn-primary-bottom btn-primary-code btn-add-same-product-service" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-primary-icon fas fa-solid fa-plus"></i>\n';
    html +='                              <span>Thêm hàng hóa cùng loại</span>\n';
    html +='                            </button>\n';
    html +='\n';
    html +='                        </div>\n';
    html +='                      </div>\n';
    html +='                    </div>\n';
    html +='\n';
    html +='                    </div>\n';
    html +='                  </td>\n';
    html +='                </tr>';
    return html;
  }

  // convertHTML product combo
  function convertProductComboToHTML(product) {
    // Tạo một đối tượng product mới từ thông tin của product hiện tại
    var productObject = creatProduct(
      product.img1,
      product.img2,
      product.img3,
      product.img4,
      product.img5,
      product.code,
      product.barcode,
      product.name,
      product.group,
      product.trademark,
      product.location,
      product.cost,
      product.selling,
      product.inventory,
      product.weight,
      product.direct,
      product.properties,
      product.unit,
      product.mininventory,
      product.maxinventory,
      product.desc,
      product.noteform,
      product.components,
      product.type,
      product.id
    );
   
    var productId = product.id;
    var html = "";
    var showDataProductId = creatId();
    var showDetailProductId = creatId(); // Đảm bảo rằng showEditProductId cũng được tạo ra một cách duy nhất
    var previewImgZoom = creatId();
    var previewImg1Id = creatId();
    var previewImg2Id = creatId();
    var previewImg3Id = creatId();
    var previewImg4Id = creatId();
    var previewImg5Id = creatId();
    var identificationProductBarcode = creatId();
    var showEditProduct = creatId();
    var showPrintCodeStamp = creatId();
    var showCopyProduct = creatId();
    var showStatusProduct = creatId();
    var showRemoveProduct = creatId();
  
    html +='<tr id="'+showDataProductId+'" for="containerCheckBoxComboPackaging" class="table-row-data table-row-data-combo" data-product-id="' + productId + '">\n';
    html +='                  <td class="cell-check">\n';
    html +='                    <label class="container-check-box">\n';
    html +='                      <input id="checkBox1" type="checkbox" />\n';
    html +='                      <span class="checkmark"></span>\n';
    html +='                    </label>\n';
    html +='                  </td>\n';
    html +='                  <td class="cell-img" for="containerCheckBoxCellImgProduct">\n';
    html +='                    <img src="'+product.img1+'" class="img-thumb" />\n';
    html +='                    <div class="img-show">\n';
    html +='                      <img src="'+product.img1+'" class="img-preview" />\n';
    html +='                    </div>\n';
    html +='                  </td>\n';
    html +='                  <td class="product-code" for="containerCheckBoxProductCode">\n';
    html +='                    '+product.code+'\n';
    html +='                  </td>\n';
    html +='                  <td class="barcode" for="containerCheckBoxBarcode">\n';
    html +='                    '+product.barcode+'\n';
    html +='                  </td>\n';
    html +='                  <td class="product-name" for="containerCheckBoxProductName">\n';
    html +='                    '+product.name+'\n';
    html +='                  </td>\n';
    html +='                  <td class="product-group" for="containerCheckBoxProductGroup">'+product.group+'</td>\n';
    html +='                  <td class="product-type" for="containerCheckBoxProductType">'+product.type+'</td>\n';
    html +='                  <td class="sales-channel-link" for="containerCheckBoxSalesChannelLink">'+product.direct+'</td>\n';
    html +='                  <td class="selling-price" for="containerCheckBoxSellingPrice">'+product.selling+'</td>\n';
    html +='                  <td class="cost-price" for="containerCheckBoxCostPrice">\n';
    html +='                    '+product.cost+'\n';
    html +='                  </td>\n';
    html +='                  <td class="trademark" for="containerCheckBoxTrademark">'+product.trademark+'</td>\n';
    html +='                  <td class="inventory" for="containerCheckBoxInventory">'+product.inventory+'</td>\n';
    html +='                  <td class="location" for="containerCheckBoxLocation">'+product.location+'</td>\n';
    html +='                  <td class="guest-booked" for="containerCheckBoxGuestBooked"></td>\n';
    html +='                  <td class="estimated-OOS-date" for="containerCheckBoxEstimatedOOSDate"></td>\n';
    html +='                  <td class="min-inventory" for="containerCheckBoxMinInventory">'+product.mininventory+'</td>\n';
    html +='                  <td class="max-inventory" for="containerCheckBoxMaxInventory">'+product.maxinventory+'</td>\n';
    html +='                  <td class="product-status" for="containerCheckBoxProductStatus"></td>\n';
    html +='\n';
    html +='                </tr>\n';
    html +='                <!-- row-detail -->\n';
    html +='                <tr id="'+showDetailProductId+'" class="row-detail row-detail-combo" data-product-id="' + productId + '">\n';
    html +='                  <td class="cell-detail">\n';
    html +='                    <div class="make-boder-table"></div>\n';
    html +='                    <div class="product-detail">\n';
    html +='                      <div class="product-detail-container">\n';
    html +='                        <div class="product-detail-menu">\n';
    html +='                          <ul class="product-detail-menu-items">\n';
    html +='                            <li class="product-detail-menu-item">\n';
    html +='                              <span class="detail-item">Thông tin</span>\n';
    html +='                            </li>\n';
    html +='                            <li class="product-detail-menu-item">\n';
    html +='                              <span class="detail-item">Thẻ kho</span>\n';
    html +='                            </li>\n';
    html +='                            <li class="product-detail-menu-item">\n';
    html +='                              <span class="detail-item">Tồn kho</span>\n';
    html +='                            </li>\n';
    html +='                          </ul>\n';
    html +='                        </div>\n';
    html +='\n';
    html +='                        <!-- product-detail-body -->\n';
    html +='                        <div class="product-detail-body">\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <h3 id="identificationProductName" class="identification-item-title">'+product.name+'</h3>\n';
    html +='                                    <ul class="identification-item-direct">\n';
    html +='                                      <li class="identification-item-directly">\n';
    html +='                                        <i class="direct-icon fas fa-solid fa-check"></i>Bán trực tiếp\n';
    html +='                                      </li>\n';
    html +='                                      <li class="identification-item-not-directly">\n';
    html +='                                        <i class="not-direct-icon fas fa-solid fa-times"></i>Không tích điểm\n';
    html +='                                       </li>\n';
    html +='                                    </ul>';
    html +='                                  </div>\n';
    html +='\n';
    html +='                          <div class="form-wrapper product-detail-body-container">\n';
    html +='                            <!-- product-detail-left -->\n';
    html +='                            <div class="product-detail-left">\n';
    html +='                              <div class="profile-img-detail-large">\n';
    html +='                                <div class="wrap-img-detail-large">\n';
    html +='                                  <img id="'+previewImgZoom+'" class="preview-img-detail-large" src="'+product.img1+'"\n';
    html +='                                    alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                </div>\n';
    html +='                              </div>\n';
    html +='                              <div class="profile-img-detail-group">\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg1Id+'" class="preview-img-detail-1" src="'+product.img1+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg2Id+'" class="preview-img-detail-2" src="'+product.img2+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '" />\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg3Id+'" class="preview-img-detail-3" src="'+product.img3+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg4Id+'" class="preview-img-detail-4" src="'+product.img4+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                                <div class="profile-img-detail">\n';
    html +='                                  <div class="wrap-img-detail">\n';
    html +='                                    <img id="'+previewImg5Id+'" class="preview-img-detail-5" src="'+product.img5+'"\n';
    html +='                                      alt="Preview Image" data-product-id="' + productId + '"/>\n';
    html +='                                  </div>\n';
    html +='                                </div>\n';
    html +='                               </div>\n';
    html +='                            </div>\n';
    html +='\n';
    html +='                            <!-- product detail right -->\n';
    html +='                            <div class="product-detail-right">\n';
    html +='                            <div class="product-detail-right-content">\n';
    html +='                              <!-- product-detail-indentification -->\n';
    html +='                              <div class="product-detail-identification">\n';
    html +='                                <!-- identification-group -->\n';
    html +='                                <div class="identification-group">\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Mã hàng:</span>\n';
    html +='                                    <span id="identificationProductCode"\n';
    html +='                                      class="identification-item-code">'+product.code+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Mã vạch:</span>\n';
    html +='                                  <span id="'+identificationProductBarcode+'" class="identification-item-code" data-product-id="' + productId + '">'+product.barcode+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Nhóm hàng:</span>\n';
    html +='                                  <span id="identificationProductGroup" class="identification-item-code">'+product.group+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Loại hàng:</span>\n';
    html +='                                    <span id="identificationproductproperties" class="identification-item-code">'+product.type+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Thương hiệu:</span>\n';
    html +='                                  <span id="identificationProductTrademark" class="identification-item-code">'+product.trademark+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Định mức tồn:</span>\n';
    html +='                                  <span id="identificationProductInventory" class="identification-item-code">'+product.mininventory+' > '+product.maxinventory+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Giá bán:</span>\n'
    html +='                                    <span id="identificationSellingPrice" class="identification-item-code">'+product.selling+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Giá vốn:</span>\n';
    html +='                                    <span id="identificationCostPrice" class="identification-item-code">'+product.cost+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                  <div class="identification-item">\n';
    html +='                                    <span class="identification-item-name">Trọng lượng:</span>\n';
    html +='                                    <span id="identificationProductWeight" class="identification-item-code">'+product.weight+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                <div class="identification-item">\n';
    html +='                                  <span class="identification-item-name">Vị trí:</span>\n'
    html +='                                  <span id="identificationProductLocation" class="identification-item-code">'+product.location+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                </div>\n';
    html +='                              </div>\n';
    html +='\n';
    html +='                            <!-- product-detail-description -->\n';
    html +='                            <div class="product-detail-description">\n';
    html +='                              <div class="description-group">\n';
    html +='                                <div class="description-item">\n';
    html +='                                  <span class="description-item-name">Mô tả</span>\n';
    html +='                                  <span id="descriptionProductDesc" class="description-item-code">'+product.desc+'</span>\n';
    html +='                                </div>\n';
    html +='\n';
    html +='                                  <div class="description-item">\n';
    html +='                                    <span class="description-item-name">Ghi chú đặt hàng</span>\n';
    html +='                                    <span id="descriptionProductNoteForm" class="description-item-code">'+product.noteform+'</span>\n';
    html +='                                  </div>\n';
    html +='\n';
    html +='                                  <div class="description-item">\n';
    html +='                                    <span class="description-item-name">Nhà cung cấp</span>\n';
    html +='                                    <span id="descriptionProductSupplier" class="description-item-code"></span>\n'
    html +='                                  </div>\n';
    html +='\n';
    html +='                              </div>\n';
    html +='                            </div>\n';
    html +='                          </div>\n';
    html +='                        </div>\n';
    html +='                      </div>';
    html +='\n';
    html +='                          <!-- add-edit-product -->\n';
    html +='                          <div class="add-edit-product">\n';
    html +='                            <button id="'+showEditProduct+'" class="btn btn-success btn-success-bottom btn-edit-product-combo" data-action="editCombo" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-check-square"></i>\n';
    html +='                              <span>Cập nhật</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showPrintCodeStamp+'" class="btn btn-default btn-red-bottom btn-default-product-combo" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-barcode"></i>\n';
    html +='                              <span>In tem mã</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showCopyProduct+'" class="btn btn-success btn-success-bottom btn-copy-product-combo" data-action="copyCombo" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fa fa-regular fa-copy"></i>\n';
    html +='                              <span>Sao chép</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showStatusProduct+'" class="btn btn-red btn-red-bottom btn-lock-product-combo" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-lock"></i>\n';
    html +='                              <span>Ngừng kinh doanh</span>\n';
    html +='                            </button>\n';
    html +='                            <button id="'+showRemoveProduct+'" class="btn btn-red btn-red-bottom btn-remove-product-combo" data-product-id="' + productId + '">\n';
    html +='                              <i class="btn-success-icon fas fa-solid fa-trash-can"></i>\n';
    html +='                              <span>Xóa</span>\n';
    html +='                            </button>\n';
    html +='                        </div>\n';
    html +='                      </div>\n';
    html +='                    </div>\n';
    html +='\n';
    html +='                    </div>\n';
    html +='                  </td>\n';
    html +='                </tr>';
    return html;
  }


  // convertHTML priceBookList
  function convertPriceBookListToHTML(productList) {
    if (!productList) return ''; // Kiểm tra null hoặc undefined
    
    var HTMLPriceBookList = '<div class="table-body-container">';

    productList.reverse().forEach(function(product) {
      
          var htmlPriceBook = convertPriceBookToHTML(product);
          HTMLPriceBookList += htmlPriceBook;
      });

      HTMLPriceBookList += '</div>';

  //   for (const product of productList) { // Sử dụng vòng lặp for...of
  //     var htmlPriceBook = convertProductToHTML(product);
  //     HTMLPriceBookList += htmlPriceBook;
  // }
  // HTMLPriceBookList += '</div>';
  
    // for (var i = 0; i < productList.length; i++) {
    //   var product = productList[i];
    //   var htmlPriceBook = convertProductToHTML(product);
    //   HTMLPriceBookList = HTMLPriceBookList + htmlPriceBook;
    // }
    // HTMLPriceBookList = HTMLPriceBookList + '</tbody>';
  
    return HTMLPriceBookList;
  }

  // convertHTML price book
function convertPriceBookToHTML(product) {
  // Tạo một đối tượng product mới từ thông tin của product hiện tại
  var productObject = creatProduct(
    product.img1,
    product.img2,
    product.img3,
    product.img4,
    product.img5,
    product.code,
    product.barcode,
    product.name,
    product.group,
    product.trademark,
    product.location,
    product.cost,
    product.selling,
    product.inventory,
    product.weight,
    product.direct,
    product.properties,
    product.unit,
    product.mininventory,
    product.maxinventory,
    product.desc,
    product.noteform,
    product.components,
    product.type,
    product.id
  );
 
  var productId = product.id;
  var html = "";
  var showDataPriceBookId = creatId();
  var inputPriceBookId = creatId();

  html +='<tr id="'+showDataPriceBookId+'" for="containerCheckBoxComboPackaging" class="table-row-data table-row-data-price-book" data-product-id="' + productId + '">\n';
  html +='                  <td class="price-book-code" for="containerCheckBoxPriceBookCode">\n';
  html +='                    '+product.code+'\n';
  html +='                  </td>\n';
  html +='                  <td class="price-book-name" for="containerCheckBoxPriceBookName">\n';
  html +='                    '+product.name+'\n';
  html +='                  </td>\n';
  html +='                  <td class="inventory-price-book" for="containerCheckBoxInventory">'+product.inventory+'</td>\n';
  html +='                  <td class="cost-price-book" for="containerCheckBoxCostPriceBook">\n';
  html +='                    '+product.cost+'\n';
  html +='                  </td>\n';
  html +='                  <td class="last-entry-price-book" for="containerCheckBoxLastEntryPriceBook">'+product.selling+'</td>\n';
  html +='                  <td class="general-price-book" for="containerCheckBoxGeneralPriceBook"><input id="'+inputPriceBookId+'" type="text" class="form-control general-price-book-input" data-product-id="' + productId + '" value="'+product.selling+'"></td>\n';
  html +='                </tr>\n';
  return html;
}

// convertHTML stockTakeList
function convertStockTakeListToHTML(productList) {
  if (!productList) return ''; // Kiểm tra null hoặc undefined
  
  var HTMLStockTakeList = '<div class="table-body-container">';

  productList.reverse().forEach(function(product) {
      if (product.inventory !== null) { // Kiểm tra nếu inventory không phải null
        var htmlStockTake = convertStockTakeToHTML(product);
        HTMLStockTakeList += htmlStockTake;
      }
    });

    HTMLStockTakeList += '</div>';

//   for (const product of productList) { // Sử dụng vòng lặp for...of
//     var htmlStockTake = convertProductToHTML(product);
//     HTMLStockTakeList += htmlStockTake;
// }
// HTMLStockTakeList += '</div>';

  // for (var i = 0; i < productList.length; i++) {
  //   var product = productList[i];
  //   var htmlStockTake = convertProductToHTML(product);
  //   HTMLStockTakeList = HTMLStockTakeList + htmlStockTake;
  // }
  // HTMLStockTakeList = HTMLStockTakeList + '</tbody>';

  return HTMLStockTakeList;
}

  // convertHTML stock takes
  function convertStockTakeToHTML(product) {
    // Tạo một đối tượng product mới từ thông tin của product hiện tại
    var productObject = creatProduct(
      product.img1,
      product.img2,
      product.img3,
      product.img4,
      product.img5,
      product.code,
      product.barcode,
      product.name,
      product.group,
      product.trademark,
      product.location,
      product.cost,
      product.selling,
      product.inventory,
      product.weight,
      product.direct,
      product.properties,
      product.unit,
      product.mininventory,
      product.maxinventory,
      product.desc,
      product.noteform,
      product.components,
      product.type,
      product.id
    );
   
    var productId = product.id;
    var html = "";
    var showDataStockTakeId = creatId();
  
    html +='<tr id="'+showDataStockTakeId+'" for="containerCheckBoxComboPackaging" class="table-row-data table-row-data-stock-take" data-product-id="' + productId + '">\n';
    html +='                  <td class="cell-check">\n';
    html +='                    <label class="container-check-box">\n';
    html +='                      <input id="checkBox1" type="checkbox" />\n';
    html +='                      <span class="checkmark"></span>\n';
    html +='                    </label>\n';
    html +='                  </td>\n';
    html +='                  <td class="inventory-code" for="containerCheckBoxInventoryCode">\n';
    html +='                    '+product.code+'\n';
    html +='                  </td>\n';
    html +='                  <td class="inventory-time" for="containerCheckBoxInventoryTime">\n';
    html +='                    \n';
    html +='                  </td>\n';
    html +='                  <td class="inventory-creator" for="containerCheckBoxInventoryCreator"></td>\n';
    html +='                  <td class="balanced-person" for="containerCheckBoxInventoryBalancedPerson">\n';
    html +='                    \n';
    html +='                  </td>\n';
    html +='                  <td class="balance-day" for="containerCheckBoxInventoryBalanceDay"></td>\n';
    html +='                  <td class="actual-quantity" for="containerCheckBoxInventoryActualQuantity">'+product.inventory+'</td>\n';
    html +='                  <td class="actual-total" for="containerCheckBoxInventoryActualTotal">\n';
    html +='                    '+product.noteform+'\n';
    html +='                  </td>\n';
    html +='                  <td class="total-difference" for="containerCheckBoxTotalDifference">\n';
    html +='                    \n';
    html +='                  </td>\n';
    html +='                  <td class="total-deviantion-value" for="containerCheckBoxTotalDeviationValue">\n';
    html +='                    \n';
    html +='                  </td>\n';
    html +='                  <td class="deviation-increase" for="containerCheckBoxDeviationIncrease">\n';
    html +='                    \n';
    html +='                  </td>\n';
    html +='                  <td class="total-value-increased" for="containerCheckBoxTotalValueIncreased">\n';
    html +='                    '+product.noteform+'\n';
    html +='                  </td>\n';
    html +='                  <td class="deviation-reduced" for="containerCheckBoxDeviationReduced">\n';
    html +='                    \n';
    html +='                  </td>\n';
    html +='                  <td class="total-value-decreased" for="containerCheckBoxTotalValueDecreased">\n';
    html +='                    \n';
    html +='                  </td>\n';
    html +='                  <td class="inventory-note" for="containerCheckBoxInventoryNote">\n';
    html +='                    '+product.noteform+'\n';
    html +='                  </td>\n';
    html +='                  <td class="inventory-status" for="containerCheckBoxInventoryStatus">\n';
    html +='                    \n';
    html +='                  </td>\n';
    html +='                </tr>\n';
    return html;
  }
  
  /* Input: id
    Output: doi tuong co Id=id */
  
  /* Mo ta: Tu id product lay len doi tuong product voi day du cac ham ben trong doi tuong 
  Input: productId
  Output: doi tuong product
  */
  function getProductById(productId) {
    // Lấy danh sách phòng ban từ Local Storage
    var productList = JSON.parse(localStorage.getItem("productList"));
  
    // Tìm phòng ban có ID tương ứng
    for (var i = 0; i < productList.length; i++) {
      var productCurrent = productList[i];
      if (productCurrent.id == productId) {
        // Tạo một đối tượng product mới từ thông tin của product hiện tại và trả về nó
        return creatProduct(
          productCurrent.img1,
          productCurrent.img2,
          productCurrent.img3,
          productCurrent.img4,
          productCurrent.img5,
  productCurrent.code,
  productCurrent.barcode,
  productCurrent.name,
  productCurrent.group,
  productCurrent.trademark,
  productCurrent.location,
  productCurrent.cost,
  productCurrent.selling,
  productCurrent.inventory,
  productCurrent.weight,
  productCurrent.direct,
  productCurrent.properties,
  productCurrent.unit,
  productCurrent.mininventory,
  productCurrent.maxinventory,
  productCurrent.desc,
  productCurrent.noteform,
  productCurrent.components,
  productCurrent.id
        );
      }
    }
    return null; // Trả về null nếu không tìm thấy hàng
  }
  
  // Tạo danh sách hàng không chứa hàng đang chỉnh sửa
  function productListNotContainCurrentProduct(productList, productId) {
    return productList.filter(function(product) {
        return product.id !== productId;
    });
  }
  
  /* Mo ta: lay toan bo danh sach nv duoi local storage len */
  function getProductListLocalStorage() {
    /* Buoc 1: load json */
    var jsonProductList = localStorage.getItem("productList");
  
    /* Buoc 2: Chuyen json thanh doi tuong */
    var productList = JSON.parse(jsonProductList);
    
    if (productList == null) {
      productList = new Array();
    }
  
    return productList;
  }

//   function getProductById(productId) {
//     // Simulate product data retrieval (replace with your actual implementation)
//     const productList = getProductListLocalStorage(); // Replace with your logic to retrieve product list
//     const product = productList.find(p => p.id === productId);
//     return product;
// }

// function getProductListLocalStorage() {
//     // Simulate product list retrieval from local storage (replace with your actual implementation)
//     const productListString = localStorage.getItem('productList');
//     if (productListString) {
//         return JSON.parse(productListString);
//     } else {
//         return []; // Return empty array if no product list is found
//     }
// }
