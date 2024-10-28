document.addEventListener("DOMContentLoaded", function () {
    // Loader
    setTimeout(function () {
        document.querySelector("body").classList.add("loaded");
    }, 500);

    // Scroll to Top
    let calcScrollValue = () => {
        let scrollProg = document.getElementById("progress");
        let pos = document.documentElement.scrollTop;
        let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrollValue = Math.round((pos * 100) / calcHeight);
        scrollProg.style.display = pos > 100 ? "grid" : "none";
        scrollProg.style.background = `conic-gradient(#0063ba ${scrollValue}%, #d499de ${scrollValue}%)`;
    };
    document.getElementById("progress").addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    window.onscroll = calcScrollValue;
    window.onload = calcScrollValue;

    // Component Filter
    function filterComponents() {
        let filter = searchBarInput.value.toUpperCase().trim();
        let components = document.querySelectorAll('.container .box');
        let selectedComponents = 0;
        components.forEach(component => {
            let componentName = component.querySelector('h2').textContent;
            component.style.display = componentName.toUpperCase().includes(filter) ? "flex" : "none";
            selectedComponents += component.style.display === "flex" ? 1 : 0;
        });
        document.querySelector(".no-results").style.display = selectedComponents ? "none" : "flex";
    }
    const searchBarInput = document.querySelector("#searchBar input");
    searchBarInput.addEventListener("input", filterComponents);

    // Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        const micBtn = searchBar.querySelector("button");
        const micIcon = micBtn.firstElementChild;

        micBtn.addEventListener("click", () => {
            micIcon.classList.toggle("fa-microphone", !recognition.start());
            micIcon.classList.toggle("fa-microphone-slash", recognition.start());
        });
        
        recognition.addEventListener("result", event => {
            searchBarInput.value = event.results[event.resultIndex][0].transcript.trim();
            filterComponents();
        });
    }

    // Navbar Active Link Highlight
    const homeLink = document.querySelector('.nav-menu a[href="index.html"]');
    const componentsLink = document.querySelector('.nav-menu a[href="#components"]');
    const componentsSection = document.getElementById('components');
    
    componentsLink.addEventListener('click', event => {
        event.preventDefault();
        componentsSection.scrollIntoView({ behavior: 'smooth' });
        componentsLink.style.color = 'red';
        homeLink.style.color = '';
    });
    
    window.addEventListener('scroll', () => {
        const componentsSectionTop = componentsSection.offsetTop - 50;
        let currentScroll = window.pageYOffset;
        componentsLink.style.color = currentScroll >= componentsSectionTop ? 'red' : '';
        homeLink.style.color = currentScroll < componentsSectionTop ? 'red' : '';
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });
});
