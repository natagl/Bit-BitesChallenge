class Encoder {
    constructor(input) {
        this._input = input;
        this._len = input.length;
        this._resultDecimal = [];
        this._asciiArr = [];
        this._bit = 0;
        this._LOOP_LEN = 7;
        this._INPUT_LEN = 4;
        this._result = 0;
    }
    // --------------------------------------------
    // Getters
    get input() {
        return this._input;
    }

    get inputLength() {
        return this._len;
    }

    get resultDecimal() {
        return this._resultDecimal;
    }

    get asciiArr() {
        return this._asciiArr;
    }

    get bit() {
        return this._bit;
    }

    get result() {
        return this._result;
    }

    static get LOOP_LEN() {
        return 7;
    }

    static get INPUT_LEN() {
        return 4;
    }
    // ------------------------------------------------------
    //Methods
    //Returns true, if valid length
    //Returns false, if invalid length
    checkForValidInputLength() {
        if (this._len <= 0 || this._len > 4) {
            return false;
        };
        return true;
    }
    // cheking if elemnet exists in ASCII Table
    checkAsciiLimit(asciiVal) {
        if (asciiVal < 0 || asciiVal > 255) {
            return "Input is out of ASCII Table";
        }
    }
    // 
    convetStringToDecimal() {
        for (let i = 0; i < this._INPUT_LEN; i++) {
            this._asciiArr[i] = this._input.charCodeAt(i);

            //Zero-padding logic
            if (isNaN(this._asciiArr[i]) == true) //ascii[i] == 'NaN'
            {
                this._asciiArr[i] = 0;
            }
            //Check for Ascii limit after all conversion is done
            this.checkAsciiLimit(this._asciiArr[i]);
        }

        console.log("before reversing : " + this._asciiArr);
    }

    // reversing output
    reveseArr() {
        this._asciiArr.reverse();
        console.log("after reversing : " + this._asciiArr);
        console.log("----------");
    }

    convertArraytoString() {
        //Join the decimal array and return string
        this._result = this._resultDecimal.join(""); //result is a string
        console.log(this._result);
    }

    //convert to decimal, parseInt will always give decimal result
    // result is the string we want to convert
    // 2 - is the string representaion specifying the numeric base
    convertBinaryToDecimal() {
        //Saving the final Decimal in "this._result"
        this._result = parseInt(this._result, 2);
    }

    /****Encoding starts here******/

    //Main logic of bit wise operation to store the encoded bits to decimal empty array
    //asciiArr[len - 1 -i] : Each byte from the end of asciiArr
    //j: number of times we are going to right shift
    //i: the location of the byte

    encode() {
        //Step1. Check for valid input
        if (this.checkForValidInputLength() == false) {
            return "Input should be between 1 and 4";
        }

        //Step2. We convert input to ascii value
        this.convetStringToDecimal();

        //Step3. We Reverse the ascii array
        this.reveseArr();

        //Step4.Main Logic: shifting and masking
        for (let j = 0; j <= this._LOOP_LEN; j++) {
            for (let i = this._INPUT_LEN - 1; i >= 0; i--) {
                this._bit = ((this._asciiArr[i] >> j) & 1); // i = 0, bit = 0
                this._resultDecimal.unshift(this._bit);
            }
        }
        console.log(this._resultDecimal);

        //Step5. We join "this._resultDecimal" to a string
        this.convertArraytoString();

        //Step6. We Convert the string from Binary to Decimal
        this.convertBinaryToDecimal();

        //Step7. Finally, return the desired decimal value
        return this._result;
    }
}

// let ourEncoder = new Encoder('F');
// //console.log(ourEncoder);
// console.log(ourEncoder.encode());
