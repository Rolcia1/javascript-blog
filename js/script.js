'use strict';

function titleClickHandler(event){
    console.log('Link was clicked!');
  /* tu powinna być console.log, który wyświetli zawartość argumentu event ale u mnie się nic nie wyświetla :( */

  
/* usuń klasę „aktywną” ze wszystkich linków do artykułów - remove class 'active' from all article links */

/* dodaj klasę „aktywna” do klikniętego linku - add class 'active' to the clicked link */

/* usuń klasę „aktywna” ze wszystkich artykułów - remove class 'active' from all articles */

/* pobierz atrybut „href” z klikniętego linku - get 'href' attribute from the clicked link */

/* znajdź poprawny artykuł za pomocą selektora (wartość atrybutu „href”) - find the correct article using the selector (value of 'href' attribute) */

/* dodaj klasę „active” do poprawnego artykułu - add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}