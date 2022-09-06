var checkPerson = false; 
var checkRoller = false; 
var checkEnheter = false; 

function select(selected){

  let person_bilde = document.getElementById("person");
  let organisasjon_bilde = document.getElementById("organisasjon");
  let roller_bilde = document.getElementById('roller');

  if (selected === 'person'){

    person_bilde.classList.add("selected")
    organisasjon_bilde.classList.remove('selected');
    roller_bilde.classList.remove("selected");
    
    checkPerson = true; 
    checkRoller = false; 
    checkEnheter = false;
    document.getElementById('search_input').placeholder='navn på person'
  }

  else if (selected === 'organisasjon'){
    organisasjon_bilde.classList.add("selected")
    person_bilde.classList.remove("selected")
    roller_bilde.classList.remove("selected")

    checkPerson = false;
    checkRoller = false;
    checkEnheter = true
    document.getElementById('search_input').placeholder='organisasjonsnummer'
  }

  else if (selected === 'roller'){

    roller_bilde.classList.add("selected");
    person_bilde.classList.remove("selected");
    organisasjon_bilde.classList.remove("selected");

    checkPerson = false;
    checkRoller = true;
    checkEnheter = false
    document.getElementById('search_input').placeholder='organisasjonsnummer'
  }
}

function determineAPI(search_term){
  let current_API = undefined;
  name_API = 'https://code-challenge.stacc.dev/api/pep?name=';
  roller_API = 'https://code-challenge.stacc.dev/api/roller?orgNr='; 
  enheter_API = "https://code-challenge.stacc.dev/api/enheter?orgNr=";


  if (checkPerson){
    current_API = name_API+search_term;
    let checkbox_container = document.getElementById("person_checkbox");
    var checkboxes = checkbox_container.getElementsByTagName("input");

  }
  else if (checkEnheter){
    current_API = enheter_API+search_term;
    let checkbox_container = document.getElementById("organisasjon_checkbox");
    var checkboxes = checkbox_container.getElementsByTagName("input");
  }

  else if (checkRoller){
    current_API = roller_API+search_term;
    let checkbox_container = document.getElementById("roller_checkbox");
    var checkboxes = checkbox_container.getElementsByTagName("input");
  }
  return [current_API, checkboxes];
}

function fetchData(){
  const search_term = document.getElementById('search_input').value;
  document.getElementById('search_input').value = "";
  document.getElementById("results_display").innerText = ""
  
  if(search_term.length > 0){
    let API_CHECKBOXES = determineAPI(search_term);
    var current_API = API_CHECKBOXES[0];
    var checkboxes = API_CHECKBOXES[1];

    fetch(current_API, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {

      if (checkPerson){
        usePersonAPI(response, checkboxes, search_term);
      }
      else if (checkRoller){
        useCompanyAPI(response, checkboxes, search_term); 
      }
      else if (checkEnheter){
        useCompanyAPI(response, checkboxes, search_term);
      }   
      });
  }
}

function usePersonAPI(response, checkboxes, name){
  addInfo('Person: '+name, document.createElement('h1'));
  for (i=0; i < response['numberOfHits']; i++){
    addInfo(`Dataset ${i+1}: ${response.hits[i].dataset}`,document.createElement('h2'))
    addInfo("PEP-score: "+(response.hits[i].score.toFixed(5)), document.createElement('p'))
    for (let i = 0; i < checkboxes.length; i++){
      if (checkboxes[i].checked){
        addInfo(`${checkboxes[i].name}: ${response.hits[0][checkboxes[i].id]}`, document.createElement('p'))
      }
    }
  }
}

function useCompanyAPI(response, checkboxes, company_nr){

  addInfo('Organisasjons nr: ' + company_nr, document.createElement('h1'));
  let company_name = response["navn"];
  if (company_name===undefined){
    company_name = "Fant ikke navn, dessverre..."
  }
  addInfo('Selskapets navn: '+company_name, document.createElement('h1'));

  var checkboxes = Array.prototype.slice.call(checkboxes);

  recursiveSearch(response, 'fornavn', 'Navn');
  recursiveSearch(response, 'etternavn', 'Etternavn');
  for (i=0; i < checkboxes.length; i++){
    if(checkboxes[i].checked){
      let id = checkboxes[i].id;
      let name = checkboxes[i].name;
      recursiveSearch(response, id, name);
    }
  }

function recursiveSearch(response, id, name){
  Object.keys(response).forEach(search_term => {
    if (search_term.toString() === id){
      addInfo(name+': '+response[search_term], document.createElement('p'))
    }
    else if (response[search_term].length <= 1){ // 
      return;
    }
    else{
      let new_response = response[search_term];
      return recursiveSearch(new_response, id, name);
    }
    });
  }
}

function addInfo(info, an_element){
  const results_display = document.getElementById("results_display");
  an_element.innerText = info;
  results_display.appendChild(an_element);
}
      
function showCheckboxes(argument) {
  var person_checkbox = document.getElementById("person_checkbox");
  var organisasjon_checkbox = document.getElementById("organisasjon_checkbox");
  var roller_checkbox = document.getElementById('roller_checkbox');

  let checkbox_NAMES = [person_checkbox, organisasjon_checkbox, roller_checkbox];

  checkbox_NAMES.forEach(checkbox => {

    if (checkbox.id === argument){
      checkbox.classList.add('show');
      checkbox.classList.remove('hide');
      checkbox.style.visibility = 'visible';
    }
    else{
      checkbox.classList.add('hide');
      checkbox.classList.remove('show');
      checkbox.style.visibility = 'hidden'
    }
  });
}

function showResults(){
  var results_display = document.getElementById("results_display");

  var nytt_sok = document.getElementById('nytt_sok');

  results_display.style.display = ""
  nytt_sok.style.display = "";

  results_display.classList.add("show");
  results_display.classList.remove("hide");
  results_display.style.visibility = 'visible'

  nytt_sok.classList.add('show');
  nytt_sok.classList.remove('hide');
  nytt_sok.style.visibility = 'visible'
}

select("person");
showCheckboxes("person_checkbox");
