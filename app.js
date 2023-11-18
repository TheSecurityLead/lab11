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

function showResults() {
  
  document.getElementById('results').hidden = false;

  renderChart();
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

function renderChart() {
  const context = document.getElementById('results-chart').getContext('2d');
  const names = Product.allProducts.map(product => product.name);
  const votes = Product.allProducts.map(product => product.timesClicked);
  const views = Product.allProducts.map(product => product.timesShown);

  new Chart(context, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Votes',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: votes
      },
      {
        label: 'Views',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: views
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function initializeProducts() {
  new Product('R2D2 Bag', 'bag.jpg');
  new Product('Banana Slicer', 'banana.jpg');
  new Product('Bathroom Stand', 'bathroom.jpg');
  new Product('Yellow Boots', 'boots.jpg');
  new Product('Breakfast Maker', 'breakfast.jpg');
  new Product('Meatball Bubblegum', 'bubblegum.jpg');
  new Product('Red Chair', 'chair.jpg');
  new Product('Cthulhu Figure', 'cthulhu.jpg');
  new Product('Dog Duck', 'dog-duck.jpg');
  new Product('Dragon Meat', 'dragon.jpg');
  new Product('Pen Cap Utensils', 'pen.jpg');
  new Product('Pet Sweep', 'pet-sweep.jpg');
  new Product('Pizza Scissors', 'scissors.jpg');
  new Product('Shark Sleeping Bag', 'shark.jpg');
  new Product('Baby Sweeper', 'sweep.png');
  new Product('Unicorn Meat', 'unicorn.jpg');
  new Product('Wine Glass', 'wine-glass.jpg');

  Product.allProducts.push(
    new Product('R2D2 Bag', 'bag.jpg'),
    new Product('Banana Slicer', 'banana.jpg'),
    new Product('Bathroom Stand', 'bathroom.jpg'),
    new Product('Yellow Boots', 'boots.jpg'),
    new Product('Breakfast Maker', 'breakfast.jpg'),
    new Product('Meatball Bubblegum', 'bubblegum.jpg'),
    new Product('Red Chair', 'chair.jpg'),
    new Product('Cthulhu Figure', 'cthulhu.jpg'),
    new Product('Dog Duck', 'dog-duck.jpg'),
    new Product('Dragon Meat', 'dragon.jpg'),
    new Product('Pen Cap Utensils', 'pen.jpg'),
    new Product('Pet Sweep', 'pet-sweep.jpg'),
    new Product('Pizza Scissors', 'scissors.jpg'),
    new Product('Shark Sleeping Bag', 'shark.jpg'),
    new Product('Baby Sweeper', 'sweep.png'),
    new Product('Unicorn Meat', 'unicorn.jpg'),
    new Product('Wine Glass', 'wine-glass.jpg')
  );
  
  renderProducts();
}


let productSection = document.getElementById('product-container');
productSection.addEventListener('click', handleClick);


initializeProducts();
