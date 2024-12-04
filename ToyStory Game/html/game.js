
// ----------------------------------------------Constants----------------------------------------------
// ------------------Arrays------------------
const places = [
    "Bahrain", "Norway", "Finland", "Poland", "Austria", "Estonia",
    "Germany", "Ireland", "Monaco", "Serbia", "Belgium", "Croatia",
    "Greece", "Hungary", "Iceland", "Morocco", "Nigeria", "Panama",
    "Portugal", "Romania", "Russia", "Slovak", "Sweden", "Thailand",
    "Tunisia", "Ukraine", "Albania", "Andorra", "Armenia", "Bahamas",
    "Barbuda", "Belarus", "Bermuda", "Bolivia", "Botswana", "Bulgaria",
    "Burundi", "Cameroon", "Canada", "Cyprus"
];
const machineNames = [
    "Drill", "Lathe", "Crane", "Mixer", "Grindr", "Press", "Forklt", "Engine",
    "Tracto", "Boiler", "Car", "Truck", "Pulley", "Pump", "Tiller", "Chisel",
    "Router", "Saw", "Miller", "Welder", "Hoist", "Shovel", "Roller", "Vacuum",
    "Burner", "Heater", "Cutter", "Stitch", "Weaver", "Crusher", "Loader",
    "Planer", "Grader", "Hopper", "Feeder", "Mixer2", "Trolley", "Harves",
    "Shears", "Grater", "Knifer", "Grille", "Oven", "Plater", "Shaper",
    "Binder", "Comptr", "Seeder", "Thresr", "Digger"
];
const disneyCharacters = [
    "Mickey", "Minnie", "Donald", "Daisy", "Goofy", "Pluto", "Simba", "Nala",
    "Belle", "Beast", "Ariel", "Jafar", "Genie", "Tiana", "Elsa", "Anna",
    "Olaf", "Moana", "Mulan", "Aurora", "Jasmine", "Tinker", "Woody", "Buzz",
    "Stitch", "Dumbo", "Bambi", "Kuzco", "Flynn", "Eeyore", "Piglet", "Tigger",
    "Ralph", "Vanell", "Remy", "Flound", "Baloo", "Baghe", "Koda", "Mushu",
    "Robin", "Hook", "Cruell", "Merida", "Hades", "Mowgli", "Scamp", "Tiana",
    "Bolt", "Olive"
];
const foodNames = [
    "Burger", "Pizza", "Fries", "Sushi", "Tacos", "Bagels", "Salmon", "Pasta",
    "Donuts", "Steak", "Bacon", "Toast", "Apple", "Banana", "Cheese", "Carrot",
    "Muffin", "Onions", "Potato", "Butter", "Shrimp", "Chips", "Pepper", "Lobsta",
    "Noodle", "Cereal", "Yogurt", "Pickle", "Coffee", "Walnut", "Tomato", "Grape",
    "Berries", "Prawns", "Avocad", "Choco", "Scones", "Cupcak", "Kebab", "Garlic",
    "Hotdog", "Cookie", "Almond", "Celery", "Spinac", "Turnip", "Pepita", "Lettuc",
    "Pineap", "Orange"
];

const randomCharacter = ["woody", "jessie", "buzz", "bo-peep"]

const randomWord = []

// ------------------QyerySelectors------------------

const revealButton = document.querySelector("#reveal-letter");
const markWrongButton = document.querySelector("#mark-three-wrong");
const saveMe = document.querySelector("#solve-word");
const waterElement = document.querySelector(".water");
const wordDiv = document.querySelector(".word");
const letters = document.querySelectorAll(".letter p");

const timerElement = document.querySelector("#timer");
const hintMsg = document.querySelector(".hint")
const bucket = document.querySelector('.bucket')
const msg = document.querySelector("#msg");
const winLoseMsg = document.querySelector("#win-lose-message");
const msgBtn = document.querySelector("#msgBtn")
const winCounter = document.querySelector("#wins-counter")

const maxGuesses = 7;

// ----------------------------------------------Variables----------------------------------------------
//Choosing random word from different category and choosing a character
let charac = randomCharacter[Math.floor(Math.random() * randomCharacter.length)]
let place = places[Math.floor(Math.random() * places.length)].toUpperCase();
let machine = machineNames[Math.floor(Math.random() * machineNames.length)].toUpperCase();
let disneyChar = disneyCharacters[Math.floor(Math.random() * disneyCharacters.length)].toUpperCase();
let food = foodNames[Math.floor(Math.random() * foodNames.length)].toUpperCase();

