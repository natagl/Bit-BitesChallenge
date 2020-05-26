let inputData = "";

function encodeFunction() {
    inputData = document.getElementById("input").value;
    // console.log(inputData);
    let ourEncoder = new Encoder(inputData);
    // console.log(ourEncoder.encode());
    document.getElementById("output").innerHTML = ourEncoder.encode();
}

function decodeFunction() {
    inputData = document.getElementById("input").value;
    // console.log(typeof (inputData));
    let inputArray = inputData.split(',');
    // console.log(inputArray);
    let ourDecoder = new Decoder(inputArray);
    document.getElementById("output").innerHTML = ourDecoder.decode();
    //console.log(ourDecoder.decode());
}







