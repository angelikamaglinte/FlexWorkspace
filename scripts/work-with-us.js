// Toggle the dropdown menu visibility
function toggleDropdown() {
    var dropdownContent = document.getElementById("work-with-us-dropdown-content");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}