let inputData = "";
function encodeFunction() {
    inputData = document.getElementById("input").value;
    // console.log(inputData);
    let ourEncoder = new Encoder(inputData);
    // console.log(ourEncoder.encode());
    document.getElementById("output").innerHTML = ourEncoder.encode();

}








