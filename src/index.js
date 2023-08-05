document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menuButton');
    const menuBar = document.getElementById('menuBar');
    const sideBar = document.getElementById('sideBar');
    const mainBody = document.getElementById('mainBody');
    const searchInput = document.getElementById('searchInput');
    const newContactForm = document.getElementById('newContactForm');
    const photoId = document.getElementById('photoId');
    const profilePhoto = document.getElementById('profilePhoto');
    const newInformationForm = document.getElementById('newInformationForm');
    const contactsTable = document.getElementById('contactsTable');
    const fileBtn = document.getElementById('fileBtn');
    const addNewContactBtn = document.getElementById('addNewContactBtn');
    const loadingDiv = document.getElementById('loadingDiv');
    const getStartedDiv = document.querySelector('.getStartedDiv');
    const alertDiv = document.getElementById('alertDiv');
    const alertMessage = document.getElementById("alertMessage");
    const contactProfilePageDiv = document.getElementById('contactProfilePageDiv');
    const rightClickOptionsDiv = document.getElementById('rightClickOptionsDiv');

    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    setTimeout(() => {
        loadingDiv.style.display = "none";

        sideBar.style.display = "list-item";

        mainBody.style.display = "list-item";

        document.addEventListener('contextmenu', (event) => {
            rightClickOptionsDiv.style.display = "flex";

            event.preventDefault();
    });
    }, 700)

    if (localStorage.getItem('allContactsArray')) {
        newContactForm.style.display = "none";

        const allContactsArray = JSON.parse(localStorage.getItem('allContactsArray'));

        if (allContactsArray.length > 0) {
            getStartedDiv.style.display = "none";

            for (let i = 0; i < allContactsArray.length; i++) {

                if (allContactsArray[i].profile) {

                    contactsTable.innerHTML +=
                    `
                        <tr title="${allContactsArray[i].name}" class="contact">
                            <td class="favoriteCheckboxTd"><input type="checkbox" value="${allContactsArray[i].name}" class="favoriteCheckBox"></td>
                            <td class="profilePhotoTd"><img src="${allContactsArray[i].profile}" class="contactsPhoto"></td>
                            <td class="contactDetailsTd"><h3>${allContactsArray[i].name}</h3> ${allContactsArray[i].orangeNumber} | ${allContactsArray[i].lonestarNumber}</td>
                            <td class="locationTd">${allContactsArray[i].location}</td>
                        </tr>
                    `
                }

                else {

                    contactsTable.innerHTML +=
                    `
                        <tr title="${allContactsArray[i].name}" class="contact">
                            <td class="favoriteCheckboxTd"><input type="checkbox" value="${allContactsArray[i].name}" class="favoriteCheckBox"></td>
                            <td class="profilePhotoTd"><img src="./src/img/noProfilePhoto.png" class="contactsPhoto"></td>
                            <td class="contactDetailsTd"><h3>${allContactsArray[i].name}</h3> ${allContactsArray[i].orangeNumber} | ${allContactsArray[i].lonestarNumber}</td>
                            <td class="locationTd">${allContactsArray[i].location}</td>
                        </tr>
                    `
                }
            }
        }
    }
    else {
        const allContactsArray = [];

        localStorage.setItem('allContactsArray', JSON.stringify(allContactsArray));
    }

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
    
    function renderContacts() {
        const allContactsArray = JSON.parse(localStorage.getItem('allContactsArray'));

        contactsTable.innerHTML = "";
        
        for (let i = 0; i < allContactsArray.length; i++) {

            if (allContactsArray[i].profile) {

                contactsTable.innerHTML +=
                `
                    <tr title="${allContactsArray[i].name}" class="contact">
                        <td class="favoriteCheckboxTd"><input type="checkbox" value="${allContactsArray[i].name}" class="favoriteCheckBox"></td>
                        <td class="profilePhotoTd"><img src="${allContactsArray[i].profile}" class="contactsPhoto"></td>
                        <td class="contactDetailsTd"><h3>${allContactsArray[i].name}</h3> ${allContactsArray[i].orangeNumber} | ${allContactsArray[i].lonestarNumber}</td>
                        <td class="locationTd">${allContactsArray[i].location}</td>
                    </tr>
                `
            }

            else {

                contactsTable.innerHTML +=
                `
                    <tr title="${allContactsArray[i].name}" class="contact">
                        <td class="favoriteCheckboxTd"><input type="checkbox" value="${allContactsArray[i].name}" class="favoriteCheckBox"></td>
                        <td class="profilePhotoTd"><img src="./src/img/noProfilePhoto.png" class="contactsPhoto"></td>
                        <td class="contactDetailsTd"><h3>${allContactsArray[i].name}</h3> ${allContactsArray[i].orangeNumber} | ${allContactsArray[i].lonestarNumber}</td>
                        <td class="locationTd">${allContactsArray[i].location}</td>
                    </tr>
                `
            }
        }
    };

    const favoriteCheckBox = document.getElementsByClassName('favoriteCheckBox');
    const favoriteCheckboxTd = document.getElementsByClassName('favoriteCheckboxTd');

    let num = 0;
    var checkedContactsArray = [];

    document.addEventListener('click', (event) => {
        const userChoice = event.target;
        rightClickOptionsDiv.style.display = "none";

        if (userChoice.className === "searchButton") {
            document.querySelectorAll('.addToFavorites')[0].style.pointerEvents = "auto";
            document.querySelectorAll('.addToFavorites')[1].style.pointerEvents = "auto";

            if (screen.width < 890) {
                sideBar.style.display = "none"; searchInput.style.marginLeft = "92px"; searchInput.style.marginTop = "-45px";
                menuBar.style.display = "list-item"; menuBar.style.listStyleType = "none"; menuButton.style.display = "list-item";
            };
            searchInput.style.display = "list-item"; searchInput.style.width = "60vw";

            newContactForm.style.display = "none";
            contactProfilePageDiv.style.display = "none";

            if (screen.width > 890) {
                mainBody.style.marginTop = "100px";
                contactsTable.style.marginTop = "100px";
                searchInput.style.marginTop = "-60px"; searchInput.style.marginLeft = "21.5vw"; 
            }

            mainBody.style.display = "list-item"; mainBody.style.listStyleType = "none"; mainBody.style.marginTop = "12px";
            contactsTable.style.display = "list-item"; contactsTable.style.listStyleType = "none"; 
        }

        if (userChoice.className === "createNew") {
            if (document.getElementById("createFavoriteButton")) {
                document.getElementById('createFavoriteButton').style.display = "none";
            }

            document.querySelectorAll('.addToFavorites')[0].style.pointerEvents = "auto";
            document.querySelectorAll('.addToFavorites')[1].style.pointerEvents = "auto";


            for (let i = 0; i < favoriteCheckboxTd.length; i++) {
                favoriteCheckboxTd[i].style.display = "none";
            }

            if (document.getElementById('createFavoriteButton')) {
                document.getElementById('createFavoriteButton').style.display = "none";
            }

            contactsTable.style.display = "none";
            contactProfilePageDiv.style.display = "none";
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

        if (userChoice.className === "favoriteCheckBox") {
            checkedContactsArray.push(
                {[num+=1]: userChoice.value},
            );
        }

        if (userChoice.className === "addToFavorites") {

            if (contactsTable.textContent.length > 40) {
                newContactForm.style.display = "none";
                searchInput.style.display = "none";
                mainBody.style.display = "list-item"; mainBody.style.listStyleType = "none"; mainBody.style.marginTop = "12px";
                contactsTable.style.display = "table-row-group";
                contactProfilePageDiv.style.display = "none";

                if (screen.width < 890) {
                    sideBar.style.display = "none";
                    menuBar.style.display = "list-item"; menuButton.style.display = "list-item"; menuBar.style.listStyleType = "none"; menuButton.style.listStyleType = "none";
                }

                if (screen.width < 393) {
                    for (let i = 0; i < favoriteCheckboxTd.length; i++) {
                        document.querySelectorAll('.profilePhotoTd')[i].style.display = "none";
                    }
                }
                else {
                    for (let i = 0; i < favoriteCheckboxTd.length; i++) {
                        document.querySelectorAll('.profilePhotoTd')[i].style.display = "table-cell";
                    }
                }

                const createFavoriteButton = document.createElement('button');
                createFavoriteButton.type = "button"; createFavoriteButton.className = "createFavoriteButton";

                document.querySelectorAll('.addToFavorites')[0].style.pointerEvents = "none";
                document.querySelectorAll('.addToFavorites')[1].style.pointerEvents = "none";
    
                if (!document.getElementById("createFavoriteButton") || document.getElementById('createFavoriteButton').style.display == "none") {
                    contactsTable.insertAdjacentHTML("afterend", 
                    `
                        <button type="button" id="createFavoriteButton"><svg xmlns="http://www.w3.org/2000/svg" style="height: 17px;" class="starSVG" height="48" viewBox="0 96 960 960" width="48"><path d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg> Create Favorite <svg xmlns="http://www.w3.org/2000/svg" style="height: 17px;" class="starSVG" height="48" viewBox="0 96 960 960" width="48"><path d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg></button>
                    `)
                }

                createFavoriteButton.style.display = "block";
    
                for (let i = 0; i < favoriteCheckboxTd.length; i++) {
                    favoriteCheckboxTd[i].style.display = "table-cell";
                }
    
                const addFavoritesBtn = document.getElementById('createFavoriteButton');
    
                addFavoritesBtn.addEventListener('click', (event) => {
                    document.querySelectorAll('.addToFavorites')[0].style.pointerEvents = "auto";
                    document.querySelectorAll('.addToFavorites')[1].style.pointerEvents = "auto";

                    const allContactsArray = JSON.parse(localStorage.getItem('allContactsArray'));
                    for (let i = 0; i < checkedContactsArray.length; i++) {

                        const currentFavoriteName = checkedContactsArray[i][i+1];
                        const currentFavorite = allContactsArray.findIndex((name) => name.name === currentFavoriteName);
                        allContactsArray[currentFavorite].lonestarNumber += '<svg xmlns="http://www.w3.org/2000/svg" class="starSVG" height="48" viewBox="0 96 960 960" width="48"><path d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>';
                    }
                    checkedContactsArray = [];

                    localStorage.setItem('allContactsArray', JSON.stringify(allContactsArray));

                    renderContacts();

                    alertMessage.innerText = "Contacts Added to Favorites!";
                    alertDiv.style.display = "block";
    
                    setTimeout(() => {
                        for (let i = 0; i < favoriteCheckboxTd.length; i++) {
                            favoriteCheckboxTd[i].style.display = "none";
                        }
        
                        addFavoritesBtn.style.display = "none";
                    }, 700);

                    setTimeout(() => {
                        alertDiv.style.display = "none";
                    }, 1200);
                });
            }

            else {
                alertMessage.innerText = "You don't have any Contacts yet! \nClick the 'Create New' Button to get Started!";
                alertDiv.style.display = "block";

                setTimeout(() => {
                    alertDiv.style.display = "none";
                }, 3000);
            }
        }

        if (userChoice.className === "viewAllContacts") {
            document.querySelectorAll('.addToFavorites')[0].style.pointerEvents = "auto";
            document.querySelectorAll('.addToFavorites')[1].style.pointerEvents = "auto";

            if (contactsTable.innerText.length > 40) {

                if (screen.width < 890.1) {
                    sideBar.style.display = "none";
                    menuBar.style.display = "list-item"; menuBar.style.listStyleType = "none";
                    menuButton.style.display = "list-item"; menuButton.style.listStyleType = "none";
                }

                if (screen.width > 890) {
                    menuButton.style.display = "none";
                }
                
                newContactForm.style.display = "none";
                searchInput.style.display = "none";
                contactProfilePageDiv.style.display = "none";
                mainBody.style.display = "list-item"; mainBody.style.listStyleType = "none"; mainBody.style.marginTop = "12px";
                contactsTable.style.display = "list-item"; contactsTable.style.listStyleType = "none"; contactsTable.style.marginTop = "12px";
            }
            else {
                alertMessage.innerText = "You don't have any Contacts yet! \nClick the 'Create New' Button in the Menu to Create a New Contact!";
                alertDiv.style.display = "block";

                setTimeout(() => {
                    alertDiv.style.display = "none";
                }, 5000)
            }
        }

        if (userChoice.id === "closeDiv") {
            contactProfilePageDiv.innerHTML = "";
            contactProfilePageDiv.style.display = "none";
            contactsTable.style.display = "table-row-group";
        }

        if (userChoice.id === "removeAlert") {
            alertDiv.style.display = "none";
        }

        if (userChoice.tagName === "TR" || userChoice.tagName === "TD" || userChoice.tagName === "IMG" || userChoice.tagName === "H3") {
            if (userChoice.closest('[title]').title.length > 2) {
                if (document.getElementById("createFavoriteButton")) {
                    document.getElementById('createFavoriteButton').style.display = "none";
                }

                document.querySelectorAll('.addToFavorites')[0].style.pointerEvents = "auto";
                document.querySelectorAll('.addToFavorites')[1].style.pointerEvents = "auto";

                searchInput.style.display = "none";
                contactsTable.style.display = "none";
                const title = userChoice.closest('[title]').title;

                const allContactsArray = JSON.parse(localStorage.getItem('allContactsArray'));

                const result = allContactsArray.filter((element) => element.name === title);
                
                contactProfilePageDiv.style.display = "block";

                var onlyNumber = "";

                for (let i = 0; i < 13; i++) {
                    onlyNumber += result[0].lonestarNumber[i];
                }

                if (result[0].profile) {
                    contactProfilePageDiv.innerHTML = 
                    `
                        <img src="${result[0].profile}" id="currentProfilePhoto">

                        <div id="closeDiv">x</div>

                        <h2 id="contactNameH2">${result[0].name}</h2>

                        <span>Orange Number</span>

                        <a href='tel:${result[0].orangeNumber}'><button class="callBtn">Call</button></a> <h3 id="contactOrangeNumberH3">${result[0].orangeNumber}</h3>

                        <span>Lonestar Number</span>

                        <a href='tel:${onlyNumber}'><button class="callBtn">Call</button></a> <h3 id="contactLonestarNumberH3">${result[0].lonestarNumber}</h3>
                        
                        <span>Email Address</span>

                        <h3 id="contactEmailH3">${result[0].email}</h3>

                        <span>Location</span>

                        <h3 id="contactLocationH3">${result[0].location}</h3>

                        <span>Contact's Details</span>

                        <h3 id="contactDetailsH3">${result[0].details}</h3>

                        <hr>

                        <button id="editButton">Edit</button>

                        <button id="deleteButton">Delete</button>
                    `
                }

                else {
                    contactProfilePageDiv.innerHTML = 
                    `
                        <img src="./src/img/noProfilePhoto.png" id="currentProfilePhoto">

                        <div id="closeDiv">x</div>

                        <h2 id="contactNameH2">${result[0].name}</h2>

                        <span>Orange Number</span>

                        <a href='tel:${result[0].orangeNumber}'><button class="callBtn">Call</button></a> <h3 id="contactOrangeNumberH3">${result[0].orangeNumber}</h3>

                        <span>Lonestar Number</span>

                        <a href='tel:${onlyNumber}'><button class="callBtn">Call</button></a> <h3 id="contactLonestarNumberH3">${result[0].lonestarNumber}</h3>
                        
                        <span>Email Address</span>

                        <h3 id="contactEmailH3">${result[0].email}</h3>

                        <span>Location</span>

                        <h3 id="contactLocationH3">${result[0].location}</h3>

                        <span>Contact's Details</span>

                        <h3 id="contactDetailsH3">${result[0].details}</h3>

                        <hr>

                        <button id="editButton">Edit</button>

                        <button id="deleteButton">Delete</button>
                    `
                }

                const editButton = document.getElementById('editButton');
                const deleteButton = document.getElementById('deleteButton');

                editButton.addEventListener('click', (event) => {

                    if (editButton.innerText === "Edit") {
                        const contactNameH2 = document.getElementById('contactNameH2');
                        const contactOrangeNumberH3 = document.getElementById('contactOrangeNumberH3');
                        const contactLonestarNumberH3 = document.getElementById('contactLonestarNumberH3');
                        const contactEmailH3 = document.getElementById('contactEmailH3');
                        const contactLocationH3 = document.getElementById('contactLocationH3');
                        const contactDetailsH3 = document.getElementById('contactDetailsH3');
    
                        contactNameH2.insertAdjacentHTML("beforeend", 
                        `
                            <input type="text" id="newNameValueInput" value="${contactNameH2.innerText}" placeholder="Enter New Name...">
                        `);

                        contactOrangeNumberH3.insertAdjacentHTML("beforeend", 
                        `
                            <input type="tel" id="newOrangeNumberValueInput" value="${contactOrangeNumberH3.innerText}" placeholder="Enter New Orange Number...">
                        `);

                        contactLonestarNumberH3.insertAdjacentHTML("beforeend", 
                        `
                            <input type="tel" id="newLonestarNumberValueInput" value="${contactLonestarNumberH3.innerText}" placeholder="Enter New Lonestar Number...">
                        `);

                        contactEmailH3.insertAdjacentHTML("beforeend", 
                        `
                            <input type="email" id="newEmailValueInput" value="${contactEmailH3.innerText}" placeholder="Enter New Email Address...">
                        `);

                        contactLocationH3.insertAdjacentHTML("beforeend", 
                        `
                            <input type="text" value="${contactLocationH3.innerText}" id="newLocationValueInput" placeholder="Enter New Location...">
                        `);

                        contactDetailsH3.insertAdjacentHTML("afterend", 
                        `
                            <textarea id="newDetailsValueInput" placeholder="Enter New Details...">${contactDetailsH3.innerText}</textarea>
                        `);
    
                        setTimeout(() => {
                            editButton.innerText = "Save Changes";
                        }, 250)
                    }

                    if (editButton.innerText === "Save Changes") {
                        editButton.innerText = "Edit";

                        const pendingChange = allContactsArray.findIndex((contact) => contact.name === title)
                        
                        allContactsArray[pendingChange].name = document.getElementById('newNameValueInput').value;
                        allContactsArray[pendingChange].orangeNumber = document.getElementById('newOrangeNumberValueInput').value;
                        allContactsArray[pendingChange].lonestarNumber = document.getElementById('newLonestarNumberValueInput').value;
                        allContactsArray[pendingChange].email = document.getElementById('newEmailValueInput').value;
                        allContactsArray[pendingChange].location = document.getElementById('newLocationValueInput').value;
                        allContactsArray[pendingChange].details = document.getElementById('newDetailsValueInput').value;

                        localStorage.setItem('allContactsArray', JSON.stringify(allContactsArray));

                        alertMessage.innerText = "Edit Saved!";
                        alertDiv.style.display = "block";

                        setTimeout(() => {
                            const allContactFieldInputs = contactProfilePageDiv.querySelectorAll('input');
                            const newDetailsValueInput = document.getElementById('newDetailsValueInput');

                            for (let i = 0; i < allContactFieldInputs.length; i++) {
                                allContactFieldInputs[i].style.display = "none";
                            }
                            newDetailsValueInput.style.display = "none";
                        }, 500)

                        setTimeout(() => {
                            alertDiv.style.display = "none";
                            contactProfilePageDiv.style.display = "none";
                            contactsTable.style.display = "table-row-group";
    
                            renderContacts();
                        }, 1000);
                    }
                })

                deleteButton.addEventListener('click', (event) => {
                    deleteButton.disabled = true;

                    alertMessage.innerText = "Contact Deleted!";
                    alertDiv.style.display = "block";
                    setTimeout(() => {
                        const pendingDelete = allContactsArray.findIndex((contact) => contact.name === title)

                        allContactsArray.splice(pendingDelete, 1);

                        localStorage.setItem('allContactsArray', JSON.stringify(allContactsArray));

                        alertDiv.style.display = "none";

                        contactProfilePageDiv.style.display = "none";

                        contactsTable.style.display = "table-row-group";

                        renderContacts();
                    }, 1500);
                });
            }
        }

        if (userChoice.className === "favoriteCheckBox") {

            const star = document.createElement('div');
            star.className = "starSVGDiv";
            star.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="pointer-events: none;" class="starSVG" height="48" viewBox="0 96 960 960" width="48"><path d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>';
            star.style.pointerEvents = "auto";

            userChoice.replaceWith(star);
        }
    });

    profilePhoto.style.display = "none";

    let profileURLData;

    photoId.addEventListener('change', () => {
        const file = photoId.files[0];

        const readFile = new FileReader();

        readFile.addEventListener('load', () => {
        
            if (file.type.startsWith("image/")) {
                profilePhoto.style.display = "list-item"; profilePhoto.style.listStyleType = "none";
                profilePhoto.src = readFile.result;

                fileBtn.style.display = "none";
                
                profileURLData =  readFile.result;
            }

            else {
                alertMessage.innerText = "Please Select an Image!";
                alertDiv.style.display = "block";
                fileBtn.style.outline = "5px solid crimson";
                fileBtn.style.display = "list-item"; fileBtn.style.listStyleType = "none"; profilePhoto.style.display = "none";

                setTimeout(() => {
                    alertDiv.style.display = "none";
                    fileBtn.style.outline = "none";
                }, 1300);
            }
        });
        readFile.readAsDataURL(file);
    });

    addNewContactBtn.addEventListener('click', (event) => {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const orangeNumber = document.getElementById('orangeNumber');
        const lonestarNumber = document.getElementById('lonestarNumber');
        const details = document.getElementById('details');
        const profile = document.getElementById('profilePhoto');
        const location = document.getElementById('location');

        event.preventDefault();

        let count = 0;

        for (let i = 0; i < newInformationForm.length-1; i++) {
            if (i < 7) {
                if (newInformationForm[i].value.length < 2 || newInformationForm[i].value.includes("  ")) {
                    count+=1;
                    newInformationForm[i].style.outline = "5px solid crimson";
                }
                else {
                    newInformationForm[i].style.outline = "none";
                }
            }
        };

        if (count === 1) {

            if (orangeNumber.value.startsWith('+') && lonestarNumber.value.startsWith('+')) {

                if (lonestarNumber.value.length > 9 && orangeNumber.value.length > 9) {

                    if (email.value.includes("@") && email.value.includes(".") && email.value.length > 10) {

                        if (location.value.length > 10) {

                            if (details.value.length > 10) {

                                const allContactsArray = JSON.parse(localStorage.getItem('allContactsArray'));

                                let newId;

                                if (allContactsArray.length > 0) {
                                    newId = allContactsArray[allContactsArray.length-1].id+1;
                                }
                                else {
                                    newId = allContactsArray.length+1;
                                }

                                allContactsArray.push({
                                    id: newId,
                                    name: name.value,
                                    email: email.value,
                                    orangeNumber: orangeNumber.value,
                                    lonestarNumber: lonestarNumber.value,
                                    location: location.value,
                                    details: details.value,
                                    profile: profileURLData,
                                })

                                localStorage.setItem('allContactsArray', JSON.stringify(allContactsArray));

                                renderContacts();

                                name.value = ""; email.value = ""; orangeNumber.value = ""; lonestarNumber.value = ""; details.value = ""; location.value = ""; profile.src = "";

                                profile.style.display = "none";
                                fileBtn.style.display = "list-item"; fileBtn.style.listStyleType = "none"; fileBtn.style.outline = "none";

                                if (contactsTable.textContent.length > 40) {
                                    getStartedDiv.style.display = "none";
                                }

                                alertMessage.innerText = "Contact Added to Phone Book! \nClick the 'View Contacts Button to View Stored Contacts!";
                                alertDiv.style.display = "block";

                                setTimeout(() => {
                                    alertDiv.style.display = "none";
                                }, 3000);
                            }

                            else {
                                details.style.outline = "5px solid crimson";
                                alertMessage.innerText = "Please Check the Length of the Details Field! \nBe more Clear!";
                                alertDiv.style.display = "block";
                
                                setTimeout(() => {
                                    details.style.outline = "none";
                                    alertDiv.style.display = "none";
                                }, 2200)
                            }
                        }

                        else {
                            location.style.outline = "5px solid crimson";
                            alertMessage.innerText = "Please Check the Length of the Location Field! \nBe more Clear!";
                            alertDiv.style.display = "block";
            
                            setTimeout(() => {
                                location.style.outline = "none";
                                alertDiv.style.display = "none";
                            }, 2200)
                        }
                    }

                    else {
                        email.style.outline = "5px solid crimson";
                        alertDiv.textContent = "Please Enter a Valid Email Address!";
                        alertDiv.style.display = "block";
        
                        setTimeout(() => {
                            email.style.outline = "none";
                            alertDiv.style.display = "none";
                        }, 2000)
                    }
                }
                else {
                    lonestarNumber.style.outline = "5px solid crimson"; orangeNumber.style.outline = "5px solid crimson";
                    alertMessage.innerText = "Please Check the Length of the Orange or Lonestar Phone Numbers!";
                    alertDiv.style.display = "block";

                    setTimeout(() => {
                        alertDiv.style.display = "none";
                    lonestarNumber.style.outline = "none"; orangeNumber.style.outline = "none";
                    }, 1500);
                }
            }

            else {
                orangeNumber.style.outline = "5px solid crimson";
                lonestarNumber.style.outline = "5px solid crimson";
                alertMessage.innerText = "Please Start with the Country Code! \nExample: +231775326934 or +231555943559";
                alertDiv.style.display = "block";

                setTimeout(() => {
                    orangeNumber.style.outline = "none";
                    lonestarNumber.style.outline = "none";
                    alertDiv.style.display = "none";
                }, 4000);
            }
        }
        else {
            alertDiv.style.display = "block";
            alertMessage.innerText = "All the Fields are Required! \nPlease Avoid Double Spacing!";

            setTimeout(() => {
                alertDiv.style.display = "none";
            }, 2500)
        }
    });

    menuButton.addEventListener('click', (event) => {
        sideBar.style.display = "list-item";
        mainBody.style.display = "none";
        newContactForm.style.display = "none";
        searchInput.style.display = "none";

        if (screen.width < 890) {
            document.querySelectorAll('.addToFavorites')[0].style.pointerEvents = "auto";
            document.querySelectorAll('.addToFavorites')[1].style.pointerEvents = "auto";
        }
    });
});
