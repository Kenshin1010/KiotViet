// Hàm kiểm tra mã số nhân viên đã tồn tại
function isExistsOrNot(list, valueToFind, attributeToFind) {
    // Kiểm tra nếu danh sách rỗng
    if (list.length === 0) {
        return false;
    }
    
    // Lặp qua danh sách list và kiểm tra từng phần tử
    for (var i = 0; i < list.length; i++) {
        // Kiểm tra xem phần tử có thuộc tính cần tìm không
        if (list[i] && list[i].hasOwnProperty(attributeToFind)) {
            // Kiểm tra giá trị của thuộc tính
            if (list[i][attributeToFind] === valueToFind) {
                console.log(list[i][attributeToFind]);
                return true; // Nếu tìm thấy valueToFind trong danh sách, trả về true
            }
        }
    }
    return false; // Nếu không tìm thấy valueToFind trong danh sách, trả về false
}