function insertar(num) {
    //if there is syntax error, return the function
    if(SyntaxError) { 
        return
    }
    
    // insert a number into the display
    if(display.value.length < 20) {
      
        if(isNaN(num)) {
            display.value += num
        }
        else if(display.value.length == 1 && display.value[0] == 0) {
            display.value = num
        }
        else {
            display.value += num
        }
    }
    else {
        return
    }
}

function borrar() {
    //if there is a syntax error, toggle the variable to false (reset)
    SyntaxError = false
    //clear the display value 
    display.value = "0";

}

function igual() {
    var exp = display.value
    var flag = false //boolean variable to check condicionals 

    for(i = 0; i < exp.length; i++) {
        if(isNaN(exp[i]) && isNaN(exp[i+1])) {
            if(exp[i] != "+" && exp[i] != "-") {
                //if there are two operator together, toggle syntaxerror to true
                display.value = "Error de sintaxis"
                SyntaxError = true
            }

        }
    }

    if(flag == false) { //if there is no  errors, calculate the expression normaly
        var answer = eval(exp)

        if(isFinite(answer)) {
            display.value = answer
        }
        else {
            display.value = "Error" // if is infinity 
            SyntaxError = true
        }
    }
   
    
}

function retroceder() {
    //if there is syntax error, return the function
    if(SyntaxError) {
        return
    }

    display.value = display.value.substring(0,display.value.length-1)
    
    if(display.value == "") {
        display.value = "0"
    }

}

//selecting display
const display = document.querySelector('.display')
//selecting all numbers
const numbers = document.querySelectorAll('.number')
//adding event listener for each number in "numbers"
numbers.forEach( (button) => {
    button.addEventListener('click', calculate)
})
//selecting all operator
const operator = document.querySelectorAll('.operator')
//adding event listener for each operator in "operator"
operator.forEach( (button) => {
    button.addEventListener('click', calculate)
})
// adding event listener to the keyboard
window.addEventListener('keypress', check)
function check(key) {
    let keyValue = key.key
    if (key.keyCode) {
        if(!isNaN(keyValue)) {
            insertar(keyValue)
        } else { 
            if(display.value.length == 1 && display.value[0] == 0) {
                return
            } else {
                for(i = 0; i < operator.length; i++) {
                    if(keyValue == operator[i].value) {
                        if (keyValue == "c") {
                            borrar()
                        } else if (keyValue == "<") {
                            retroceder()
                        } else if (keyValue == "=") {
                            igual()
                        } else {
                            display.value += keyValue
                        }
                    }
                }
            } 
        }
    }
}

//boolean variable to check if there is syntax error
var SyntaxError = false

function calculate(event) {
    var buttonValue = event.target.value


    if (!isNaN(buttonValue) || (isNaN(buttonValue) && buttonValue != "=" && buttonValue != "<" && buttonValue != "c")) {
        if(buttonValue == "x") {
            buttonValue = "*" //changing the "x" into "*" to calculate normally
        }

        //insert the buttonValue 
        insertar(buttonValue) 

    }
    else if (buttonValue == '=') {
        igual() //calling the equal() function
    }
    else if (buttonValue == "<") {
        retroceder() //calling the back() function
    }
    else if (buttonValue == "c") {
        borrar() //calling the clean() function
    }
    
}


