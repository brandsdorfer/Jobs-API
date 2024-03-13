const allJobs = "https://remotive.com/api/remote-jobs?limit=50"
const allCategories = "https://remotive.com/api/remote-jobs/categories"
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const test = "https://remotive.com/api/remote-jobs?_id="
const container = document.querySelector(".container")
const spinner = document.querySelector(".loading")
const selector = document.querySelector("#category-nav")
const haed = document.querySelector("#head-page")
let butname;
let dataAll;
let stat;
let allCategoriesLst;

async function getAPI(url=allJobs, conntent="all jobs"){
    haed.innerText = `Loading...`;
    container.innerHTML = "";
    spinner.style.display = "flex"
    const response = await fetch(url);
    let data = await response.json();
    dataAll = data.jobs
    console.log(data)
    buildCards(dataAll, conntent);
    spinner.style.display = "none"
}

function buildCards(data, content) {
    haed.innerText = `Here is the all jobs of category : ${content}`;
    if (content === "Favorites") {
      stat = 1;
      haed.innerText = content
    }else{
      stat = 0
    }
    container.innerHTML = "";

    data.forEach((element, i) => {
        container.innerHTML += `
        <div class="card" style="width: 300px; display:inline-block">
  <img src="${element.company_logo}" class="card-img-top" alt="${element.company_name}">
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <div class="overflow-auto">${element.description}</div>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">the salary is: ${element.salary}</li>
    <li class="list-group-item">In category: ${element.category}</li>
    <li class="list-group-item">Job type is: ${element.job_type}</li>
  </ul>
  <div class="card-body" id="card-body">
    <a class="card-but" href=${element.url}>Go to this job</a>
    <button background-color=${check_element_id_color(element.id)} id="likejob${element.id}" class="card-but" onclick="ChangeFavoriet(${JSON.stringify(element).split('"').join("&quot;")}, ${i}, ${stat}), '${content}'">${check_element_id_text(element.id)}</button>
  </div>
</div>`
console.log("1")        
    });
}

function buildCategories(lst){
    lst.forEach((item) => {
        selector.innerHTML += `
        <option value="${item.slug}">${item.name}</option>`})
}
async function catagories(){
    const response = await fetch(allCategories);
    let data = await response.json();
    allCategoriesLst = data.jobs
    console.log(data)
    console.log(data.jobs)
    console.log(allCategoriesLst)
    buildCategories(allCategoriesLst)
}

function getAPICategory(){
    let selectorval = selector.value
    if(selectorval === "home"){
      build_home()
      return
    }
    console.log(selectorval)
   getAPI(`https://remotive.com/api/remote-jobs?category=${selectorval}&limit=10`, selectorval)
}

function AddToFavoriet(element){



  if(sts === false){}

}

function build_home(){
  haed.innerHTML = "welcome to our system of searching for remote jobs"
  container.innerHTML = `<div class="Home-page">
  <h4>Welcome to our system of searching for remote jobs 💙👨‍💻</h4>
  <p>Here you can find all the jobs that you can apply for</p>
  </div>`;
}

function ChangeFavoriet(element , ind, content){
  let t = dataAll
  if(content == "Favoriet"){
  t = favorites}

  if(check_element_id(element.id)){
    _remove_from_favorite(element, ind)
    buildCards(t, content)

  }else{
    _add_to_favorite(element)
    buildCards(t, content)
  }


}

function _add_to_favorite(element){
  console.log(element)
  favorites.push(element)
  localStorage.setItem("favorites", JSON.stringify(favorites))
  alert(`you added ${element.title} to favorites`)
}

function _remove_from_favorite(element, ind){
  console.log(element)
  favorites.splice(ind, 1)
  localStorage.setItem("favorites", JSON.stringify(favorites))
  alert(`you removed ${element.title} from favorites`)
  }

function check_element_id(id){
  for(let i = 0; i < favorites.length; i++){
    if(favorites[i].id == id){
      return true
    }
  }
  return false
}

function check_element_id_text(id){
  if(check_element_id(id)){
    return "Remove ❎"
  }else{
    return "Add to Favorite ❤"
  }
}

function check_element_id_color(id){
  if(check_element_id(id)){
    return "red"
  }else{
    return "green"
  }
}
build_home()
catagories()