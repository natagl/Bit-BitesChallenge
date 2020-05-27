//
// Created by Nataliia Glinska on 05/26/2020 glinska.nataliia21@gmail.com

// index.js : This is the hook to html for the landing page. This file contains
//             essential functions to handle data from action of html elements.
//

function encodeFunction() {
    //Get the Data from input text box
    let inputData = document.getElementById("input").value;

    //Create instance of Encoder class
    let ourEncoder = new Encoder(inputData);
    //Store the output of encode function, decimalArray saves the final result
    const decimalArray = ourEncoder.encode();
    //console.log(decimalArray);

    //Start to print out the array to html
    document.getElementById("output").innerHTML = "[";
    for (var i = 0; i < decimalArray.length; i++) {
        if (i != 0 && i % 6 == 0) {
            document.getElementById("output").innerHTML += decimalArray[i] + ", <br>";
        } else if (i == decimalArray.length - 1) {
            document.getElementById("output").innerHTML += decimalArray[i];
        }
        else {
            document.getElementById("output").innerHTML += decimalArray[i] + ", ";
        }
    }
    document.getElementById("output").innerHTML += "]";
}

function decodeFunction() {
    //Get the Data from input text box
    let inputData = document.getElementById("input").value;
    //Convert the Data from string to Array of decimals
    let inputArray = inputData.split(',');

    //Create instance of Decoder class
    let ourDecoder = new Decoder(inputArray);

    const resultString = ourDecoder.decode();
    //console.log(resultString);

    //Display final string to html
    document.getElementById("output").innerHTML = resultString;
}









