// This is kind of awful, but in my defense it used to be a bookmarklet
if (window.location.search) {
// I used r because autocomplete wasn't working and I kept mistyping my variable names, this is not a good idea!
const r = document.querySelector('#request-form');
const div = document.createElement('div');
const queryString = window.location.search.replace("?s=",'')
  try {
    let submittedUrl = new URL(decodeURIComponent(queryString) + "?outputType=amp&message=fuckYourPaywall");
    console.log(submittedUrl);
		div.innerHTML = `<a href="${submittedUrl}">${submittedUrl}</a> <img src="https://silly-lily-2025ee.netlify.app/${queryString}" alt="Open Graph image for this URL">`;
  }
  catch (error) {
    div.innerHTML = `We choked on that one, sorry! <a href="https://github.com/manicExpressive/cygmalft/issues">Maybe submit an issue?</a>`;
  console.error(error);
  }
    r.parentNode.insertBefore( div, r );
}

