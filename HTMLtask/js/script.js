// modal
const modal = document.querySelector(".modal__wrapper");
const body = document.querySelector("body");

function toggleModal(e) {
    modal.classList.toggle("shown");
    
    modal.setAttribute('style', `top: ${window.scrollY}px`)
    if (modal.classList.contains("shown")) {
        // Disable scroll
        body.style.overflow = "hidden";
    } else {
        // Enable scroll
        body.style.overflow = "auto";
    }
};


// mask
function applyDataMask(field) {
    let mask = field.dataset.mask.split('');
    
    function stripMask(maskedData) {
        function isDigit(char) {
            return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
    }
    
    function applyMask(data) {
        return mask.map(function(char) {
            if (char != '_') return char;
            if (data.length == 0) return char;
            return data.shift();
        }).join('')
    }
    
    function reapplyMask(data) {
        return applyMask(stripMask(data));
    }
    
    function changed() {   
        let oldStart = field.selectionStart;
        let oldEnd = field.selectionEnd;
        
        field.value = reapplyMask(field.value);
        
        field.selectionStart = oldStart;
        field.selectionEnd = oldEnd;
    }
    
    field.addEventListener('click', changed)
    field.addEventListener('keyup', changed)
}
Array.prototype.forEach.call(document.body.querySelectorAll("*[data-mask]"), applyDataMask);


// dropdowns
const dropdowns = document.querySelectorAll('[data-dropdown]');

if(dropdowns.length > 0) {
  dropdowns.forEach(dropdown => {
    createCustomDropdown(dropdown);
  });
}

function createCustomDropdown(dropdown) {
  const options = dropdown.querySelectorAll('option');
  const optionsArr = Array.prototype.slice.call(options);
  const customDropdown = document.createElement('div');
  customDropdown.classList.add('dropdown');
  dropdown.insertAdjacentElement('afterend', customDropdown);

  const selected = document.createElement('div');
  selected.classList.add('dropdown__selected');
  const placeholder = document.createElement('div');
  placeholder.textContent = 'Please select a car';
  placeholder.id = 'placeholder';
  selected.appendChild(placeholder);
  customDropdown.appendChild(selected);

  const menu = document.createElement('div');
  menu.classList.add('dropdown__menu');
  customDropdown.appendChild(menu);
  selected.addEventListener('click', toggleDropdown.bind(menu));

  dropdown.hasFilter = dropdown.dataset.hasOwnProperty('filter');
  dropdown.isMultipleSelect = dropdown.dataset.hasOwnProperty('multiple');

  if (dropdown.hasFilter) {
    const search = document.createElement('input');
    search.placeholder = 'Search...';
    search.type = 'text';
    search.classList.add('dropdown__menu_search');
    menu.appendChild(search);
    search.addEventListener('input', filterItems.bind(search, optionsArr, menu));
  }

  const menuItemsWrapper = document.createElement('div');
  menuItemsWrapper.classList.add('dropdown__menu_items');
  menu.appendChild(menuItemsWrapper);

  let itemId = 0;
  optionsArr.forEach(option => {
    const item = document.createElement('div');
    const svg = document.createElement('img');
    const logo = document.createElement('div');
    item.classList.add('dropdown__menu_item');
    item.id = itemId;
    itemId++;
    logo.classList.add('dropdown__menu_item__logo')
    item.dataset.value = option.value;
    item.dataset.value ? svg.src = "logos/" + item.dataset.value.toLowerCase() + ".svg" : '';
    item.textContent = option.textContent;
    menuItemsWrapper.appendChild(item);
    
    logo.append(svg);
    item.prepend(logo);
    if (dropdown.isMultipleSelect) {
      item.addEventListener('click', setMultipleSelected.bind(item, selected, dropdown, menu));
    } else {
      item.addEventListener('click', setSelected.bind(item, selected, dropdown, menu));
    }
  });

  document.addEventListener('click', closeIfClickedOutside.bind(customDropdown, menu));
  dropdown.style.display = 'none';
}

function toggleDropdown() {
  // Check if dropdown is opened and if it is close it, otherwise open it and focus search input
  if (this.offsetParent !== null) {
    this.style.display = 'none';
  } else {
    this.style.display = 'block';
  }
}

function setSelected(selected, dropdown, menu) {
  const value = this.dataset.value;
  const label = this.textContent;

  selected.textContent = label;
  dropdown.value = value;

  menu.style.display = 'none';
  if (dropdown.hasFilter) {
    menu.querySelector('input').value = '';
  }

  menu.querySelectorAll('.dropdown__menu_item').forEach(div => {
    if(div.classList.contains('selected')) {
      div.classList.remove('selected');
    }
    if(div.offsetParent === null) {
      div.style.display = 'flex';
    }
  });
  this.classList.add('selected');
}

function setMultipleSelected(selected, dropdown, menu) {
    if (dropdown.hasFilter) {
      menu.querySelector('input').value = '';
    }

    if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        const copy = document.getElementById("s" + this.id);
        selected.removeChild(copy);
    } else {
      const copy = this.cloneNode(true);
      copy.id = "s" + this.id;
      selected.appendChild(copy);
      this.classList.add('selected');
    }
  };

