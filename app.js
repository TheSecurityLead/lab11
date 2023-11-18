'use strict';


function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.timesClicked = 0;
}


Product.allProducts = [];
Product.totalClicks = 0;
Product.rounds = 25;


function getRandomProduct() {
  return Math.floor(Math.random() * Product.allProducts.length);
}


function renderProducts() {
  let displayedIndices = [];
  let index;
  let productSection = document.getElementById('product-container');


  productSection.innerHTML = '';

  while (displayedIndices.length < 3) {
    index = getRandomProduct();
    if (!displayedIndices.includes(index)) {
      displayedIndices.push(index);
      Product.allProducts[index].timesShown++;
      let productImg = document.createElement('img');
      productImg.src = Product.allProducts[index].filePath;
      productImg.alt = Product.allProducts[index].name;
      productImg.title = Product.allProducts[index].name;
      productImg.dataset.index = index;
      productSection.appendChild(productImg);
    }
  }
}


function handleClick(event) {
  if (event.target.tagName === 'IMG') {
    Product.totalClicks++;
    let index = event.target.dataset.index;
    Product.allProducts[index].timesClicked++;

    if (Product.totalClicks === Product.rounds) {
      productSection.removeEventListener('click', handleClick);
      showResults();
    } else {
      renderProducts();
    }
  }
}


function showResults() {
  let resultsList = document.getElementById('results');
  resultsList.innerHTML = '';
  resultsList.style.display = 'block';
  
  let ul = document.createElement('ul');
  for (let product of Product.allProducts) {
    let li = document.createElement('li');
    li.textContent = `${product.name} had ${product.timesClicked} votes, and was seen ${product.timesShown} times.`;
    ul.appendChild(li);
  }
  resultsList.appendChild(ul);
}


function initializeProducts() {
  new Product('R2D2 Bag', 'img/bag.jpg');
  new Product('Banana Slicer', 'img/banana.jpg');
  new Product('Bathroom Stand', 'img/bathroom.jpg');
  new Product('Yellow Boots', 'img/boots.jpg');
  new Product('Breakfast Maker', 'img/breakfast.jpg');
  new Product('Meatball Bubblegum', 'img/bubblegum.jpg');
  new Product('Red Chair', 'img/chair.jpg');
  new Product('Cthulhu Figure', 'img/cthulhu.jpg');
  new Product('Dog Duck', 'img/dog-duck.jpg');
  new Product('Dragon Meat', 'img/dragon.jpg');
  new Product('Pen Cap Utensils', 'img/pen.jpg');
  new Product('Pet Sweep', 'img/pet-sweep.jpg');
  new Product('Pizza Scissors', 'img/scissors.jpg');
  new Product('Shark Sleeping Bag', 'img/shark.jpg');
  new Product('Baby Sweeper', 'img/sweep.png');
  new Product('Unicorn Meat', 'img/unicorn.jpg');
  new Product('Wine Glass', 'img/wine-glass.jpg');

  Product.allProducts.push(
    new Product('R2D2 Bag', 'img/bag.jpg'),
    new Product('Banana Slicer', 'img/banana.jpg'),
    new Product('Bathroom Stand', 'img/bathroom.jpg'),
    new Product('Yellow Boots', 'img/boots.jpg'),
    new Product('Breakfast Maker', 'img/breakfast.jpg'),
    new Product('Meatball Bubblegum', 'img/bubblegum.jpg'),
    new Product('Red Chair', 'img/chair.jpg'),
    new Product('Cthulhu Figure', 'img/cthulhu.jpg'),
    new Product('Dog Duck', 'img/dog-duck.jpg'),
    new Product('Dragon Meat', 'img/dragon.jpg'),
    new Product('Pen Cap Utensils', 'img/pen.jpg'),
    new Product('Pet Sweep', 'img/pet-sweep.jpg'),
    new Product('Pizza Scissors', 'img/scissors.jpg'),
    new Product('Shark Sleeping Bag', 'img/shark.jpg'),
    new Product('Baby Sweeper', 'img/sweep.png'),
    new Product('Unicorn Meat', 'img/unicorn.jpg'),
    new Product('Wine Glass', 'img/wine-glass.jpg')
  );
  
  renderProducts();
}


let productSection = document.getElementById('product-container');
productSection.addEventListener('click', handleClick);


initializeProducts();
