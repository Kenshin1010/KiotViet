// Hàm sinh mã ngẫu nhiên gồm 6 ký tự số
function generateRandomNumberCode() {
    var length = 6;
    var randomCode = "";
    for (var i = 0; i < length; i++) {
      randomCode += Math.floor(Math.random() * 10); // Sinh số ngẫu nhiên từ 0 đến 9
    }
    return randomCode;
  }
  
  // Đối tượng lưu trữ mã xác nhận và thời gian còn lại cho mỗi nút
  var confirmationCodes = {};
  
  // Hàm cập nhật mã xác nhận
  function updateConfirmationCode(buttonId, spanElement) {
    // Kiểm tra nếu đã có mã đang chạy cho nút này
    if (confirmationCodes[buttonId]) {
      if (spanElement) {
        spanElement.textContent = confirmationCodes[buttonId].code;
      }
      return confirmationCodes[buttonId].code;
    }
    // Nếu không, sinh mã mới và lưu lại
    var randomNumberCode = generateRandomNumberCode();
    if (spanElement) {
      spanElement.textContent = randomNumberCode;
    }
    confirmationCodes[buttonId] = {
      code: randomNumberCode,
      remainingTime: 60, // 60 giây
    };
    return randomNumberCode;
  }
  
  // Hàm bắt đầu đếm ngược cho mã xác nhận của một nút
  function startCountDown(buttonId, display) {
    var timer = confirmationCodes[buttonId].remainingTime;
    var countDown = setInterval(function () {
      var minutes = parseInt(timer / 60, 10);
      var seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      // Cập nhật thời gian đếm ngược vào thẻ span
      display.textContent = minutes + ":" + seconds;
  
      if (--timer < 0) {
        // Nếu hết thời gian đếm ngược, hủy đếm ngược và xóa mã xác nhận
        clearInterval(countDown);
        delete confirmationCodes[buttonId];
      } else {
        // Cập nhật thời gian còn lại
        confirmationCodes[buttonId].remainingTime = timer;
      }
    }, 1000); // Cập nhật thời gian mỗi giây (1000ms)
  
    return countDown;
  }
  
  // Lắng nghe sự kiện click cho các button có class là "btn-primary-code"
  var primaryCodeButtons = document.querySelectorAll(".btn-primary-code");
  primaryCodeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var buttonId = button.getAttribute("id");
      employeeId = button.getAttribute("data-employee-id");
      var divVerification = document.querySelector(
        '.verification-code[data-employee-id="' + employeeId + '"]'
      );
      var spanConfirmationCode = divVerification.querySelector(
        '.code-number[data-employee-id="' + employeeId + '"]'
      );
      var closeVerificationBtn = divVerification.querySelector(
        '.close-verification-code[data-employee-id="' + employeeId + '"]'
      );
      var countDownTimer = divVerification.querySelector(
        '.time-minutes[data-employee-id="' + employeeId + '"]'
      );
  
      // Cập nhật mã xác nhận và hiển thị nội dung trong div
      var code = updateConfirmationCode(buttonId, spanConfirmationCode);
      divVerification.style.display = "block";
  
      // Bắt sự kiện đóng div
      closeVerificationBtn.addEventListener("click", function () {
        divVerification.style.display = "none";
      });
  
      // Bắt đầu đếm ngược cho mã xác nhận mới
      startCountDown(buttonId, countDownTimer);
    });
  });
  
  // Lắng nghe sự kiện DOMContentLoaded
  document.addEventListener("DOMContentLoaded", function () {
    // Lấy thẻ span có class là "time-minutes"
    var countDownTimers = document.querySelectorAll(".time-minutes");
    // Đặt thời gian đếm ngược là 60 giây (1 phút)
    var duration = 60;
    // Bắt đầu đếm ngược cho mỗi countDownTimer
    countDownTimers.forEach(function (timer) {
      startCountDown(duration, timer);
    });
  });