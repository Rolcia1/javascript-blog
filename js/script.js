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



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){
    

  /* usuń zawartość titleList- remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* dla każdego artykułu - for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for(let article of articles){
    console.log(article);
  

    /* pobierz identyfikator artykułu - get the article id */
    const articleId = article.getAttribute('id');

    /* znajdź element z tytułem - find the title element; pobierz tytuł z elementu title - get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;    

    /* utwórz kod HTML linku - create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* wstaw link do listy linków - insert link into titleList */
    html += linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();



function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    console.log(article);

    /* find tags wrapper */
    const titleList = article.querySelector(optTitleListSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags'),

    /* split tags into array */
      articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag' + tag+ '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html += linkHTML;
    
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    const links = article.querySelectorAll('.post-tags .list');



  /* END LOOP: for every article: */
  }
  
  

}

generateTags();