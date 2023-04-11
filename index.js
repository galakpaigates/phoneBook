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
    const alertDiv = document.getElementById('alertDiv');

    setTimeout(() => {
        loadingDiv.style.display = "none";

        sideBar.style.display = "list-item";

        mainBody.style.display = "list-item";
    }, 3700)

    if (localStorage.getItem('allContactsArray')) {

        const allContactsArray = JSON.parse(localStorage.getItem('allContactsArray'));

        if (allContactsArray.length > 0) {
            getStartedDiv.style.display = "none";

            for (let i = 0; i < allContactsArray.length; i++) {
                contactsTable.innerHTML +=
                `
                    <tr title="${allContactsArray[i].name}" class="contact">
                        <td class="profilePhotoTd"><img src="${allContactsArray[i].profile}" class="contactsPhoto"></td>
                        <td class="contactDetailsTd"><h3>${allContactsArray[i].name}</h3> ${allContactsArray[i].orangeNumber} | ${allContactsArray[i].lonestarNumber} <br> ${allContactsArray[i].email}</td>
                        <td class="locationTd">${allContactsArray[i].location}</td>
                        <td class="detailsTd">${allContactsArray[i].details}</td>
                    </tr>
                `
            }
        }
    }
    else {
        const allContactsArray = [];

        localStorage.setItem('allContactsArray', JSON.stringify(allContactsArray));
    }

    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    })
    document.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {return};
    })

    searchInput.addEventListener('keyup', (event) => {
        for (let i = 0; i < contactsTable.children.length; i++) {
            const listItem = contactsTable.children[i].firstElementChild;
            const listItemText = listItem.innerText.toLowerCase();

            if (listItemText.includes(searchInput.value.toLowerCase())) {
                listItem.parentElement.style.display = "table-row-group";
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
            photoId.click();
            event.preventDefault();
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
                alertDiv.style.display = "block";
                alertDiv.innerText = "You don't have any Contacts yet! \nClick the 'Create New' Button in the Menu to Create a New Contact!";

                setTimeout(() => {
                    alertDiv.style.display = "none";
                }, 2500)
            }
        }

        // if (userChoice.closest.title.length > 5) {
        //     console.log("The user wants to View this Specific Contacts Details!", userChoice.closest.title)
        // }
        // else if (userChoice.parentElement.title.length > 5) {
        //     console.log("The user wants to View this Specific Contacts Details!", userChoice.parentElement.title)
        // }
    })

    profilePhoto.style.display = "none";

    let profileURLData;

    photoId.addEventListener('change', () => {
        const file = photoId.files[0];

        const readFile = new FileReader();

        readFile.addEventListener('load', () => {
            const profileData = readFile.result;

            if (file.type.startsWith("image/")) {
                profilePhoto.style.display = "list-item"; profilePhoto.style.listStyleType = "none";
                profilePhoto.src = profileData;

                fileBtn.style.display = "none";
            }
            else {fileBtn.style.display = "list-item"; fileBtn.style.listStyleType = "none";}
           profileURLData =  readFile.result
        })
        readFile.readAsDataURL(file);
    });

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

        if (name.value.length > 2 && profilePhoto.src.length > 32 && orangeNumber.value.length === 10 && lonestarNumber.value.length === 10 && email.value.length > 12 && location.value.length > 7 && details.value.length > 30 && email.value.endsWith("@gmail.com")) {
            const allContactsArray = JSON.parse(localStorage.getItem('allContactsArray'));

            allContactsArray.push({
                id: JSON.parse(localStorage.getItem('allContactsArray')).length+1,
                name: name.value,
                email: email.value,
                orangeNumber: orangeNumber.value,
                lonestarNumber: lonestarNumber.value,
                location: location.value,
                details: details.value,
                profile: profileURLData,
            })

            localStorage.setItem('allContactsArray', JSON.stringify(allContactsArray));
            contactsTable.innerHTML = "";
            
            for (let i = 0; i < allContactsArray.length; i++) {
                contactsTable.innerHTML +=
                `
                    <tr title="${allContactsArray[i].name}" class="contact">
                        <td class="profilePhotoTd"><img src="${allContactsArray[i].profile}" class="contactsPhoto"></td>
                        <td class="contactDetailsTd"><h3>${allContactsArray[i].name}</h3> ${allContactsArray[i].orangeNumber} | ${allContactsArray[i].lonestarNumber} <br> ${allContactsArray[i].email}</td>
                        <td class="locationTd">${allContactsArray[i].location}</td>
                        <td class="detailsTd">${allContactsArray[i].details}</td>
                    </tr>
                `
            }
    
            name.value = ""; email.value = ""; orangeNumber.value = ""; lonestarNumber.value = ""; details.value = ""; location.value = ""; profile.src = "";
    
            profile.style.display = "none";
            fileBtn.style.display = "list-item"; fileBtn.style.listStyleType = "none"; fileBtn.style.outline = "none";

            if (contactsTable.textContent.length > 40) {
                getStartedDiv.style.display = "none";
            }
                alertDiv.style.display = "block";
                alertDiv.innerText = "Contact Added to Phone Book! \nClick the 'View Contacts Button to View Stored Contacts!";

                setTimeout(() => {
                    alertDiv.style.display = "none";
                }, 2500)
        }
        else {
            details.style.outline = "5px solid red";
            alertDiv.style.display = "block";
            alertDiv.innerText = "Please Enter valid Responds in the Input Fields! \nCheck the Email Field and the Length of the Details Field and other Fields!";

            setTimeout(() => {
                alertDiv.style.display = "none";
            }, 2500)
        }
    })

    menuButton.addEventListener('click', (event) => {
        sideBar.style.display = "list-item";
        mainBody.style.display = "none";
        newContactForm.style.display = "none";
        searchInput.style.display = "none";
    });
});