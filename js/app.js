'use strict';
let names = [ 'bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg' ];
let tries = 25, LeftIndex = 0, RightIndex = 0, MiddleIndex = 0, clickcounter = 0, previousImages = [30,30,30];
const sectionId = document.getElementById ( 'section' );
const leftImage = document.getElementById ( 'left-image' );
const rightImage = document.getElementById ( 'right-image' );
const middleImage = document.getElementById ( 'middle-image' );

function Images ( name ) {
  this.name = String ( name.split ( '.', 1 ) );
  this.image = `./images/${name}`;
  this.clicks = 0;
  this.shown = 0;
  Images.all.push( this );
}
Images.all = [];

for( let i = 0; i < names.length; i++ )
{
  new Images ( names[i] );
}


function assignImage () {
  let leftIndex = randomNumber( 0,Images.all.length - 1 );
  while ( leftIndex === previousImages[0] || leftIndex === previousImages[1] || leftIndex === previousImages[2] )
  {
    leftIndex = randomNumber( 0,Images.all.length - 1 );
  }
  leftImage.src = Images.all[leftIndex].image;
  leftImage.alt = Images.all[leftIndex].name;
  Images.all[leftIndex].shown++;

  let rightIndex = randomNumber( 0, Images.all.length - 1 );
  while ( rightIndex === leftIndex || rightIndex === previousImages[0] || rightIndex === previousImages[1] || rightIndex === previousImages[2] )
  {
    rightIndex = randomNumber( 0, Images.all.length - 1 );
  }
  rightImage.src = Images.all[rightIndex].image;
  rightImage.alt = Images.all[rightIndex].name;
  Images.all[rightIndex].shown++;

  let middleIndex = randomNumber( 0, Images.all.length - 1 );
  while( rightIndex === middleIndex || leftIndex === middleIndex || middleIndex === previousImages[0] || middleIndex === previousImages[1] || middleIndex === previousImages[2] ){
    middleIndex = randomNumber( 0, Images.all.length - 1 );
  }
  middleImage.src = Images.all[middleIndex].image;
  middleImage.alt = Images.all[middleIndex].name;
  Images.all[middleIndex].shown++;
  LeftIndex = leftIndex;
  RightIndex = rightIndex;
  MiddleIndex = middleIndex;
  previousImages[0] = leftIndex;
  previousImages[1] = rightIndex;
  previousImages[2] = middleIndex;
}


function clicker ( event ) {
  const clicked = event.target;
  if( clickcounter < tries ){
    if ( clicked.id === 'left-image' || clicked.id === 'right-image' || clicked.id === 'middle-image' ){
      if( clicked.id === 'left-image' ){
        Images.all[LeftIndex].clicks++;
      }
      if( clicked.id === 'right-image' ){
        Images.all[RightIndex].clicks++;
      }
      if( clicked.id === 'middle-image' ) {
        Images.all[MiddleIndex].clicks++;
      }
      clickcounter++;
      assignImage();
    }
  }
  else{
    document.getElementById ( 'hide' ) .style.visibility = 'visible';

  }

}

sectionId.addEventListener( 'click', clicker );
assignImage();

const clickedBotton = document.getElementById( 'hide' );
clickedBotton.addEventListener ( 'click', function (){



  const show = document.getElementById( 'summary' );
  for ( let j = 0 ; j < Images.all.length ; j++ )
  {
    const pElement = document.createElement( 'p' );
    show.appendChild( pElement );
    pElement.textContent = `the ${names[j]} image was shown ${Images.all[j].shown} times, and it was clicked ${Images.all[j].clicks} times`;
  }
  renderChart();
}



);

function renderChart() {

  let nameArray = [];
  let clicksArray = [];
  let shownArray = [];

  for ( let i = 0; i < Images.all.length; i++ ) {
    nameArray.push ( Images.all[i].name );
    clicksArray.push ( Images.all[i].clicks );
    shownArray.push ( Images.all[i].shown );
  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  new Chart( ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: '# shown',
          data: shownArray,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3
        },
        {
          label: '# of clicks',
          data: clicksArray,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(0, 255, 255, 1)',
          borderWidth: 3
        }
      ]
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
  } );
}










function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
