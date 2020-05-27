//
// Created by Nataliia Glinska on 05/26/2020 glinska.nataliia21@gmail.com
//
// encode.js : Implementation of Encoder class. This class contains the required properties
//             and methods to perform the logic of encoding strings.
//

class Encoder {
    constructor(input) {
        this._input = input;
        //Use Regular expression and Match to divide input string into 4 character chunks
        this._splitArray = input.match(/.{1,4}/g);
        //decimal is an empty array which will return the final result
        this._finalDecimalArray = [];
        this._len = input.length;
        this._resultDecimal = [];
        this._asciiArr = [];
        this._bit = 0;
        this._result = 0;

        // Constants
        this._LOOP_LEN = 8;
        this._INPUT_LEN = 4;
    }

    // ------------------------------------------------------
    //Methods

    //Returns true, if valid length
    //Returns false, if invalid length
    checkForValidInputLength() {
        if (this._len <= 0) {
            return false;
        };
        return true;
    }

    // Check if element exists in ASCII Table
    checkAsciiLimit(asciiVal) {
        if (asciiVal < 0 || asciiVal > 255) {
            return "Input is out of ASCII Table";
        }
    }

    //Conversion of each characters to ascii value
    convetStringToDecimal(elem) {
        for (let i = 0; i < this._INPUT_LEN; i++) {
            this._asciiArr[i] = elem.charCodeAt(i);

            //Zero-padding logic
            if (isNaN(this._asciiArr[i]) == true) //ascii[i] == 'NaN'
            {
                this._asciiArr[i] = 0;
            }
            //Check for Ascii limit after all conversion is done
            this.checkAsciiLimit(this._asciiArr[i]);
        }
    }

    // Reversing Array for getting least significant bit starting from the last byte
    reveseArr() {
        this._asciiArr.reverse();
        //console.log("after reversing : " + this._asciiArr);
        //console.log("----------");
    }

    // Conversion of Array to String
    convertArraytoString() {
        //Join the decimal array and return string
        this._result = this._resultDecimal.join(""); //result is a string
        //console.log(this._result);
    }

    // Convert to decimal, parseInt will always give decimal result
    // result is the string we want to convert
    // 2 - is the string representaion specifying the numeric base
    convertBinaryToDecimal() {
        //Saving the final Decimal in "this._result"
        this._result = parseInt(this._result, 2);
    }

    // Reset Array and indexes to get ready to process next element of splitArray
    resetResultDecimalArray() {
        this._resultDecimal.length = 0;
        this._resultDecimal = [];
    }

    /****Encoding starts here******/

    //Main logic of bit wise operation to store the encoded bits to decimal empty array
    //asciiArr[len - 1 -i] : Each byte from the end of asciiArr
    //j: number of times we are going to right shift
    //i: the location of the byte

    encode() {
        //Step1. Check for valid input
        if (this.checkForValidInputLength() == false) {
            return "Input should be greater than zero";
        }

        this._splitArray.forEach(element => {
            //Step2. We convert input to ascii value
            this.convetStringToDecimal(element);

            //Step3. We Reverse the ascii array
            this.reveseArr();

            //Step4.Main Logic: shifting and masking
            for (let j = 0; j < this._LOOP_LEN; j++) {
                for (let i = this._INPUT_LEN - 1; i >= 0; i--) {
                    this._bit = ((this._asciiArr[i] >> j) & 1); // i = 0, bit = 0
                    this._resultDecimal.unshift(this._bit);
                }
            }
            //console.log(this._resultDecimal);

            //Step5. We join "this._resultDecimal" to a string
            this.convertArraytoString();

            //Step6. We Convert the string from Binary to Decimal
            this.convertBinaryToDecimal();

            //Step7. Push the encoded decimal for first 4 characters into the final array
            this._finalDecimalArray.push(this._result);

            //Step8. Reset the intermediate result decimal array
            this.resetResultDecimalArray();
        });

        //Step9. Finally, return the desired decimal value in the Array
        return this._finalDecimalArray;
    }
}