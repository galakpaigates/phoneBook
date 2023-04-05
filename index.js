document.addEventListener('load', () => {
    document.querySelector('.container').style.display = "none";

    document.getElementById('loadingDiv').style.display = "list-item";
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loadingDiv').style.display = "none"

    document.querySelector('.container').style.display = "list-item";

    const menuButton = document.querySelector('.menuButton');
    const sideBar = document.getElementById('sideBar');
})