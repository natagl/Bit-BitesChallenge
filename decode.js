//
// Created by Nataliia Glinska on 05/26/2020 glinska.nataliia21@gmail.com
//
// decode.js : Implementation of Decoder class. This class contains the required properties
//             and methods to perform the logic of decoding decimal integers.
//

class Decoder {
  constructor(input) {
    this._input = input;
    this._len = input.length;
    this._finalStringResult = "";
    this._bit = 0;
    this._everyFourBitIncrementer = 0;
    this._binaryArray = [];
    this._chunkArray = [];
    this._binaryArrayIdx = 0;
    this._chunkArrayIdx = 0;
    this._strFromChunkArray = "";

    //Constants
    this._EACH_INPUT_SIZE_IN_BITS = 32;
    this._CHAR_SIZE_IN_BITS = 8;
    this._FOUR_BITS = 4;
    this._CHUNK_SIZE = 8;
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

  //This is the heart of the decoding logic. The algorithm is following:
  // - Iterate through each bit from the input
  // - Mask each bit startting from least significant bit
  // - Store the bits inside binaryArray[]
  // - Storing is done with the help of 'binaryArrayIdx' which uses modulo and a counter named
  //   'everyFourBitIncrementer'. With these helpers, bits are stitched at the right position 
  //   like the way it was before encoding.
  createBinaryArray(elem) {
    for (let i = 0; i < this._EACH_INPUT_SIZE_IN_BITS; i++) {
      if (i != 0 && i % this._FOUR_BITS == 0) {
        this._everyFourBitIncrementer++;
      }
      this._bit = ((elem >> i) & 1);
      this._binaryArrayIdx = ((i * this._CHAR_SIZE_IN_BITS) % this._EACH_INPUT_SIZE_IN_BITS) + this._everyFourBitIncrementer;
      //console.log("i: " +i + ",idx: " + idx + ",bit: "+bit);
      this._binaryArray[this._binaryArrayIdx] = this._bit;
    }
  }

  // reversing binaryArray
  reveseArr() {
    this._binaryArray.reverse();
    //console.log("after reversing : " + this._asciiArr);
  }

  // From the binaryArray, we Take 8bits of chunk at a time, and convert them into characters
  chunkArrayAndParseCharacters() {
    for (let i = this._binaryArray.length; i >= 0; i -= this._CHUNK_SIZE, this._chunkArrayIdx++) {
      this._chunkArray.push(this._binaryArray.slice(i - this._CHUNK_SIZE, i));
      this.convertOneChunkToCharacater();
      this.storeEachCharacaterInResultString();
    }
  }

  // convert to decimal, parseInt will always give decimal result
  // result is the string we want to convert
  // 2 - is the string representaion specifying the numeric base
  convertOneChunkToCharacater() {
    //Saving the final Decimal in "this._result"
    this._strFromChunkArray = this._chunkArray[this._chunkArrayIdx].join("");
    this._strFromChunkArray = parseInt(this._strFromChunkArray, 2);
  }

  // Save each decoded characater in the finalStringArray.
  storeEachCharacaterInResultString() {
    this._finalStringResult += String.fromCharCode(this._strFromChunkArray);
  }

  // Reset all placeholder arrays and indexes. This needs to be done so we can start fresh
  // for the next input.
  resetArraysAndIndexes() {
    this._binaryArray.length = 0;
    this._binaryArray = [];
    this._chunkArray.length = 0;
    this._chunkArray = [];
    this._chunkArrayIdx = 0;
    this._everyFourBitIncrementer = 0;
    this._strFromChunkArray = "";
  }

  /****Decoding starts here******/

  //Main logic of bit wise operation to store the decoded bits to string 
  decode() {
    //Step1. Check for valid input
    if (this.checkForValidInputLength() == false) {
      return "Input Should be at least 1 number to decode";
    }

    //Step2. For Each input in the Array, perfrom decode and store 4 characters
    this._input.forEach(element => {
      //Step3. We convert input to binary value and store them into binaryArray
      //       Main Logic: shifting and masking is implemented inside this method
      this.createBinaryArray(element);

      //Step4. We Reverse the binary array to get the least significant bits in the last byte
      this.reveseArr()

      //Step5. We create a chunk of 8bits and convert them to characaters, one chunk at a time
      //       We repeast this process for 4 chunks, or 32 bits
      this.chunkArrayAndParseCharacters();

      //Step6. Reset all the placeholder arrays and indexes so we can get ready for next input
      this.resetArraysAndIndexes();
    });

    //Step7. Finally, return the desired string value after processing all inputs
    return this._finalStringResult;
  }
}