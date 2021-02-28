'use strict';
let names = [ 'bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass' ];
let tries = 25, LeftIndex = 0, RightIndex = 0, MiddleIndex = 0, clickcounter = 0;
const sectionId = document.getElementById ( 'section' );
const leftImage = document.getElementById ( 'left-image' );
const rightImage = document.getElementById ( 'right-image' );
const middleImage = document.getElementById ( 'middle-image' );

function Images ( name ) {
  this.name = name ;
  this.image = `./images/${name}.jpg`;
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
  leftImage.src = Images.all[leftIndex].image;
  leftImage.alt = Images.all[leftIndex].name;
  Images.all[leftIndex].shown++;


  let rightIndex = randomNumber( 0, Images.all.length - 1 );
  while ( rightIndex === leftIndex )
  {
    rightIndex = randomNumber( 0, Images.all.length - 1 );
  }
  rightImage.src = Images.all[rightIndex].image;
  rightImage.alt = Images.all[rightIndex].name;
  Images.all[rightIndex].shown++;

  let middleIndex = randomNumber( 0, Images.all.length - 1 );
  while( rightIndex === middleIndex || leftIndex === middleIndex ){
    middleIndex = randomNumber( 0, Images.all.length - 1 );
  }
  middleImage.src = Images.all[middleIndex].image;
  middleImage.alt = Images.all[middleIndex].name;
  Images.all[middleIndex].shown++;
  LeftIndex = leftIndex;
  RightIndex = rightIndex;
  MiddleIndex = middleIndex;
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
}



);












function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
