function creatPosition(positionName, positionDesc, positionStatus, positionId) {
  var position = new Object();
  position.name = positionName;
  position.desc = positionDesc;
  position.status = positionStatus;
  position.id = positionId;

  if (positionId != null) {
    position.id = positionId;
  } else {
    position.id = creatId();
  }

  /* Chuyen ve json */
  position.toJson = function () {
    var json = JSON.stringify(this);
    return json;
  };

  /* Chuyen doi tuong tu json ve object co day du thuoc tinh cua object */
  /* Tu json chuyen thanh mot doi tuong day du cac phuong thuc 
          input: json
          output: doi tuong day du
          */
  position.fromJSON = function () {
    var objectFull = new Object();
    /* Buoc 1: chuyen tu json thanh doi tuong */
    var object = JSON.parse(json);

    /* Buoc 2: chuyen doi tuong thanh doi tuong day du phuong thuc */
    var objectFull = creatPosition(
      object.name,
      object.desc,
      object.status,
      object.id
    );

    return objectFull;
  };

  /* Tu json cua position tra ve mot danh sach position co day du cac phuong thuc
    Input: json cua danh sach position
    Output: danh sach position day du
     */
  position.fromJSONs = function (jsonPositionList) {
    var positionListFull = new Array();
    var positionList = JSON.parse(jsonPositionList);

    for (var i = 0; i < positionList.length; i++) {
      var position = positionList[i];
      var positionFull = creatPosition(
        position.name,
        position.desc,
        position.status,
        position.id
      );
      positionListFull[i] = positionFull;
    }
    return positionListFull;
  };
  return position;
}

/* Mo ta: Chuyen mot danh sach doi tuong, thanh mot doan HTML de hien thi duoc danh sach position ra man hinh 
Input: Danh sach position
Output: HTML hien thi danh sach position
*/
function convertPositionListToHTML(positionList){
  var HTMLPositionList = '<ul class="form-items">';
  for(var i=0; i<positionList.length; i++){
    var position=positionList[i];
    var htmlPosition=convertPositionToHTML(position);
    HTMLPositionList = HTMLPositionList + htmlPosition;
  }
  HTMLPositionList=HTMLPositionList+'</ul>';
  
  return HTMLPositionList;
}

/* Mo ta: Chuyen mot doi tuong thanh mot doan HTML
Dau vao: Doi tuong
Dau ra: Doan HTML cua doi tuong do
 */
function convertPositionToHTML(position) {
  // Tạo một đối tượng position mới từ thông tin của position hiện tại
  var positionObject = creatPosition(
    position.name,
    position.desc,
    position.status,
    position.id
  );

  var positionId = position.id;
  var html = '';
  var showEditPositionId = creatId(); // Đảm bảo rằng showEditPositionId cũng được tạo ra một cách duy nhất
  html += '<li id="' + positionId + '" class="form-item">\n';
  html += '  <span class="item-name position-name">' + positionObject.name + '</span>\n';
  html += '  <i id="' + showEditPositionId + '" class="fas fa-solid fa-pen edit-position" data-position-id="' + positionId + '"></i>\n';
  html += '</li>\n';
  return html;
}

/* Input: id
  Output: doi tuong co Id=id */
  
/* Mo ta: Tu id position lay len doi tuong position voi day du cac ham ben trong doi tuong 
Input: positionId
Output: doi tuong position
*/
function getPositionById(positionId){
  // Lấy danh sách chức danh từ Local Storage
  var positionList = JSON.parse(localStorage.getItem("positionList"));

  // Tìm chức danh có ID tương ứng
  for(var i = 0; i < positionList.length; i++){
    var positionCurrent = positionList[i];
    if(positionCurrent.id == positionId){
      // Tạo một đối tượng position mới từ thông tin của position hiện tại và trả về nó
      return creatPosition(
        positionCurrent.name,
        positionCurrent.desc,
        positionCurrent.status,
        positionCurrent.id
      );
    }
  }
  return null; // Trả về null nếu không tìm thấy chức danh
}

  /* Mo ta: lay toan bo danh sach sp duoi local storage len */
  function getPositionListLocalStorage(){
    /* Buoc 1: load json */
    var jsonPositionList = localStorage.getItem('positionList');

    /* Buoc 2: Chuyen json thanh doi tuong */
    var positionList = JSON.parse(jsonPositionList);
    return positionList;
  }