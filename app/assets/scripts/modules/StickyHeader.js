import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import { takeWhile } from 'lodash';

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header");
        this.mainScreens = document.querySelectorAll(".main-screen");
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.eduLink = document.getElementById("education-and-skills-link");
        this.webLink = document.getElementById("website-design-link");
        this.gapLink = document.getElementById("the-gap-link");
        this.softwareLink = document.getElementById("software-engineer-link");
        this.events();
    }

    events() {
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200));
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 333));
        
        this.eduLink.addEventListener("click", this.eduHeaderClick);
        this.webLink.addEventListener("click", this.webHeaderClick);
        this.gapLink.addEventListener("click", this.gapHeaderClick);
        this.softwareLink.addEventListener("click", this.softwareHeaderClick);
    }

    eduHeaderClick(event) { 
        window.scrollBy(0, 150);
        console.log("edu header clicked");
    }
    webHeaderClick() { 
        console.log("web header clicked");
    }
    gapHeaderClick() { 
        console.log("gap header clicked");
    }
    softwareHeaderClick() { 
        console.log("soft header clicked");
    }    

    runOnScroll() {
        this.determineScrollDirection();
        if (window.scrollY > 60) {
            this.siteHeader.classList.add("site-header--dark");
        } else {
            this.siteHeader.classList.remove("site-header--dark");
        }
        this.mainScreens.forEach(el => this.calcSection(el))
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down';
        } else {
            this.scrollDirection = 'up';
        }
        this.previousScrollY = window.scrollY;
    }

    calcSection(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
            let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100;
            if (scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
                let matchingLink = el.getAttribute("data-matching-link");
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el=> el.classList.remove("is-current-link"));
                const currentLink = document.querySelector(matchingLink);
                if (currentLink) {
                    currentLink.classList.add("is-current-link");
                }
            }
        }
    }

}

export default StickyHeader;