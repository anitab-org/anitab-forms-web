document.onreadystatechange = function () {
  if (document.readyState !== 'complete') {
    document.querySelector('.login').style.visibility = 'hidden';
    document.querySelector('.preloader').style.display = 'block';
  } else {
    document.querySelector('.preloader').style.display = 'none';
    document.querySelector('.login').style.visibility = 'visible';
  }
};
