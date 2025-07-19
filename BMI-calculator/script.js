
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const display = document.getElementById("display")


function bmi(){
    let result = weight.value/(height.value **2);
    
    if (result<=19){
        console.log("you're underweight")

    }
    else if(result<=25){
        console.log("you're in the normal range")
    }
    else{
        console.log("you're obese")
    }
    display.innerHTML = result
}