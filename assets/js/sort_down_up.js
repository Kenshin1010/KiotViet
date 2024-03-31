document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("i.fa-sort-down").forEach(function(icon) {
        icon.addEventListener("click", function() {
            if (icon.classList.contains("fa-sort-down")) {
                icon.classList.remove("fa-sort-down");
                icon.classList.add("fa-sort-up");
            } else {
                icon.classList.remove("fa-sort-up");
                icon.classList.add("fa-sort-down");
            }
        });
    });
});