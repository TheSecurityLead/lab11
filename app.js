'use strict';

// Product Constructor
function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.timesClicked = 0;
}

// Array to hold all product instances and track last shown products
Product.allProducts = [];
Product.lastShown = [];
Product.totalClicks = 0;
Product.rounds = 25;

// Helper function to get a random product
function getRandomProduct() {
  let index = Math.floor(Math.random() * Product.allProducts.length);
  while (Product.lastShown.includes(index)) {
    index = Math.floor(Math.random() * Product.allProducts.length);
  }
  return index;
}

// Function to render three unique products
function renderProducts() {
  let displayedIndices = [];
  let index;
  let productSection = document.getElementById('product-container');

  // Clear the previous products
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
  Product.lastShown = displayedIndices;
}

// Function to handle click events
function handleClick(event) {
  if (event.target.tagName === 'IMG') {
    Product.totalClicks++;
    let index = event.target.dataset.index;
    Product.allProducts[index].timesClicked++;

    if (Product.totalClicks === Product.rounds) {
      productSection.removeEventListener('click', handleClick);
      showResults();
      saveProducts(); // Save the final results to local storage
    } else {
      renderProducts();
      saveProducts(); // Save after each vote
    }
  }
}

// Function to show results
function showResultsButton() {
  let button = document.createElement('button');
  button.textContent = 'View Results';
  button.addEventListener('click', displayResults);
  document.body.appendChild(button);
}

// Function to save the current state to local storage
function saveProducts() {
  localStorage.setItem('products', JSON.stringify(Product.allProducts));
}

// Function to load product data from local storage
function loadProducts() {
  const savedProducts = localStorage.getItem('products');
  if (savedProducts) {
    const parsedProducts = JSON.parse(savedProducts);
    Product.allProducts = parsedProducts.map(prod => {
      let newProduct = new Product(prod.name, prod.filePath);
      Object.assign(newProduct, prod);
      return newProduct;
    });
  } else {
    initializeProducts(); // Call this if there's nothing in local storage
  }
  renderProducts(); // Call renderProducts after loading or initializing products
}

// Event listener for product section clicks
let productSection = document.getElementById('product-container');
productSection.addEventListener('click', handleClick);

function initializeProducts() {

  Product.allProducts.push(new Product('R2D2 Bag', 'bag.jpg'));
  Product.allProducts.push(new Product('Banana Slicer', 'banana.jpg'));
  Product.allProducts.push(new Product('Bathroom Stand', 'bathroom.jpg'));
  Product.allProducts.push(new Product('Yellow Boots', 'boots.jpg'));
  Product.allProducts.push(new Product('Breakfast Maker', 'breakfast.jpg'));
  Product.allProducts.push(new Product('Meatball Bubblegum', 'bubblegum.jpg'));
  Product.allProducts.push(new Product('Red Chair', 'chair.jpg'));
  Product.allProducts.push(new Product('Cthulhu Figure', 'cthulhu.jpg'));
  Product.allProducts.push(new Product('Dog Duck', 'dog-duck.jpg'));
  Product.allProducts.push(new Product('Dragon Meat', 'dragon.jpg'));
  Product.allProducts.push(new Product('Pen Cap Utensils', 'pen.jpg'));
  Product.allProducts.push(new Product('Pet Sweep', 'pet-sweep.jpg'));
  Product.allProducts.push(new Product('Pizza Scissors', 'scissors.jpg'));
  Product.allProducts.push(new Product('Shark Sleeping Bag', 'shark.jpg'));
  Product.allProducts.push(new Product('Baby Sweeper', 'sweep.png'));
  Product.allProducts.push(new Product('Unicorn Meat', 'unicorn.jpg'));
  Product.allProducts.push(new Product('Wine Glass', 'wine-glass.jpg'));
}

document.addEventListener('DOMContentLoaded', loadProducts);
