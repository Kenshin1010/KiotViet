// convertHTML stockTakeList
function convertStockTakeListToHTML(productList) {
  if (!productList) return ''; // Kiểm tra null hoặc undefined
  
  var HTMLStockTakeList = '<div class="table-body-container">';

  productList.reverse().forEach(function(product) {
    
        var htmlStockTake = convertStockTakeToHTML(product);
        HTMLStockTakeList += htmlStockTake;
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