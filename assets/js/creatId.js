// Dưới đây là cách viết lại hàm creatId() sử dụng cú pháp arrow function:
const creatId = () => {
    const randomPart = Math.random().toString().substr(2, 10);
    const timePart = String(new Date().getTime());
    return randomPart + "_" + timePart;
};

// function creatId(){
//     var id='';
//     id = Math.random().toString().substr(2, 10) + "_" + String(new Date().getTime());
//     return id;
// }