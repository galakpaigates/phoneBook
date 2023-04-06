window.addEventListener('load', () => {
    document.querySelector('.container').style.display = "none";

    document.getElementById('loadingDiv').style.display = "list-item";
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loadingDiv').style.display = "none"

    document.querySelector('.container').style.display = "list-item";

    const menuButton = document.querySelector('.menuButton');
    const sideBar = document.getElementById('sideBar');
    const mainBody = document.getElementById('mainBody');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.searchButton');
    const newContactForm = document.getElementById('newContactForm');
    const photoId = document.getElementById('photoId');
    const photoIdDiv = document.getElementById('photoIdDiv');
    const profilePhoto = document.getElementById('profilePhoto');
    const newInformationForm = document.getElementById('newInformationForm');
    const contactsTable = document.getElementById('contactsTable');
    const fileBtn = document.getElementById('fileBtn');

    searchInput.addEventListener('keyup', (event) => {
        for (let i = 0; i < contactsTable.children.length; i++) {
            const listItem = contactsTable.children[i].firstElementChild;
            const listItemText = listItem.innerText.toLowerCase();

            if (listItemText.includes(searchInput.value.toLowerCase())) {
                listItem.parentElement.style.display = "list-item";
                listItem.parentElement.style.listStyleType = "none";
            } else {
                listItem.parentElement.style.display = "none";
            }
        }
    })

    document.addEventListener('click', (event) => {
        const userChoice = event.target;

        if (userChoice.className === "searchButton") {
            if (searchInput.style.display === "none") {
                searchInput.style.display = "list-item"; searchInput.style.marginTop = "-60px";

                mainBody.style.marginTop = "85px";
            }
            else {
                searchInput.style.display = "none";
                mainBody.style.marginTop = "30px";
            }
        }

        if (userChoice.className === "createNew") {
            if (newContactForm.style.display === "none") {
                if (screen.width < 890.1) {
                    sideBar.style.display = "none";
                }
                newContactForm.style.display = "list-item";

                mainBody.style.display = "none";

                searchInput.style.display = "none";
            }
        }

        if (userChoice.id === "fileBtn" || userChoice.id === "profilePhoto") {
            photoId.click()
            fileBtn.style.display = "none";
        }

        if (userChoice.className === "viewAllContacts") {
            if (contactsTable.style.display === "none") {
                if (screen.width < 890.1) {
                    sideBar.style.display = "none";
                }

                newContactForm.style.display = "none";

                mainBody.style.display = "list-item"; mainBody.style.listStyleType = "none"; mainBody.style.marginTop = "12px";
                contactsTable.style.display = "list-item"; contactsTable.style.listStyleType = "none";
            }
            else {
                contactsTable.style.display = "none";
            }
        }
    })

    profilePhoto.style.display = "none";

    photoId.addEventListener('change', (event) => {
        profilePhoto.style.display = "list-item"; profilePhoto.style.listStyleType = "none";

        const file = event.target.files[0];
        console.log(file)

        const url = URL.createObjectURL(file);

        profilePhoto.src = url;

        profilePhoto.onload = function () {
            URL.revokeObjectURL(this.src);
        };
        photoId.style.display = "none";
    })

    newInformationForm.addEventListener('submit', (event) => {
        const nameValue = document.getElementById('name').value;
        const emailValue = document.getElementById('email').value;
        const orangeNumber = document.getElementById('orangeNumber').value;
        const lonestarNumber = document.getElementById('lonestarNumber').value;
        const details = document.getElementById('details').value;
        const profile = document.getElementById('profilePhoto').src;

        event.preventDefault();

        contactsTable.innerHTML +=
            `
            <tr>
                <td class="editDeleteTd"><img src="./pencil.png" class="pencils"> | <span class="xmark">X</span></td>
                <td class="profilePhotoTd"><img src="${profile}" class="contactsPhoto"></td>
                <td class="nameTd">${nameValue}</td>
                <td class="orangeNumberTd">${orangeNumber}</td>
                <td class="lonestarNumberTd">${lonestarNumber}</td>
                <td class="emailTd">${emailValue}</td>
                <td class="detailsTd">${details}</td>
            </tr>
        `
    })

    if (screen.width < 890.1) {
        document.querySelectorAll('.editDeleteTd').style.display = "none";
    }

    menuButton.addEventListener('click', (event) => {
        sideBar.style.display = "list-item";
    })
});