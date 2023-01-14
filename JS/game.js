const moves = document.getElementById("moves-count");
let timevalues = document.getElementById("time");
const startButton= document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game__container");
let result = document.getElementById("result");
const controls = document.querySelector(".control__container")

let cards;
let interval;
let firstCard =false;
let secondCard = false;
let firstCardValue;

const items =[
    {name:"bulbasaur",image: "/Assets/Bulbasaur.svg"},
    {name:"pikachu",image: "/Assets/Pikachu.svg"},
    {name:"squirtle",image:"/Assets/Squirtle.svg"},
    {name:"Caterpie",image:"/Assets/Caterpie.svg"},
    {name:"Charmander",image:"/Assets/Charmander.svg"},
    {name:"Dratini",image:"/Assets/Dratini.svg"},
    {name:"Eevee",image:"/Assets/Eevee.svg"},
    {name:"Jigglypuff",image:"/Assets/Jigglypuff.svg"},
    {name:"Bell",image:"/Assets/Bell.svg"},
    {name:"pokeball",image:"/Assets/pokeball.svg"},
    {name:"Snorlax",image:"/Assets/Snorlax.svg"},
    {name:"Psyduck",image:"/Assets/Psyduck.svg"},
    {name:"superball",image:"/Assets/superball.svg"},
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
     let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
     let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
     timevalues.innerHTML = `<span>Time: </span>${minutesValue} : ${secondsValue}`;
}



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

const matrixGenerator = (cardValues, size=4) =>{
    gameContainer.innerHTML ="";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(()=>Math.random() - 0.5);
    for(let i =0; i< size * size; i++){
        gameContainer.innerHTML += `
          <div class ="card-container" data-card-value="${cardValues[i].name}">
            <div class = "card-before">?</div>
            <div class ="card-after">
              <img src ="${cardValues[i].image}" class ="image">
            </div>
          </div>  
        
        `;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

     cards = document.querySelectorAll(".card-container");
     cards.forEach((card) => {
        card.addEventListener("click", ()=>{
            //if selected card is not matched yet then only run 
            //(i.e already matched card when clicked  would be ignored)
            if(!card.classList.contains("matched")){
                card.classList.add("flipped")
                 
                //if  it is the firstcard(!fisrtcard since  firstcard is initially false)
                if(!firstCard){
                    //so current card will become  firstcard
                    firstCard = card;

                    //current  card value become firstcardvalue

                   firstCardValue = card.getAttribute("data-card-value");
                }
                else{
                    //increment moves since user selected second
                    movesCounter();
                    //second card and value
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");

                    if(firstCardValue == secondCardValue){
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");

                        firstCard = false;

                        winCunt +=1;

                        if(winCunt == Math.floor(cardValues.length / 2)){
                            result.innerHTML=`<h2>You Wins</h2>
                            <h4>Moves: ${movesCount}</h4>                         
                            `;
                            stopGame();
                        }

                    }else{
                        //if the cards  dont match
                        //fliip the cards back to normal
                        let [tempFirst , tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;

                        let delay = setTimeout(()=>{
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");

                        }, 900);
                        
                    }
                }
            }
        });
        
    });
};

const initializer = () =>{
    result.innerText = "";
    winCunt= 0;
    let cardValues = generateRadom();
    matrixGenerator(cardValues);
};

//start game
startButton.addEventListener("click",()=>{
    movesCount = 0;
    result = 0;

    controls.classList.add("hide");
    stopButton.classList.add("hide");
    startButton.classList.add("hide");

    interval = setInterval(timeGenerator,1000);
    //initicial moves
    moves.innerHTML =`
    <span>Moves: ${movesCount} </span>`;
    initializer();
});

//stop Game
stopButton.addEventListener("click",(stopGame =()=>{

    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");

    clearInterval(interval);
})
);

  