// Insert the random words into an array , so one word will be selected from the array
randomWord[0] = place;
randomWord[1] = machine;
randomWord[2] = disneyChar;
randomWord[3] = food;

// Select random word from randomWord array
let selectedWord = randomWord[Math.floor(Math.random() * randomWord.length)].toUpperCase();

// create an array to store the length of the selected word
let guessedWord = [];
for (let i = 0; i < selectedWord.length; i++) {
    guessedWord.push("");
}
// selected word = drill , guessed array = ["","","","",""]

let wrongGuesses = 0;
let wins = 0;
let timer = 30;
let timerInterval;



console.log(selectedWord)

// ----------------------------------------------Functions----------------------------------------------

// A function to Determine which character will be in the bucket
function characterInBucket() {
    if (charac === "woody") {
        bucket.style.background = "url('https://i.imgur.com/mJ8TGoD.png')";
        bucket.style.backgroundSize = "50%";  

    }
    else if (charac === "jessie") {
        bucket.style.background = "url('https://i.imgur.com/DmArbVN.png')";
        bucket.style.backgroundSize = "50%";  

    }
    else if (charac === "buzz") {
        bucket.style.background = "url('https://i.imgur.com/wE7o6wt.png')";
        bucket.style.backgroundSize = "80%";  

    }
    else if (charac === "bo-peep") {
        bucket.style.background = "url('https://i.imgur.com/9OuW1p2.png')";
        bucket.style.backgroundSize = "84%";  

    }
    bucket.style.backgroundRepeat = "no-repeat";
    bucket.style.backgroundPosition = "center";
}

// A function telling the user what is the type of the word
function hintFunc() {
    if (selectedWord === randomWord[0]) {
        hintMsg.textContent = `The Word is a Place`
    }
    else if (selectedWord === randomWord[1]) {
        hintMsg.textContent = `The Word is a Machine`
    }
    else if (selectedWord === randomWord[2]) {
        hintMsg.textContent = `The Word is a Disney Character`
    }
    else if (selectedWord === randomWord[3]) {
        hintMsg.textContent = `The Word is a Food or Dish`
    }
}
// E.G. selected word = place --> POLAND , first condition will be implemented

characterInBucket();
hintFunc();

// Initialize Word Display
function init() {
    wordDiv.innerHTML = "";
    for (let i = 0; i < selectedWord.length; i++) {
        const letterDiv = document.createElement("div");
        letterDiv.classList.add("word-letter");
        wordDiv.appendChild(letterDiv);
    }
}
//word of 5 letters --> _ _ _ _ _

function render() {
    wrongGuesses = 0;

    // Generate new random words and character
    place = places[Math.floor(Math.random() * places.length)].toUpperCase();
    machine = machineNames[Math.floor(Math.random() * machineNames.length)].toUpperCase();
    disneyChar = disneyCharacters[Math.floor(Math.random() * disneyCharacters.length)].toUpperCase();
    food = foodNames[Math.floor(Math.random() * foodNames.length)].toUpperCase();
    charac = randomCharacter[Math.floor(Math.random() * randomCharacter.length)]; 
    selectedWord = randomWord[Math.floor(Math.random() * randomWord.length)].toUpperCase();

    randomWord[0] = place;
    randomWord[1] = machine;
    randomWord[2] = disneyChar;
    randomWord[3] = food;

    guessedWord = [];
    for (let i = 0; i < selectedWord.length; i++) {
        guessedWord.push("");
    }

    // Reset word divs (will be empty and create divs based on word length)
    init();

    // Reset letter styles and clickability
    letters.forEach((letter) => {
        let parentOfLetter = letter.parentNode;
        parentOfLetter.style.pointerEvents = "auto"; 
        parentOfLetter.style.backgroundColor = "";   
        parentOfLetter.style.opacity = "1"; 
    });

    // Reset water level
    waterElement.style.height = "0%";

    characterInBucket();
    resetTimer();
    console.log(selectedWord)
}