function filterItems(itemsArr, menu) {
  const customOptions = menu.querySelectorAll('.dropdown__menu_item');
  const value = this.value.toLowerCase();
  const filteredItems = itemsArr.filter(item => item.value.toLowerCase().includes(value));
  const indexesArr = filteredItems.map(item => itemsArr.indexOf(item));

  itemsArr.forEach(option => {
    if (!indexesArr.includes(itemsArr.indexOf(option))) {
      customOptions[itemsArr.indexOf(option)].style.display = 'none';
    } else if (customOptions[itemsArr.indexOf(option)].offsetParent === null) {
      customOptions[itemsArr.indexOf(option)].style.display = 'flex';
    }
  });
}

function closeIfClickedOutside(menu, e) {
  if(e.target.closest('.dropdown') === null && e.target !== this && menu.offsetParent !== null) {
    menu.style.display = 'none';
  }
}

//new tree
let checks = document.querySelectorAll(".tree__check");

for(let i = 0; i < checks.length; i++) {
  checks[i].addEventListener( 'change', function() {
    if(this.checked) {
       showChildrenChecks(this);
    } else {
       hideChildrenChecks(this)
    }
  });
}

function showChildrenChecks(elm) {
   var pN = elm.parentNode.parentNode;
   var childChecks = pN.children[1].children;
   
  for(var i = 0; i < childChecks.length; i++){
      if(hasClass(childChecks[i], 'tree__child')){
	      childChecks[i].classList.add("active");      
      }
  }
   
}

function hideChildrenChecks(elm) {
   var pN = elm.parentNode.parentNode;
   var childChecks = pN.children[1].children;
   
  for(var i = 0; i < childChecks.length; i++){
      if(hasClass(childChecks[i], 'tree__child')){
	      childChecks[i].classList.remove("active");      
      }
  }
   
}

function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}


// uploader
const fileInput = document.querySelector(".uploader__input"),  
    button = document.getElementById('file-upload-button'),
    uploadedFiles = document.querySelector(".uploader__list");
    
let uploadedFileId = 0;

button.addEventListener("keydown", function(event) {  
    if (event.code == 13 || event.code == 32) {  
        fileInput.focus();  
    }  
});
button.addEventListener("click", function(event) {
   fileInput.focus();
   return false;
});  
fileInput.addEventListener("change", function(event) {
  removePlaceholder();
  const file = document.createElement('div');
  file.classList.add('uploader__list__item')
  file.id = "file" + uploadedFileId;
  const imgwrapper = document.createElement('div');
  imgwrapper.classList.add('uploader__list__item__imagewrapper')
  const img = document.createElement('img');
  img.classList.add('uploader__list__item__image')
  img.id = "uploaded_img" + uploadedFileId;
  const name = document.createElement('div');
  name.classList.add('uploader__list__item__name')
  const size = document.createElement('div');
  size.classList.add('uploader__list__item__size')
  size.id = "uploaded_size" + uploadedFileId;

  readURL(this, img.id, size.id);
  let i,
  value = event.target.value;
  if (value.lastIndexOf('\\')) {
    i = value.lastIndexOf('\\') + 1
  } else {
    i = value.lastIndexOf('/') + 1
  }
  const fileName = value.slice(i);
  name.innerHTML = fileName;

  const closeButton = document.createElement('div')
  closeButton.classList.add('button','button_red')
  closeButton.innerHTML ='<i class="fa fa-times"></i>';
  closeButton.id = "closeButton" + uploadedFileId;
  closeButton.onclick = function () {
    const id = this.id.split('closeButton')[1];
    const file = document.getElementById('file' + id);
    const list = document.querySelector('.uploader__list');
    file.parentNode.removeChild(file);
    if (list.childElementCount === 0) {
      addPlaceholder();
    }
  }
  imgwrapper.appendChild(img);
  file.appendChild(imgwrapper);
  file.appendChild(name);
  file.appendChild(size);
  file.appendChild(closeButton)
  uploadedFileId++;

  uploadedFiles.appendChild(file);
});  


function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function removePlaceholder() {
  const placeholder = document.getElementById('file-placeholder');
  if (placeholder) {
    placeholder.parentNode.removeChild(placeholder);
  }
}

function addPlaceholder() {
  const list = document.querySelector('.uploader__list');
  list.innerHTML = '<div class="uploader__list__item" id="file-placeholder">No uploaded files</div>'
}

function readURL(input, imgId, sizeId) {
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      document.getElementById(imgId).setAttribute('src', e.target.result);
      document.getElementById(sizeId).innerHTML = formatBytes(e.total);
    }
    reader.readAsDataURL(input.files[0])
  }
}

function dropFiles() {
  const files = document.getElementsByClassName('uploader__list__item');
  while (files[0]) {
    files[0].parentNode.removeChild(files[0]);
  }
  addPlaceholder();
}
