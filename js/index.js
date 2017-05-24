function myFunction() {
    var x = document.getElementById("menu");
    if (x.className === "main_menu") {
        x.className += " responsive";
    } else {
        x.className = "main_menu";
    }
}
