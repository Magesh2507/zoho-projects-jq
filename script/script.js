
const dropDownContainer = document.querySelector(".content-dropdown");
const dataContainers = document.querySelectorAll(".accordion-head");
const countryDropDownContainer = document.getElementById("selected-items-container");
const searchInput = document.getElementById("search");
const searchDropDown = document.getElementById("search-myDropdown");
const searchItems = document.querySelectorAll(".filtered-items")
searchInput.addEventListener("focus", ()=>toggleList(searchDropDown))

searchInput.addEventListener("blur", ()=>{
    searchDropDown.classList.remove("open")
})

searchInput.addEventListener('keyup', filterFunction)

dropDownContainer.addEventListener("click",()=>toggleList(dropDownContainer));
dataContainers.forEach((dataContainer)=>{
    dataContainer.addEventListener("click",()=>toggleList(dataContainer.parentElement));
})
countryDropDownContainer.addEventListener("click",()=>toggleList(countryDropDownContainer));


// close and open drop downs
function toggleList(container){   
    container.classList.toggle('open')
}


document.addEventListener('DOMContentLoaded', function () {
    const ulElement = document.querySelector('.name-ul');
    const selectedItemsContainer = document.getElementById('selected-items-container');

    document.addEventListener('click', function(event) {
        if (!dropDownContainer.contains(event.target)) {
            dropDownContainer.classList.remove('open');
        }
        if (!countryDropDownContainer.contains(event.target)) {
            countryDropDownContainer.classList.remove('open');
        }
    });

    // Function to create a span element with a close button
    function createSelectedItem(text) {
        const span = document.createElement('span');
        span.className = 'selected-item';
        span.textContent = text;

        const closeButton = document.createElement('span');
        closeButton.className = 'span-close-btn';
        closeButton.textContent = '\u00D7';
        closeButton.addEventListener('click', function (event) {
            event.stopPropagation(); 
            ulElement.appendChild(createListItem(text));
            selectedItemsContainer.removeChild(span);
        });

        span.appendChild(closeButton);
        return span;
    }

    // Function to create a list item
    function createListItem(text) {
        const li = document.createElement('li');
        li.className = 'name-li';
        li.textContent = text;
        li.addEventListener('click', function (event) {
            event.stopPropagation(); 
            selectedItemsContainer.appendChild(createSelectedItem(text));
            ulElement.removeChild(li);
        });
        return li;
    }

    // Initial event listeners for existing list items
    const listItems = ulElement.querySelectorAll('.name-li');
    listItems.forEach(function (li) {
        li.addEventListener('click', function (event) {
            event.stopPropagation(); 
            selectedItemsContainer.appendChild(createSelectedItem(li.textContent));
            ulElement.removeChild(li);
        });
    });
});


// filter list by input text
function filterFunction(){   
    let searchText = searchInput.value.toLowerCase();
    searchItems.forEach(function(item) {
        let itemText = item.textContent.toLowerCase();
        if (itemText.includes(searchText)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}