document.addEventListener("DOMContentLoaded", function() {
    function addSortIconsToTableHeaders() {
        document.querySelectorAll("th:not(#cellCheckAllProduct):not(.cell-img)").forEach(function(th) {
            th.addEventListener("click", function() {
                // Remove sort icons from all headers
                document.querySelectorAll("th:not(#cellCheckAllProduct):not(.cell-img)").forEach(function(header) {
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

                // Add sort icon to clicked header
                th.appendChild(icon);

                // Perform sorting of table cells
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

                // Rearrange table rows
                var tableBody = document.querySelector(".table-body");
                tableBody.innerHTML = "";
                rows.forEach(function(row) {
                    tableBody.appendChild(row);
                });
            });
        });
    }

    addSortIconsToTableHeaders();
});