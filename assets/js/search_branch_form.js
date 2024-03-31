// // Function to show the branch list and focus on the search input
// function showBranchList() {
//     var branchList = document.getElementById("branchListId");
//     var searchInput = document.getElementById("searchSalaryBranch");
//     if (branchList && searchInput) {
//         branchList.style.display = "block";
//         searchInput.focus();
//     }
// }

// // Function to handle selection of branch name
// function selectBranchName(event) {
//     var selectedBranch = event.target.textContent.trim(); // Lấy nội dung của branch name đã được click
//     var salaryBranchInput = document.getElementById("salaryBranch");
//     if (salaryBranchInput) {
//         salaryBranchInput.value = selectedBranch; // Đặt nội dung vào input#salaryBranch
//         hideBranchList();
//     }
// }

// // Function to hide the branch list
// function hideBranchList() {
//     var branchList = document.getElementById("branchListId");
//     if (branchList) {
//         branchList.style.display = "none";
//     }
// }

// // Event listeners for showing/hiding branch list
// document.getElementById("salaryBranch").addEventListener("click", showBranchList);
// document.getElementById("salaryBranchSortDownIcon").addEventListener("click", showBranchList);

// // Event listener for selecting branch name
// document.querySelectorAll(".branch-name").forEach(function(branch) {
//     branch.addEventListener("click", selectBranchName);
// });

// // Function to filter branch list based on search input
// function filterBranchList() {
//     var searchInput = document.getElementById("searchSalaryBranch");
//     var listItems = document.getElementById("branchItemsId").querySelectorAll(".form-item");
//     var searchText = searchInput.value.trim().toLowerCase();

//     listItems.forEach(function(item) {
//         var branchName = item.querySelector(".branch-name").textContent.toLowerCase();
//         if (branchName.includes(searchText)) {
//             item.style.display = "";
//         } else {
//             item.style.display = "none";
//         }
//     });
// }

// // Event listener for search input
// document.getElementById("searchSalaryBranch").addEventListener("input", filterBranchList);

// // Event listener for blur event on search input
// document.getElementById("searchSalaryBranch").addEventListener("blur", hideBranchList);

// Function to show the branch list and focus on the search input
function showBranchList() {
    var branchList = document.getElementById("branchListId");
    var searchInput = document.getElementById("searchSalaryBranch");
    if (branchList && searchInput) {
        branchList.style.display = "block";
        searchInput.focus();
    }
}

// Function to handle selection of branch name
function selectBranchName(event) {
    var selectedBranch = event.target.textContent.trim(); // Lấy nội dung của branch name đã được click
    var salaryBranchInput = document.getElementById("salaryBranch");
    if (salaryBranchInput) {
        salaryBranchInput.value = selectedBranch; // Đặt nội dung vào input#salaryBranch
        hideBranchList();
    }
}

// Function to hide the branch list
function hideBranchList() {
    var branchList = document.getElementById("branchListId");
    if (branchList) {
        branchList.style.display = "none";
    }
}

// Function to filter branch list based on search input
function filterBranchList() {
    var searchInput = document.getElementById("searchSalaryBranch");
    var listItems = document.getElementById("branchItemsId").querySelectorAll(".form-item");
    var searchText = searchInput.value.trim().toLowerCase();

    listItems.forEach(function(item) {
        var branchName = item.querySelector(".branch-name").textContent.toLowerCase();
        if (branchName.includes(searchText)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

// Event listener for search input
document.getElementById("searchSalaryBranch").addEventListener("input", filterBranchList);

// Event listener for blur event on search input
document.getElementById("searchSalaryBranch").addEventListener("blur", hideBranchList);

// Function to toggle search list display and hide
function toggleSearchListDisplayHide(inputId, inputSearchListId, listId, itemName) {
    var input = document.getElementById(inputId);
    var searchInput = document.getElementById(inputSearchListId);
    var listItems = document.getElementById(listId);

    // Event listener for showing/hiding branch list
    input.addEventListener("click", function() {
        listItems.style.display = "block";
        searchInput.focus();
    });

    // Lắng nghe sự kiện click trên mỗi phần tử <span> trong danh sách
    listItems.querySelectorAll('.form-item').forEach(function(li) {
        var span = li.querySelector(itemName);
        span.addEventListener('click', function() {
            // Lấy nội dung của phần tử <span> bên trong phần tử <li>
            var itemName = span.textContent;

            // Hiển thị nội dung của phần tử đã chọn vào input
            input.value = itemName;
        });
    });

    // Ẩn danh sách khi người dùng click ra ngoài danh sách
    document.addEventListener('click', function(event) {
        var isClickInsideList = listItems.contains(event.target);
        var isClickInsideInput = input.contains(event.target);
        
        if (!isClickInsideList && !isClickInsideInput) {
            listItems.style.display = 'none';
        }
    });

    // // Event listener for selecting branch name
    // listItems.querySelectorAll(".form-item" + itemName).forEach(function(span) {
    //     span.addEventListener("click", function(event) {
    //         input.value = event.target.textContent.trim();
    //         hideBranchList();
    //     });
    // });

    // // Event listener for hiding list when clicking outside
    // document.addEventListener("click", function(event) {
    //     if (!listItems.contains(event.target) && event.target !== input) {
    //         hideBranchList();
    //     }
    // });
}

// Initialize toggleSearchListDisplayHide function
document.addEventListener("DOMContentLoaded", function() {
    toggleSearchListDisplayHide("salaryBranch", "searchSalaryBranch", "branchListId", ".branch-name");
});