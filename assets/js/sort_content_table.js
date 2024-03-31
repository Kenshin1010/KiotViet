document.addEventListener("DOMContentLoaded", function() {
    var clickedCount = 0;
  
    function addSortIconsToTableHeaders() {
        document.querySelectorAll("th:not(#cellCheckAll):not(.cell-img)").forEach(function(th) {
            th.addEventListener("click", function() {
                clickedCount++;
                var normalizedClick = clickedCount % 3; // Tính số click theo chu kỳ 3 lần
    
                if (normalizedClick === 0) {
                    // Trường hợp click lần thứ ba (hoặc số click chia hết cho 3)
                    document.querySelectorAll("th:not(#cellCheckAll):not(.cell-img)").forEach(function(header) {
                        if (header.querySelector("i")) {
                            header.querySelector("i").remove();
                        }
                        header.removeAttribute("data-sorted");
                    });
                } else {
                    // Trường hợp click lần thứ nhất hoặc thứ hai
                    // Xóa icon và thuộc tính data-sorted khỏi tất cả các tiêu đề
                    document.querySelectorAll("th:not(#cellCheckAll):not(.cell-img)").forEach(function(header) {
                        if (header.querySelector("i")) {
                            header.querySelector("i").remove();
                        }
                    });
    
                    var icon = document.createElement("i");
                    icon.classList.add("fas", "fa-solid");
    
                    var sortingDirection = th.getAttribute("data-sorted") || "asc";
                    if (sortingDirection === "asc") {
                        icon.classList.add("fa-sort-up");
                        th.setAttribute("data-sorted", "desc");
                    } else {
                        icon.classList.add("fa-sort-down");
                        th.setAttribute("data-sorted", "asc");
                    }
    
                    // Thêm icon sort vào tiêu đề đã được click
                    th.appendChild(icon);
    
                    // Thực hiện sắp xếp các ô của bảng
                    var columnIndex = Array.from(th.parentElement.children).indexOf(th);
                    var rows = Array.from(document.querySelectorAll(".table-body .table-row-data"));
    
                    rows.sort(function(a, b) {
                        var valueA = a.children[columnIndex].textContent.trim();
                        var valueB = b.children[columnIndex].textContent.trim();
    
                        if (!isNaN(valueA) && !isNaN(valueB)) {
                            return sortingDirection === "asc" ? parseFloat(valueA) - parseFloat(valueB) : parseFloat(valueB) - parseFloat(valueA);
                        } else {
                            return sortingDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                        }
                    });
    
                    // Sắp xếp lại các hàng của bảng
                    var tableBody = document.querySelector(".table-body");
                    tableBody.innerHTML = "";
                    rows.forEach(function(row) {
                        tableBody.appendChild(row);
    
                        // Tìm row-detail tương ứng với mỗi row-data
                        var employeeId = row.getAttribute("data-employee-id");
                        var rowDetail = document.querySelector('.row-detail[data-employee-id="' + employeeId + '"]');
                        
                        // Nếu tìm thấy row-detail, di chuyển nó vào vị trí đúng dưới row-data
                        if (rowDetail) {
                            row.insertAdjacentElement('afterend', rowDetail);
                        }
                    });
                }
    
                // Xóa lớp fa-sort-up và fa-sort-down nếu click lần thứ 0, 3, 6,...
                if (normalizedClick === 0) {
                    document.querySelectorAll(".fa-sort-up, .fa-sort-down").forEach(function(icon) {
                        icon.classList.remove("fa-sort-up", "fa-sort-down");
                    });
                }
            });
        });
    }
  
    addSortIconsToTableHeaders();
  });