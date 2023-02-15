/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
var hideNavBarTimeout;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    let parent = document.querySelector('#navbar__list');
    let fragment = document.createDocumentFragment();
    for(let i = 0; i < 4; i++){
        const li = document.createElement('li');
        const a = document.createElement('a');
        const targetSection = `#section${i + 1}`;

        a.classList.add('menu__link');
        a.innerText = `Section ${i + 1}`;
        a.setAttribute('href', targetSection);
        a.dataset.target = targetSection;

        li.appendChild(a);

        fragment.appendChild(li);
    }
    parent.appendChild(fragment);
    initScrollToSection(parent);
}


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
function initScrollToSection(nav){
    nav.addEventListener('click', function(e){
        if (e.target.nodeName == 'A') {
            e.preventDefault();
            const targetSection = document.querySelector(e.target.dataset.target);
            targetSection.scrollIntoView({behavior: "smooth"});
        }
    })
}

// Set sections as active
function initScrollActive(){
    window.addEventListener('scroll', windowScrollEvent);
}

function windowScrollEvent(){
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu__link');
    const windowScroll = window.scrollY;
    const offset = 50;
    for(let i in sections){
        const section = sections[i];
        if(section.offsetTop <= windowScroll + offset && windowScroll + offset <= section.offsetTop + section.offsetHeight){
            navLinks.forEach(nav => {
                nav.classList.remove('active');
            });
            navLinks[i].classList.add('active');
            sections.forEach(s => {
                s.classList.remove('active');
            })
            section.classList.add('active');
        }
    }
    showNavBar();
    initHideInactiveNav();
}

function initHideInactiveNav(){
    if(hideNavBarTimeout == null)
        hideNavBarTimeout = setTimeout(hideInactiveNavBar, 1000);
}

function showNavBar(){
    let parent = document.querySelector('#navbar__list');
    parent.classList.remove('hidden');
}

function hideInactiveNavBar(){
    let parent = document.querySelector('#navbar__list');
    parent.classList.add('hidden');
    hideNavBarTimeout = null;
}