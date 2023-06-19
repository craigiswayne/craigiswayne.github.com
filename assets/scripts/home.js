function bookmarkScroll(targetSelector){
  const targetEl = targetSelector === '/' ? document.body : document.querySelector(targetSelector);
  // Could not find the target, bounce
  if(targetEl === null){
    return;
  }

  window.scrollTo({
    top: targetEl.offsetTop,
    left: 0,
    behavior: 'smooth'
  });

  const targetURL = targetSelector === '/' ? document.location.origin
      : `${document.location.origin}/${targetSelector}`;

  window.history.pushState({}, null, targetURL );
  document.querySelector('.navbar-collapse').classList.remove('show');
  event.preventDefault();
}

function setupBookmarkScroll(){
  document.querySelectorAll('a[href^="#"], a[href="/"]').forEach( element => {
    element.onclick = () => bookmarkScroll(element.getAttribute('href'));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupBookmarkScroll();
});
