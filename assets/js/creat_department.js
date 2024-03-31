function creatDepartment(departmentName, departmentDesc, departmentStatus, departmentId) {
  var department = new Object();
  department.name = departmentName;
  department.desc = departmentDesc;
  department.status = departmentStatus;
  department.id = departmentId;

  if (departmentId != null) {
    department.id = departmentId;
  } else {
    department.id = creatId();
  }

  /* Chuyen ve json */
  department.toJson = function () {
    var json = JSON.stringify(this);
    return json;
  };

  /* Chuyen doi tuong tu json ve object co day du thuoc tinh cua object */
  /* Tu json chuyen thanh mot doi tuong day du cac phuong thuc 
          input: json
          output: doi tuong day du
          */
  department.fromJSON = function () {
    var objectFull = new Object();
    /* Buoc 1: chuyen tu json thanh doi tuong */
    var object = JSON.parse(json);

    /* Buoc 2: chuyen doi tuong thanh doi tuong day du phuong thuc */
    var objectFull = creatDepartment(
      object.name,
      object.desc,
      object.status,
      object.id
    );

    return objectFull;
  };

  /* Tu json cua department tra ve mot danh sach department co day du cac phuong thuc
    Input: json cua danh sach position
    Output: danh sach position day du
     */
  department.fromJSONs = function (jsonDepartmentList) {
    var departmentListFull = new Array();
    var departmentList = JSON.parse(jsonDepartmentList);

    for (var i = 0; i < departmentList.length; i++) {
      var department = departmentList[i];
      var departmentFull = creatDepartment(
        department.name,
        department.desc,
        department.status,
        department.id
      );
      departmentListFull[i] = departmentFull;
    }
    return departmentListFull;
  };
  return department;
}

/* Mo ta: Chuyen mot danh sach doi tuong, thanh mot doan HTML de hien thi duoc danh sach department ra man hinh 
Input: Danh sach department
Output: HTML hien thi danh sach department
*/
function convertDepartmentListToHTML(departmentList){
  var HTMLDepartmentList = '<ul class="form-items">';
  for(var i=0; i<departmentList.length; i++){
    var department=departmentList[i];
    var htmlDepartment=convertDepartmentToHTML(department);
    HTMLDepartmentList = HTMLDepartmentList + htmlDepartment;
  }
  HTMLDepartmentList=HTMLDepartmentList+'</ul>';
  
  return HTMLDepartmentList;
}

/* Mo ta: Chuyen mot doi tuong thanh mot doan HTML
Dau vao: Doi tuong
Dau ra: Doan HTML cua doi tuong do
 */
function convertDepartmentToHTML(department) {
  // Tạo một đối tượng department mới từ thông tin của department hiện tại
  var departmentObject = creatDepartment(
    department.name,
    department.desc,
    department.status,
    department.id
  );

  var departmentId = department.id;
  var html = '';
  var showEditDepartmentId = creatId(); // Đảm bảo rằng showEditDepartmentId cũng được tạo ra một cách duy nhất
  html += '<li id="' + departmentId + '" class="form-item">\n';
  html += '  <span class="item-name department-name">' + departmentObject.name + '</span>\n';
  html += '  <i id="' + showEditDepartmentId + '" class="fas fa-solid fa-pen edit-department" data-department-id="' + departmentId + '"></i>\n';
  html += '</li>\n';
  return html;
}

/* Input: id
  Output: doi tuong co Id=id */
  
/* Mo ta: Tu id department lay len doi tuong department voi day du cac ham ben trong doi tuong 
Input: departmentId
Output: doi tuong department
*/
function getDepartmentById(departmentId){
  // Lấy danh sách phòng ban từ Local Storage
  var departmentList = JSON.parse(localStorage.getItem("departmentList"));

  // Tìm phòng ban có ID tương ứng
  for(var i = 0; i < departmentList.length; i++){
    var departmentCurrent = departmentList[i];
    if(departmentCurrent.id == departmentId){
      // Tạo một đối tượng department mới từ thông tin của department hiện tại và trả về nó
      return creatDepartment(
        departmentCurrent.name,
        departmentCurrent.desc,
        departmentCurrent.status,
        departmentCurrent.id
      );
    }
  }
  return null; // Trả về null nếu không tìm thấy phòng ban
}

  /* Mo ta: lay toan bo danh sach sp duoi local storage len */
  function getDepartmentListLocalStorage(){
    /* Buoc 1: load json */
    var jsonDepartmentList = localStorage.getItem('departmentList');

    /* Buoc 2: Chuyen json thanh doi tuong */
    var departmentList = JSON.parse(jsonDepartmentList);
    return departmentList;
  }