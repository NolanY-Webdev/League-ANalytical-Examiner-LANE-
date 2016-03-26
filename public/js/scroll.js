'use strict';
function testScroll(ev){
  if (window.pageYOffset > 400) {
    alert('User has scrolled at least 400 px!');
  }
}
window.onscroll = testScroll;