// A function to update water 
function updateWater() {
    let waterHeight = (wrongGuesses / maxGuesses) * 100;
    waterElement.style.height = `${waterHeight}%`;
    if (wrongGuesses === maxGuesses) {
        loseMsg()
    }
}
/* E.G. wrong guesses = 4 and max guesses = 7
water height will be a percentage (0/7)*100 = 0%
water height will be a percentage (2/7)*100 = 31%*/

// Reset Timer
function resetTimer() {
    clearInterval(timerInterval);
    timer = 30;
    timerElement.textContent = timer;
    timerElement.style.backgroundColor = ""; // Reset background color
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 15) {
            timerElement.style.backgroundColor = "red";
        }
        // Restart timer after incrementing wrong guesses
        if (timer === 0) {
            wrongGuesses++;
            updateWater();
            resetTimer();
        }
    }, 1000);
}

// Message
function loseMsg(message) {
    winLoseMsg.textContent = `Game Over! The word was: ${selectedWord}`;
    msg.style.display = "flex";
}
function winMsg() {
    winLoseMsg.textContent = `WOW! You guessed the word! Thoe word is: ${selectedWord}`;
    msg.style.display = "flex";
}

// Close message
function closeMsg() {
    msg.style.display = "none";
    render()
}


// Handle Letter Click
function handleLetterClick(event) {
    const clickedLetter = event.target.textContent;
    const check = selectedWord.includes(clickedLetter);
    const parentDiv = event.target.parentNode;
/*check if clickable letter is one of the letters in selected word*/ 
    
    resetTimer();
    parentDiv.classList.add("disabled");
    //opacity = 0.5 and pointer event = none
        
    if (check) {
        parentDiv.style.backgroundColor = "green";
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === clickedLetter) {
                guessedWord[i] = clickedLetter;
                wordDiv.children[i].textContent = clickedLetter;
            }
        }
        if (guessedWord.join("") === selectedWord) { // gueesed [C,A,R] , selected word = CAR , using join guessed = CAR
            wins++;
            winCounter.textContent = `Wins: ${wins}`
            winMsg()
            if (wins >= 3) {
                solveButton.disabled = false;
            }

        }
    } else {
        parentDiv.style.backgroundColor = "red";
        wrongGuesses++;
        updateWater();
    }
}


// ----------------------------------------------Event Listener----------------------------------------------

revealButton.addEventListener("click", () => {
    const index = guessedWord.indexOf(""); // Find the first blank letter
    
        guessedWord[index] = selectedWord[index];
        wordDiv.children[index].textContent = selectedWord[index];

        // Find the letter in the letters list that corresponds to the revealed letter
        letters.forEach((letterElement) => {
            if (letterElement.textContent.toUpperCase() === selectedWord[index]) {
                const parent = letterElement.parentNode;
                parent.style.backgroundColor = "green"; // Mark it green
                parent.style.pointerEvents = "none"; // Disable clicking
                parent.style.opacity = ".5";
            }
        });
    

    revealButton.classList.remove("help-btn");
    revealButton.classList.add("help-btn-click");
    revealButton.disabled = true;// Disable button after revealing a letter
});

markWrongButton.addEventListener("click", () => {
    let wrongCount = 0;

    // Loop through each letter
    letters.forEach((letterElement) => {
        const parent = letterElement.parentNode;
        const letter = letterElement.textContent.toUpperCase();

        // Check if the letter is not in the selected word and not already disabled
        if (!selectedWord.includes(letter) && wrongCount < 3 && parent.style.pointerEvents !== "none") {
            parent.style.backgroundColor = "red"; // Mark as incorrect
            parent.style.opacity = ".5";          // Reduce opacity
            parent.style.pointerEvents = "none";  // Disable further interaction
            wrongCount++;
        }
    });
    markWrongButton.classList.remove("help-btn");
    markWrongButton.classList.add("help-btn-click");
    markWrongButton.disabled = true; // Disable the button after marking wrong letters
});

saveMe.addEventListener("click", () => {
    waterElement.style.height = '0%';
    wrongGuesses = 0
    saveMe.classList.remove("help-btn3");
    saveMe.classList.add("help-btn-click");
    saveMe.disabled = true;
});


// Event Listeners
msgBtn.addEventListener("click", () => {
    closeMsg();
});
letters.forEach((letter) => {
    letter.addEventListener("click", handleLetterClick);
});

// Initialize Game
init();
resetTimer();
