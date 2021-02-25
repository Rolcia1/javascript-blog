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
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = "5",
  optCloudClassPrefix = "tag-size-";

function generateTitleLinks(customSelector = ''){
    

  /* usuń zawartość titleList- remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* dla każdego artykułu - for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function calculateTagsParams(tags){
  const params = {
    max : 0,
    min : 999999,
  }; 

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }

    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(){

}

function generateTags(){
  
  /* [NEW] create a new variable allTags with an empty object*/
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    console.log(article);

    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags'),

    /* split tags into array */
      articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a>, </li>';

      /* add generated code to html variable */
      html += linkHTML;

      /* Sprawdzamy, czy dokładnie taki link mamy już w tablicy allTags - [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)){
        /* Jeśli go nie mamy, dodajemy go do tej tablicy - [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;


  /* END LOOP: for every article: */
  }
  /* Na końcu funkcji znajdujemy listę tagów - [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)

  /* [NEW] create variablefor all links HTML ci=ode */
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and it to allTagsHTML */
    allTagsHTML += tagLinkHTML;

    const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
    console.log('taglinkHTML:', tagLinkHTML);


    /*[NEW] END LOOP: for each tag allTags: */
  }

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
  
}

generateTags();


function tagClickHandler(event){
  /* zapobiegaj domyślnej akcji dla tego zdarzenia - prevent default action for this event */ 
  event.preventDefault();
  /* stwórz nową stałą o nazwie „clickedElement” i nadaj jej wartość „this” - make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* stwórz nową stałą „href” i przeczytaj atrybut „href” klikniętego elementu - make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* stwórz nowy stały „tag” i wyodrębnij tag ze stałej „href” -  make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* znajdź wszystkie linki do tagów z aktywną klasą  - find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');


  /* START LOOP: dla każdego aktywnego linku do tagu -START LOOP: for each active tag link */
  for(let activeLink of activeLinks){
    /* usuń klasę aktywną  - remove class active */
    activeLink.classList.remove('active');
  /*  END LOOP: dla każdego aktywnego linku do tagu - END LOOP: for each active tag link */
  }
  /* znajdź wszystkie linki do tagów z atrybutem „href” równym stałej „href”  - find all tag links with "href" attribute equal to the "href" constant */
  const equalLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');
  /* START LOOP: dla każdego znalezionego linku do tagu  - START LOOP: for each found tag link */
  for(let link of equalLinks){
    /* dodaj klasę aktywną - add class active */
    link.classList.add('active');
    /* END LOOP: dla każdego znalezionego linku do tagu - END LOOP: for each found tag link */
  }
  /* wykonaj funkcję „generationTitleLinks” z selektorem artykułu jako argumentem - execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  
}

function addClickListenersToTags(){
  /* znajdź wszystkie linki do tagów - find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
/* START LOOP: dla każdego linku  - START LOOP: for each link */
  for(let link of tagLinks){
    /* dodaj tagClickHandler jako detektor zdarzeń dla tego linku - add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: dla każdego linku - END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    console.log(article);

    /* find author wrapper */
    const authorList = article.querySelector(optArticleAuthorSelector);

    /* get author from 'post-author' attribute */
    const articleAuthors = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';;


    
    /* insert HTML of all the links into the author wrapper */
    authorList.innerHTML = linkHTML;
  }
}

generateAuthors();

function authorClickHandler(event){
  /* zapobiegaj domyślnej akcji dla tego zdarzenia - prevent default action for this event */ 
  event.preventDefault();
  /* stwórz nową stałą o nazwie „clickedElement” i nadaj jej wartość „” - make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* stwórz nową stałą „author” i przeczytaj atrybut „post-author” klikniętego elementu - make a new constant "author" and read the attribute "author" of the clicked element */
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
    /* znajdź wszystkie linki do "autorów"" z aktywną klasą  - find all "author" links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');


  /* START LOOP: dla każdego aktywnego linku do autora -START LOOP: for each active author link */
  for(let activeLink of activeLinks){
    /* usuń klasę aktywną  - remove class active */
    activeLink.classList.remove('active');
  /*  END LOOP: dla każdego aktywnego linku do tagu - END LOOP: for each active tag link */
  }
  /* znajdź wszystkie linki do tagów z atrybutem „data-author” równym stałej „author”  - find all tag links with "href" attribute equal to the "href" constant */
  const equalLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: dla każdego znalezionego linku do autora  - START LOOP: for each found author link */
  for(let link of equalLinks){
    /* dodaj klasę aktywną - add class active */
    link.classList.add('active');
    /* END LOOP: dla każdego znalezionego linku do tagu - END LOOP: for each found tag link */
  }
  /* wykonaj funkcję „generationTitleLinks” z selektorem artykułu jako argumentem - execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author+ '"]');
}


function addClickListenersToAuthors(){
/* znajdź wszystkie linki do autorów- find all links to authors */
const authorLinks = document.querySelectorAll('a[href^="#author-"]');
/* START LOOP: dla każdego linku  - START LOOP: for each link */
  for(let link of authorLinks){
    /* dodaj tagClickHandler jako detektor zdarzeń dla tego linku - add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: dla każdego linku - END LOOP: for each link */
  }

}

addClickListenersToAuthors();

