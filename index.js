document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menuButton');
    const menuBar = document.getElementById('menuBar');
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
    const addNewContactBtn = document.getElementById('addNewContactBtn');
    const getStartedText = document.getElementById('getStartedText');
    const loadingDiv = document.getElementById('loadingDiv');
    const getStartedDiv = document.querySelector('.getStartedDiv');

    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    })
    document.addEventListener('keyup', (event) => {
        if (event.keyCode) {return}
    })

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
            if (screen.width < 890) {
                sideBar.style.display = "none"; searchInput.style.marginLeft = "92px"; searchInput.style.marginTop = "-45px";
                menuBar.style.display = "list-item"; menuBar.style.listStyleType = "none"; menuButton.style.display = "list-item";
            };
            searchInput.style.display = "list-item"; searchInput.style.width = "60vw";

            newContactForm.style.display = "none";

            if (screen.width > 890) {
                mainBody.style.marginTop = "100px";
                contactsTable.style.marginTop = "100px"; contactsTable.style.marginLeft = "15vw";
                searchInput.style.marginTop = "-60px"; searchInput.style.marginLeft = "28vw"; 
            }

            mainBody.style.display = "list-item"; mainBody.style.listStyleType = "none"; mainBody.style.marginTop = "12px";
            contactsTable.style.display = "list-item"; contactsTable.style.listStyleType = "none"; 
        }

        if (userChoice.className === "createNew") {
            searchInput.style.display = "none";
            newContactForm.style.display = "list-item"; newContactForm.style.listStyleType = "none";
            mainBody.style.display = "none";

            if (screen.width < 890.1) {
                sideBar.style.display = "none";
                menuBar.style.display = "list-item"; menuBar.style.listStyleType = "none";
                menuButton.style.display = "list-item"; menuButton.style.listStyleType = "none";
            }

            if (screen.width > 890) {
                menuBar.style.display = "none";
                menuButton.style.display = "none";
            }
        }

        if (userChoice.id === "fileBtn" || userChoice.id === "profilePhoto") {
            photoId.click()
            event.preventDefault()
        }

        if (userChoice.className === "viewAllContacts") {
            if (contactsTable.innerText.length > 14) {
                if (screen.width < 890.1) {
                    sideBar.style.display = "none";
                    menuBar.style.display = "list-item"; menuBar.style.listStyleType = "none";
                    menuButton.style.display = "list-item"; menuButton.style.listStyleType = "none";
                }

                if (screen.width > 890) {
                    menuButton.style.display = "none";
                }
                
                newContactForm.style.display = "none";
                mainBody.style.display = "list-item"; mainBody.style.listStyleType = "none"; mainBody.style.marginTop = "12px";
                contactsTable.style.display = "list-item"; contactsTable.style.listStyleType = "none";
            }
            else {
                alert("You don't have any Contacts yet! \nClick the 'Create New' Button in the Menu to Create a New Contact!")
            }
        }
    })

    profilePhoto.style.display = "none";

    photoId.addEventListener('change', (event) => {
        const file = event.target.files[0];

        const url = URL.createObjectURL(file);

        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/gif" || file.type === "image/img") {
            profilePhoto.style.display = "list-item"; profilePhoto.style.listStyleType = "none";
            profilePhoto.src = url;

            fileBtn.style.display = "none";
        }
        else {fileBtn.style.display = "list-item"; fileBtn.style.listStyleType = "none";}

        profilePhoto.onload = function () {
            URL.revokeObjectURL(this.src);
        };
    })

    addNewContactBtn.addEventListener('click', function addContentToDOM(event) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const orangeNumber = document.getElementById('orangeNumber');
        const lonestarNumber = document.getElementById('lonestarNumber');
        const details = document.getElementById('details');
        const profile = document.getElementById('profilePhoto');
        const location = document.getElementById('location');

        event.preventDefault();

        for (let i = 0; i < newInformationForm.length-2; i++) {
            if (newInformationForm[i].value.length < 2) {
                newInformationForm[i].style.outline = "5px solid red";
            }
            else {
                newInformationForm[i].style.outline = "none";
            }
        }

        if (name.value.length > 2 && profilePhoto.src.length > 5 && orangeNumber.value.length === 10 && lonestarNumber.value.length === 10 && email.value.length > 10 && location.value.length > 5 && details.value.length > 21 && email.value.endswith("@gmail.com")) {
            contactsTable.innerHTML +=
            `
                <tr>
                    <td class="editDeleteTd"><img src="./pencil.png" class="pencils"> | <span class="xmark">X</span></td>
                    <td class="profilePhotoTd"><img src="${profile.src}" class="contactsPhoto"></td>
                    <td class="contactDetailsTd"><h3>${name.value}</h3> ${orangeNumber.value} | ${lonestarNumber.value} <br> ${email.value}</td>
                    <td class="locationTd">${location.value}</td>
                    <td class="detailsTd">${details.value}</td>
                </tr>
            `
    
            name.value = ""; email.value = ""; orangeNumber.value = ""; lonestarNumber.value = ""; details.value = ""; location.value = ""; profile.src = "";
    
            profile.style.display = "none";
            fileBtn.style.display = "list-item"; fileBtn.style.listStyleType = "none"; fileBtn.style.outline = "none";

            if (contactsTable.textContent.length > 40) {
                getStartedDiv.style.display = "none";
            }
        
            alert("Contact Added to Phone Book! \nClick the 'View Contacts Button to View Stored Contacts!");
        }
        else {
            details.style.outline = "5px solid red";
            alert("Please Enter valid Responds in the Input Fields!")
        }
    });

    menuButton.addEventListener('click', (event) => {
        sideBar.style.display = "list-item";
        mainBody.style.display = "none";
        newContactForm.style.display = "none";
        searchInput.style.display = "none";
    })
});
