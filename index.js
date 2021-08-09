let state = {
  selectStateInput: "",
  breweries: [],
  cities: [],
  filters: {
    type: "",
    city: [],
    search: ""
  }
};
const formEl = document.querySelector ("#select-state-form")
// console.log("Select state form: ", formEl)
formEl.addEventListener("submit", (event) => {
  event.preventDefault()

  const stateInput = formEl.querySelector("#select-state")
  // console.log("state input: ", stateInput.value)

  const url = `https://api.openbrewerydb.org/breweries?by_state=${stateInput.value}`
  fetch(url)
  .then((res) => res.json())
  .then((beerState) => {
    state = {
      ...state,
      breweries: beerState
    };
    console.log("Inside GET Fetch: ", beerState);

      renderBreweriesList(beerState);
      renderAsideElement(beerState)
      // filterSearchType(beerState)
      
    
    // Do something with beerState
  });

  formEl.reset()

  //Call ther render function here
})

const mainEl = document.querySelector("main")
// console.log("Inside main: ", mainEl)

// console.log("inside url: ", url)

function renderBreweriesList(stateBrews) {
  // console.log("Inside renderBreweriesList: ", );

  const searchArticleEl = document.createElement("article");
  mainEl.append(searchArticleEl);

  for (let i = 0; i < stateBrews.length; i++) {
    const stateBrew = stateBrews[i];
    // console.log("stateBrew: ", stateBrew)
    

    const ulEl = document.createElement("ul");
    ulEl.className = "breweries-list";
    searchArticleEl.append(ulEl);

    const ListEl = document.createElement("li");
    ListEl.innerHTML = ""
    ulEl.append(ListEl);

    const listh2El = document.createElement("h2");
    listh2El.innerText = stateBrew.name;
    ListEl.append(listh2El);

    const frameEl = document.createElement("div");
    frameEl.className = "type";
    frameEl.innerText = stateBrew.brewery_type;
    ListEl.append(frameEl);

    const searchSectionEl = document.createElement("section");
    searchSectionEl.className = "address";
    ListEl.append(searchSectionEl);

    const addressH3El = document.createElement("h3");
    addressH3El.innerText = "Address: ";
    searchSectionEl.append(addressH3El);

    const listh3El = document.createElement("h3");
    listh3El.innerText = stateBrew.address_2;
    searchSectionEl.append(listh3El);

    const paragraphEl = document.createElement("p");
    paragraphEl.innerText = stateBrew.street;
    searchSectionEl.append(paragraphEl);

    const paragraphEl1 = document.createElement("p");
    searchSectionEl.append(paragraphEl1);

    const strongEl = document.createElement("strong");
    strongEl.innerText = stateBrew.city + ", " + stateBrew.postal_code;
    paragraphEl1.append(strongEl);

    const searchSectionEl2 = document.createElement("section");
    searchSectionEl2.className = "phone";
    ListEl.append(searchSectionEl2);

    const listh3El2 = document.createElement("h3");
    listh3El2.innerText = "Phone: ";

    searchSectionEl2.append(listh3El2);

    const paragraphEl2 = document.createElement("p");
    paragraphEl2.innerText = stateBrew.phone;
    searchSectionEl2.append(paragraphEl2);

    const searchSectionEl3 = document.createElement("section");
    searchSectionEl3.className = "link";
    ListEl.append(searchSectionEl3);

    const anchorEl = document.createElement("a");
    anchorEl.href = stateBrew.website_url;
    anchorEl.target = "_blank";
    anchorEl.innerText = "Visit Website";
    searchSectionEl3.append(anchorEl);
  }
}

function renderAsideElement() {
  const asideEl = document.createElement("aside");
  asideEl.className = "filters-section";
  mainEl.append(asideEl);

  const h2El = document.createElement("h2");
  h2El.innerText = "Filter By";
  asideEl.append(h2El);

  const filterFormEl = document.createElement("form");
  filterFormEl.id = "filter-by-type-form";
  filterFormEl.autocomplete = "off";
  asideEl.append(filterFormEl);

  const filterLabelEl = document.createElement("label");
  filterLabelEl.for = "filter-by-type";
  filterFormEl.append(filterLabelEl);

  const filterh3El = document.createElement("h3");
  filterh3El.innerText = "Type of Brewery";
  filterLabelEl.append(filterh3El);

  const filterSelectEl = document.createElement("select");
  filterSelectEl.name = "filter-by-type";
  filterSelectEl.id = "filter-by-type";
  filterFormEl.append(filterSelectEl);

  const optionEl = document.createElement("option");
  optionEl.value = "";
  optionEl.innerText = "Select a type...";
  filterSelectEl.append(optionEl);

  const optionEl2 = document.createElement("option");
  optionEl2.value = "micro";
  optionEl2.innerText = "Micro";
  if (state.filters.type === optionEl2.value) {
    optionEl2.selected = true;
  }
  filterSelectEl.append(optionEl2);

  const optionEl3 = document.createElement("option");
  optionEl3.value = "regional";
  optionEl3.innerText = "Regional";
  if (state.filters.type === optionEl3.value) {
    optionEl3.selected = true;
  }
  filterSelectEl.append(optionEl3);

  const optionEl4 = document.createElement("option");
  optionEl4.value = "brewpub";
  optionEl4.innerText = "Brewpub";
  if (state.filters.type === optionEl4.value) {
    optionEl4.selected = true;
  }
  filterSelectEl.append(optionEl4);

  const filterDivEl = document.createElement("div");
  filterDivEl.className = "filter-by-city-heading";
  asideEl.append(filterDivEl);

  const divTitleEl = document.createElement("h3");
  divTitleEl.innerText = "Cities";
  
  filterDivEl.append(divTitleEl);

  const divButtonEl = document.createElement("button");
  divButtonEl.className = "clear-all-btn";
  divButtonEl.innerText = "clear all";
  filterDivEl.append(divButtonEl);
  for (let i = 0; i < state.cities.length; i++) {
    console.log("state.cities", state.cities);
    const filter = state.cities[i];

    const formEl2 = document.createElement("form");
    formEl2.id = "filter-by-city-form";
    asideEl.append(formEl2);

    const inputEL1 = document.createElement("input");
    inputEL1.type = "checkbox";
    inputEL1.name = filter.city;
    inputEL1.value = filter.city;
    inputEL1.addEventListener("change", (event) => {
      const filterByTypeValue = event.target.value;
  
      const filterByCityValue = state.filters.city;
  
      const foundCity = filterByCityValue.find(
        (city) => city === filterByTypeValue
      );
  
      if (foundCity) {
        const updatedFilterCityValue = filterByCityValue.filter(
          (city) => city !== filterByTypeValue
        );
  
      state = {
        ...state,
        filters: {
          ...state.filters,
          city: updatedFilterCityValue
        }
      }
    } else {
      state = {
        ...state,
        filters: {
          ...state.filters,
          city: [...state.filters.city, filterByTypeValue]
        }
      };
    }
      console.log("inside state: ", state)
      renderAsideElement()
    });
    formEl2.append(inputEL1);
    
    const labelEl1 = document.createElement("label");
    labelEl1.for = filter.city;
    labelEl1.innerText = filter.city;
    formEl2.append(labelEl1);
    
  }
  
}
// function filterSearchType(filters) {
//   console.log("Inside filterSearchType: ", state.breweries);
//   for (let i = 0; i < filters.length; i++) {
//     const filter = filters[i];
//     const breweryType = filter.brewery_type;
    
//   }
//   if (breweryType === "Micro" || "Regional" || "Brewpub") {

//   }
// }