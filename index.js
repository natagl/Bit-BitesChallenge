let inputData = "";
function myFunction() {
    inputData = document.getElementById("input").value;
    console.log(inputData);
    let ourEncoder = new Encoder(inputData);
    console.log(ourEncoder.encode());
}





