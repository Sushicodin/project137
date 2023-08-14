Status="";
input_text="";
objects = [];

function preload(){

}



function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    webcam=createCapture(VIDEO);
    webcam.size(380,380);
    webcam.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Object:"
}

function modelLoaded(){
    console.log("Model Loaded");
    Status=true;
}

function draw(){
    image(webcam,0,0,380,380);
    if (Status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(webcam,gotResult);
        for(i=0; i<objects.length;i++){
        document.getElementById("status").innerHTML="Objects Detected :";
        document.getElementById("dynamic_number").innerHTML="The number of detected objects iss:" + objects.length;
    
        fill(r,g,b);
        percent=floor(objects[i].confidence *100);
        text(objects[i].label+" "+percent+"%", objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        if(objects[i].label == input_text){
            video.stop();
            object_detector.detect(gotResults);
            document.getElementById("mentioned").innerHTML = input_text+" Found";
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(input_text+"found");
            synth.speck(utterThis);
        }
        else{
            document.getElementById("mentioned").innerHTML = input_text+" Not Found";
        }

}
    }
}


function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results; 

}