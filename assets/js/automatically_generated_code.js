if(employee.code === null || employee.code === ''){
    var prefix = 'NV'; // Tiền tố cố định cho mã nhân viên
    var digitCount = 6; // Số lượng chữ số trong mã nhân viên

    // Lọc ra các nhân viên có mã bắt đầu bằng 'NV'
var employeeListNV = employeeList.filter(function(employee) {
  return employee.code.startsWith('NV');
});

// Sắp xếp danh sách nhân viên theo thứ tự tăng dần của mã nhân viên trong mảng employeeListNV
employeeListNV.sort(function(a, b) {
  var codeA = parseInt(a.code.substring(2)); // Lấy số từ mã nhân viên
  var codeB = parseInt(b.code.substring(2));
  return codeA - codeB;
});
    
    // Khởi tạo nhân viên NV000000
    var eCodeCurrent = prefix + String(employeeCodeNumber).padStart(digitCount, '0');
    var eCodeMaxCurrentNumber = 0;

    // Kiểm tra trong tất cả các employee lấy ra các employee.code có dạng NV{6digit} và tìm ra mã NV lớn nhất đang có là bao nhiêu đặt tên là eCodeMaxCurrent
    for (var i = 0; i < employeeList.length; i++) {
        var employeeCode = employeeList[i].code;
        if (employeeCode && employeeCode.startsWith('NV')) {
            var employeeCodeNumber = parseInt(employeeCode.substring(2));
            if (employeeCodeNumber > eCodeMaxCurrentNumber) {
                eCodeMaxCurrentNumber = employeeCodeNumber;
            }
        }
    }

    // Số nhân viên mới cần được tạo
var newEmployeeCode = null;

// Duyệt qua danh sách nhân viên đã được sắp xếp
for (var i = 0; i < employeeList.length - 1; i++) {
    var currentCode = parseInt(employeeList[i].code.substring(2));
    var nextCode = parseInt(employeeList[i + 1].code.substring(2));

    // Nếu có khoảng trống giữa các số nhân viên
    if (nextCode - currentCode > 1) {
        newEmployeeCode = 'NV' + String(currentCode + 1).padStart(6, '0');
        break;
    }
}

// Nếu không tìm thấy khoảng trống, số mới sẽ là số lớn nhất hiện có + 1
if (!newEmployeeCode && employeeList.length > 0) {
    var lastEmployeeCode = parseInt(employeeList[employeeList.length - 1].code.substring(2));
    newEmployeeCode = 'NV' + String(lastEmployeeCode + 1).padStart(6, '0');
}

// Sử dụng newEmployeeCode ở đây
    employee.code = eCodeCurrent;
}