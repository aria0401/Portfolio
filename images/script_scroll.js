"use strict";
window.addEventListener("load", start);

let client1;
let last_known_scroll_position = 0;
let ticking = false;
const section1 = document.querySelector(".section_1");
function start(){
    window.removeEventListener("load", start);
   client1 = section1.getBoundingClientRect().y;
   return client1;
}

// window.addEventListener("scroll", function(e) {
//     myFunction(e);
// });

// function myFunction(event) {
//     if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
//        section1.classList.add("fade_in");
 
//     } 
//     else{
//         section1.classList.remove("fade_in");
//     }
// }