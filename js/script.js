'use strict';

 function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  /* tu powinna być console.log, który wyświetli zawartość argumentu event ale u mnie się nic nie wyświetla :( */

  
/* [DONE] usuń klasę „aktywną” ze wszystkich linków do artykułów - remove class 'active' from all article links */

const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

/* [DONE} dodaj klasę „aktywna” do klikniętego linku - add class 'active' to the clicked link */

clickedElement.classList.add('active');
console.log('clickedElement:', clickedElement);


/* [DONE] usuń klasę „aktywna” ze wszystkich artykułów - remove class 'active' from all articles */

const activeArticles = document.querySelectorAll('article');

for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}

/* pobierz atrybut „href” z klikniętego linku - get 'href' attribute from the clicked link */
const articleSelector = clickedElement.getAttribute('href')

/* znajdź poprawny artykuł za pomocą selektora (wartość atrybutu „href”) - find the correct article using the selector (value of 'href' attribute) */

const targetArticle = document.querySelector(articleSelector);

/* dodaj klasę „active” do poprawnego artykułu - add class 'active' to the correct article */

targetArticle.classList.add('active');

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}