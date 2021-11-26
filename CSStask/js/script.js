document.querySelector('a.nextDay').addEventListener("click", () => {
    document.querySelector('li.current').nextElementSibling.classList.add('current').previousElementSibling.classList.remove('current');
  });
    document.querySelector('a.prevDay').addEventListener("click", () => { 
    document.querySelector('li.current').previousElementSibling.classList.add('current').nextElementSibling.classList.remove('current');
  });
  document.querySelector('a.today').addEventListener("click", () => {
    document.querySelector('li.current').classList.remove('current');
    document.querySelector('li.today').classList.add('current');
  });
  document.querySelector('a.expand').addEventListener("click", () => {
    document.querySelector(this).parentElement.classList.toggle('open');
    document.querySelector(this).classList.toggle('open');
  });

// DIRTY Responsive pricing table JS

document.querySelector( "ul" ).on( "click", "li", function() {
    var pos = document.querySelector(this).index()+2;
    document.querySelector("tr").find('td:not(:eq(0))').hide();
    document.querySelector('td:nth-child('+pos+')').css('display','table-cell');
    document.querySelector("tr").find('th:not(:eq(0))').hide();
    document.querySelector('li').classList.remove('active');
    document.querySelector(this).classList.add('active');
  });
  
  // Initialize the media query
    var mediaQuery = window.matchMedia('(min-width: 769px)');
    
    // Add a listen event
    mediaQuery.addEventListener(doSomething);
    
    // Function to do something with the media query
    function doSomething(mediaQuery) {    
      if (mediaQuery.matches) {
        document.querySelector('.sep').attr('colspan',6);
      } else {
        document.querySelector('.sep').attr('colspan',2);
      }
    }
    
    // On load
    doSomething(mediaQuery);