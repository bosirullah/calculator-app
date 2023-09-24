document.querySelector(".circle").textContent = "";

var count = 1;
var circle = document.querySelector(".circle");
circle.style.marginLeft = "6px";

document.querySelector(".switch").addEventListener("click", function (){
    if(count === 0 || count >= 3){
        circle.style.marginLeft = "6px";
        count = 0;
    }
    else{
        var style = circle.style.marginLeft;
        var result;
        if(style[1] === "p"){
            result = (style[0] - "0");
        }
        else result = (style[0] - "0") * 10 + (style[1] - "0")

        result += 22;
        circle.style.marginLeft = result + "px";  
    }
    count++;
    count %= 4;
    switchTheme2(count);
})

function switchTheme2(count){
    var link = document.querySelectorAll("link");
    link[3].setAttribute("href","styles/style" + count +".css")
}

// Initialize variables
let currentInput = '';
let previousCalculations = '';
let resultDisplayed = false;
let previousResult = null;
let result = 0;
let checkReset = true;
let newHistoryLine,newResult;


// Get the HTML elements
const screen = document.querySelector('.screen p');
const keys = document.querySelectorAll('.keys');
const equalBtn = document.querySelector('.equal-btn');
const resetBtn = document.querySelector('.reset-btn');
const delBtn = document.querySelector('.del-btn');
const historyContainer = document.getElementById('history-container'); // Container for history

// Event listener for all keys except DEL
keys.forEach((key) => {
    key.addEventListener('click', () => {
        if (resultDisplayed) {
        // If the result is displayed, start a new calculation
        currentInput = key.textContent;
        resultDisplayed = false;
    } 
    else if (key.textContent !== 'DEL' && key.textContent !== '=') {
        // Exclude DEL button and add other key values to currentInput
        currentInput += key.textContent;
    }
        updateScreen(currentInput);
    });
});

// Function to update the screen
function updateScreen(text) {
    const screen = document.querySelector('.screen span');
    screen.textContent = text || '0'; // Set text to "0" if it's empty or falsy
}


function calculate() {
    try {
        let sanitizedInput = currentInput.replace(/x/g, '*'); // Replace 'x' with '*'
        result = eval(sanitizedInput);
    
        if (isNaN(result) || !isFinite(result)) {
            // Check if the result is NaN or Infinity
            throw new Error('Invalid Calculation');
        }
    
        // Check if there's a previous result
        if (previousResult !== null) {
            // If there is a previous result, add it to the current input
            result += previousResult;
            previousResult = result; // Reset the previous result
        }
        else{
            previousResult = result;
        }

        if (checkReset) {
            newHistoryLine = document.createElement('p');
            newResult = document.createElement('p');
            newHistoryLine.textContent = `${currentInput}`;
            newResult.textContent = ` = ${result}`;
            historyContainer.appendChild(newHistoryLine); // Append it to the history container
            historyContainer.appendChild(newResult);

            checkReset = false;
        } else {
            newHistoryLine.textContent += ` ${currentInput}`; // Append with a space
            newResult.textContent = ` = ${result}`;
            
        }
        updateScreen(result);
        resultDisplayed = true;
        currentInput = result.toString(); // Store the result for future calculations
    } catch (error) {
        console.log(error);
        updateScreen('Error');
        currentInput = '';
    }
}

// Event listener for the equal button
equalBtn.addEventListener('click', calculate);

// Event listener for the reset button
resetBtn.addEventListener('click', () => {
    currentInput = '';
    result = 0;
    previousResult = null;
    checkReset = true;
    updateScreen('0');
});


// Event listener for the DEL button
delBtn.addEventListener('click', () => {
    if (resultDisplayed) {
        // If the result is displayed, clear the result and start a new calculation
        resultDisplayed = false;
        currentInput = '';
    } else {
        // Remove the last character from the current input
        currentInput = currentInput.slice(0, -1);
    }
    updateScreen(currentInput);
});

// Function to display previous calculations
function displayPreviousCalculations() {
    const previousCalculationElement = document.querySelector('.container2 p');
    if(previousCalculations){
        previousCalculationElement.innerHTML = previousCalculations;
    }
}

// Call the function to display previous calculations
updateScreen('0');
displayPreviousCalculations();




