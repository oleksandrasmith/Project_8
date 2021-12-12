let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalNext = document.querySelector(".modal-next");
const modalPrevious = document.querySelector(".modal-previous");
let modalIndex = 0;


fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" alt="profile picture" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
    });

    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {

    let { name, dob, phone, email, location: { street, city, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" alt="profile picture" />
        <div class="text-container modal-text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${city},  ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    modalIndex = index;
}

gridContainer.addEventListener('click', e => {

    if (e.target !== gridContainer) {

        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});


// Searchbar -------------------------------------------------------------------

function searchNames() {
	let input = document.getElementById('searchbar').value;
	input=input.toLowerCase();
	let x = document.querySelectorAll('.card');
	
	for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].classList.add("hidden")
		}
		else {
            x[i].classList.remove("hidden");
			x[i].style.display=".card";				
		}
	}
}

// Next / Previous -------------------------------------------------------------------


modalNext.addEventListener('click', () => {
    if (modalIndex === 11) {
        displayModal(0);
    } else {
     modalIndex++;
    displayModal(modalIndex);
    }
});

modalPrevious.addEventListener('click', () => {
    if (modalIndex === 0) {
        displayModal(11);
    } else {
     modalIndex--;
    displayModal(modalIndex);
    }
});