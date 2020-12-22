
"use strict";
window.addEventListener("load", start);

// SCRIP FOR THE PROJECTS SECTION

function start(){
    getData();
    //animateText();
    showMenu();
}

async function getData(){
    const response = await fetch("carrousel.json");
    let jsonData = await response.json();
    showGrid(jsonData);
}


////// PROJECTS AND DETAILS POP-UP

function showGrid(jsonData){
    const projectsContainer = document.querySelector(".projects_container");
    projectsContainer.innerHTML = "";
    const template = document.querySelector("template");
    jsonData.forEach((element) => {
        const clone = template.cloneNode(true).content; 
        clone.querySelector(".splash").dataset.text = element.skills;

        clone.querySelector(".image").src = "fotos/"+ element.image;
        clone.querySelector(".image").alt = `Image of ${element.header} project`;
   
        clone.querySelector(".each_project").addEventListener("click",  ()=> showDetails(element));
        projectsContainer.appendChild(clone); 
    });
}

function showDetails(element){
    showAndHideDetails();
    showDetailsCarrousel(element);
    showText(element);
}

function showAndHideDetails(){
    let detailsPopUp = document.querySelector("#details_popup");
    detailsPopUp.classList.remove("hide");
    detailsPopUp.style.pointerEvents = "auto";
    document.querySelector("button").addEventListener("click", ()=>{
        detailsPopUp.style.pointerEvents = "none"; 
        detailsPopUp.classList.add("hide");
    })
}


function showText(element){

    document.querySelector(".project_header").textContent= element.header;
    document.querySelector(".semester").textContent= element.semester;
    document.querySelector(".project_text").textContent= element.text;
    
    document.querySelector(".link_website").href= element.website;
    document.querySelector(".icon_website").src = "images/web_white.svg";

    document.querySelector(".link_github").href= element.github;
    document.querySelector(".icon_github").src = "images/github_white.svg";

    document.querySelector(".link_youtube").href= element.youtube;
    document.querySelector(".icon_youtube").src = "images/youtube.svg";
  
    if(!element.website){
        document.querySelector(".icon_website").src = ""
    }
    if(!element.github){
        document.querySelector(".icon_github").src = "" 
    }
    if(!element.youtube){
        document.querySelector(".icon_youtube").src = "" 
    }
    scrollFunction();
  
}

let numberOfImages;
let currentImage = 0;

function showDetailsCarrousel(element){
    document.querySelector(".the_container").innerHTML ="";
    document.querySelector(".legend_img_container").innerHTML ="";
    numberOfImages = element.carrousel.length;

    element.carrousel.forEach((object, index) =>{

    const toContainer = document.querySelector(".carrousel_template").cloneNode(true).content;
    const toLegend = document.querySelector(".carrousel_template").cloneNode(true).content;

    toContainer.querySelector(".carrousel_imgs").src = "fotos/"+ object;
    toLegend.querySelector(".carrousel_imgs").src = "fotos/"+ object;
    toLegend.querySelector("section").dataset.myIndex = index;
    document.querySelector(".the_container").appendChild(toContainer);
    document.querySelector(".legend_img_container").appendChild(toLegend);
  
   })
//aqui
   document.querySelector(".legend_img_container section").classList.add("legend_border");

   document.querySelector(".the_container").addEventListener("scroll", scrollFunction);
   document.querySelectorAll(".legend_img_container section").forEach(each => {
       each.addEventListener("click", legendClicks);
       each.style.opacity=".4";
   })

   document.querySelectorAll(".button").forEach(each =>{
       each.addEventListener("click", scrollFoto);
   })
   
}

function scrollFunction(){
    document.querySelectorAll(".legend_img_container section").forEach(each => {
        //aqui
        each.classList.remove("legend_border");
        each.style.opacity=".4";
    })
    currentImage = Math.round(document.querySelector(".the_container").scrollLeft / document.querySelector(".carrousel_imgs").width);
    //aqui
    document.querySelector(`.legend_img_container section:nth-child(${currentImage+1})`).style.opacity= "1";
    document.querySelector(`.legend_img_container section:nth-child(${currentImage+1})`).classList.add("legend_border");

    setButtons();
}

function legendClicks(event){
    console.log("legendClicks", event.currentTarget);
    currentImage = event.currentTarget.dataset.myIndex;
    navigate();
}


function scrollFoto(){
    if(this.classList.contains("forward")){
        if (currentImage < numberOfImages - 1) {
            currentImage++;
            navigate();
        }
    }
    else{
        if (currentImage > 0) {
            currentImage--;
            navigate();
        }
    }
}


function navigate() {
    document.querySelector(".the_container").scrollTo(
        {
            left: currentImage * document.querySelector(".carrousel_imgs").width,
            behavior: "smooth"
        }
    )
    setButtons();
}

function setButtons() {
    const forward = document.querySelector(".forward");
    const backward = document.querySelector(".backward");

    if (currentImage < numberOfImages - 1) {
        forward.style.opacity = 1;
        forward.style.cursor = "pointer";
    } else {
        forward.style.opacity = 0.2;
        forward.style.cursor = "default";
    }

    if (currentImage > 0) {
        backward.style.opacity = 1;
        backward.style.cursor = "pointer";
    } else {
        backward.style.opacity = 0.2;
        backward.style.cursor = "default";
    }
}






function showMenu(){
    document.querySelector("#burgermenu").addEventListener("click", toggleMenu);
}

function toggleMenu() {
    document.querySelector("#menu").classList.toggle("hidden");
  
    let hiddenMenu = document.querySelector("#menu").classList.contains("hidden");
  
    if (hiddenMenu == true) {
      document.querySelector("#burgermenu").textContent = "☰";
    } else {
      document.querySelector("#burgermenu").textContent = "✗";
    }

    document.querySelectorAll("#menu li a").forEach(a=>{
        a.addEventListener("click", hideMenu);
    })
  }

  function hideMenu(){
    document.querySelector("#menu").classList.add("hidden"); 
  }
  




