const moves = document.getElementById("moves-count");
const timevalues = document.getElementById("time");
const startButton= document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game__container");
const result = document.getElementById("result");
const controls = document.querySelector(".control__container")

let cards;
let interval;
let firstCard =false;
let secondCard = false;

const items =[
    {name:"bulbasaur",image: "Bulbasaur.svg"},
    {name:"pikachu",image: "pikachu.svg"},
    {name:"squirtle",image:"Squirtle.svg"},
    {name:"Cartepie",image:"Cartepie.svg"},
    {name:"Charmander",image:"Charmander.svg"},
    {name:"dratini",image:"dratini.svg"},
    {name:"evee",image:"Eevee.svg"},
    {name:"Jigglypuff",image:"Jigglypuff.svg"},
    {name:"salamence",image:"salamence.jpeg"},
    {name:"Sceptile",image:"Sceptile.jpeg"},
    {name:"Gengar",image:"Gengar.jpeg"},
    {name:"Feraligator",image:"Feraligator.jpeg"},
];

let seconds =0,
minutes =0;

let movesCount =0,
winCunt =0;

const timeGenerator = ()=>{
    seconds +=1;

    if(seconds >=60){
        minutes +=1;
        seconds =0;
    }
}

let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
timevalues.innerHTML = `<span>Time</span>${minutesValue} :${secondsValue}`;

const movesCounter = ()=>{
    movesCount +=1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
}

const generateRadom = (size=4)=>{
    //Temporary Array
    let tempArray = [...items];
    //initializes cardvalues array
    let cardValues= [];

    size = (size * size)/2;

    for(let i =0; i < size; i++){
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        //once selected remove the objet from temp array
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator =(cardValues, size=4)=>{
    gameContainer.innerHTML ="";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(()=>Math.random()- 0.5);
}
