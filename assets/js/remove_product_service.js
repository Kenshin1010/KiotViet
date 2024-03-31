// Biến toàn cục để lưu ID của dịch vụ cần xóa
var productIdToRemove = null;

document.addEventListener("DOMContentLoaded", function () {

    var removeButtons = document.querySelectorAll(".btn-remove-product-service");

    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Lấy ID của nút được nhấp
            var buttonId = button.id;
            console.log("Trash Can Product Button ID:", buttonId);

            var productId = button.getAttribute('data-product-id');
            console.log("Product ID to remove:", productId);

            var product = getProductById(productId);
            console.log("Product found from trash can button:", product);

            if (product) {
                // Lấy ID của dịch vụ cần xóa
                productIdToRemove = productId;
                var divToShow = document.querySelector(".add-remove-product");
                divToShow.style.display = 'block';
                showConfirmRemoveProductServiceDialog(productIdToRemove);
                productIdToRemove=null;
            } else {
                console.log("Không tìm thấy thông tin dịch vụ với ID:", productId);
            }
        });
    });
});

function showConfirmRemoveProductServiceDialog(productId) {
    // Thêm title và nội dung cần xóa
    document.getElementById('titleRemoveProduct').innerText = "Xóa dịch vụ";
    document.getElementById('contentRemoveProduct').innerText = "dịch vụ";

    // Lắng nghe sự kiện click vào nút xác nhận xóa
    var acceptRemoveProductButton = document.getElementById("acceptProductRemove");
    acceptRemoveProductButton.addEventListener("click", function () {
        // Xóa dịch vụ từ danh sách
        removeProductServiceFromList(productId, function(){
            // Sau khi xóa thành công, cập nhật DOM
            // Ẩn hộp thoại xác nhận xóa
            var confirmationDialog = document.querySelector(".comfirmation-remove-product");
            confirmationDialog.style.display = "none";
    
            var addRemoveProduct = document.querySelector(".add-remove-product");
            addRemoveProduct.style.display = "none";
        });

        // Reload lại trang sau khi xóa thành công
    // location.reload();
    });
}

// Hàm xóa dịch vụ khỏi danh sách
function removeProductServiceFromList(productId, callback) {
    // Lấy danh sách dịch vụ từ Local Storage
    var productList = getProductListLocalStorage();

    // Tìm vị trí của dịch vụ cần xóa trong danh sách
    var indexToRemove = -1;
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].id === productId) {
            indexToRemove = i;
            break;
        }
    }

    // Nếu tìm thấy vị trí của dịch vụ, thực hiện xóa
    if (indexToRemove !== -1) {
        productList.splice(indexToRemove, 1); // Xóa dịch vụ khỏi danh sách
        // Lưu danh sách dịch vụ đã cập nhật vào Local Storage
        localStorage.setItem("productList", JSON.stringify(productList));
        console.log("Product removed:", productId);
    // alert("Xóa dịch vụ thành công");
    toast({
        type:'success',
        message:'Xóa dịch vụ thành công',
        duration:1000
      });
      // Gọi callback để cập nhật DOM
      if (typeof callback === 'function') {
        callback();
        }
    } else {
        console.log("Không tìm thấy dịch vụ có ID:", productId);
    }
}