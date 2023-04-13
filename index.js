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
    const contactProfilePageDiv = document.getElementById('contactProfilePageDiv');
    const closeDiv = document.getElementById('closeDiv');

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
    
    function renderContacts() {
        const allContactsArray = JSON.parse(localStorage.getItem('allContactsArray'));

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
    };

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
                contactProfilePageDiv.style.display = "none";
                mainBody.style.display = "list-item"; mainBody.style.listStyleType = "none"; mainBody.style.marginTop = "12px";
                contactsTable.style.display = "list-item"; contactsTable.style.listStyleType = "none";
            }
            else {
                alertDiv.style.display = "block";
                alertDiv.innerText = "You don't have any Contacts yet! \nClick the 'Create New' Button in the Menu to Create a New Contact!";

                setTimeout(() => {
                    alertDiv.style.display = "none";
                }, 5500)
            }
        }

        if (userChoice.id === "closeDiv") {
            contactProfilePageDiv.innerHTML = "";
            contactProfilePageDiv.style.display = "none";
            contactsTable.style.display = "table-row-group";
        }

        if (userChoice.tagName === "TR" || userChoice.tagName === "TD" || userChoice.tagName === "IMG" || userChoice.tagName === "H3") {
            if (userChoice.closest('[title]').title.length > 2) {
                contactsTable.style.display = "none";
                const title = userChoice.closest('[title]').title;

                const allContactsArray = JSON.parse(localStorage.getItem('allContactsArray'));

                const result = allContactsArray.filter((element) => element.name === title);
                
                contactProfilePageDiv.style.display = "block";

                contactProfilePageDiv.innerHTML = 
                `
                    <img src="${result[0].profile}" id="currentProfilePhoto">

                    <div id="closeDiv">x</div>

                    <h2 id="contactNameH2">${result[0].name}</h2>

                    <span>Orange Number</span>

                    <h3 id="contactOrangeNumberH3">${result[0].orangeNumber}</h3>

                    <span>Lonestar Number</span>

                    <h3 id="contactLonestarNumberH3">${result[0].lonestarNumber}</h3>

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
                        }, 500)
                    }

                    if (editButton.innerText === "Save Changes") {
                        editButton.innerText = "Edit";

                        const allContactFieldInputs = contactProfilePageDiv.querySelectorAll('input');
                        const newDetailsValueInput = document.getElementById('newDetailsValueInput');

                        for (let i = 0; i < allContactFieldInputs.length; i++) {
                            allContactFieldInputs[i].style.display = "none";
                        }
                        newDetailsValueInput.style.display = "none";
                    }
                })

                deleteButton.addEventListener('click', (event) => {
                    deleteButton.disabled = true;

                    alertDiv.innerText = "Contact Deleted!";
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
           profileURLData =  readFile.result;
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
                newInformationForm[i].style.outline = "5px solid crimson";
            }
            else {
                newInformationForm[i].style.outline = "none";
            }
        }

        if (name.value.length > 2 && profilePhoto.src.length > 32 && orangeNumber.value.length === 10 && lonestarNumber.value.length === 10 && email.value.length > 12 && location.value.length > 7 && details.value.length > 18 && email.value.endsWith("@gmail.com")) {

            if (orangeNumber.value.startsWith("0776") || orangeNumber.value.startsWith("0770") || orangeNumber.value.startsWith("0779") || orangeNumber.value.startsWith("0778") || orangeNumber.value.startsWith("0775") || orangeNumber.value.startsWith("0777")) {

                if (lonestarNumber.value.startsWith("0880") || lonestarNumber.value.startsWith("0881") || lonestarNumber.value.startsWith("0888") || lonestarNumber.value.startsWith("0886") || lonestarNumber.value.startsWith("0555")) {
                    const allContactsArray = JSON.parse(localStorage.getItem('allContactsArray'));

                    allContactsArray.push({
                        id: JSON.parse(localStorage.getItem('allContactsArray'))[JSON.parse(localStorage.getItem('allContactsArray')).length].id+1,
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

                    alertDiv.style.display = "block";
                    alertDiv.innerText = "Contact Added to Phone Book! \nClick the 'View Contacts Button to View Stored Contacts!";

                    setTimeout(() => {
                        alertDiv.style.display = "none";
                    }, 3000)
                }

                else {
                    lonestarNumber.style.outline = "5px solid crimson";
                    alertDiv.textContent = "Please Input a valid Lonestar Phone Number!";
                    alertDiv.style.display = "block";
    
                    setTimeout(() => {
                        lonestarNumber.style.outline = "none";
                        alertDiv.style.display = "none";
                    }, 2500)
                }
            }

            else {
                orangeNumber.style.outline = "5px solid crimson";
                alertDiv.textContent = "Please Input a valid Orange Phone Number!";
                alertDiv.style.display = "block";

                setTimeout(() => {
                    orangeNumber.style.outline = "none";
                    alertDiv.style.display = "none";
                }, 2500)
            }
        }
        else {
            alertDiv.style.display = "block";
            alertDiv.innerText = "Please Enter valid Responds in the Input Fields! \nHints: \n1. Check if your email is correct! \n2. Check the Length of the Details Field \n3. Check if the Orange and Lonestar Numbers are Valid \n4. Contact Photo is Required! \n5. Location, etc...";

            setTimeout(() => {
                alertDiv.style.display = "none";
            }, 10000)
        }
    });

    menuButton.addEventListener('click', (event) => {
        sideBar.style.display = "list-item";
        mainBody.style.display = "none";
        newContactForm.style.display = "none";
        searchInput.style.display = "none";
    });
});