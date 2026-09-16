// SS1_Jai G // 
// House Drawing // 




function setup() {
    createCanvas(800, 900);


 background(135,206,250 );

 //HOUSE//

 fill(255, 255, 0);
 rect(200, 400, 400, 400);

//ROOF//

 fill(244,164,96);
 triangle(100, 400, 700, 400, 400, 200);

//DOOR//

 fill(0, 0, 0);
 rect(300, 600, 200, 200);

 //WINDOWS//

 fill(255, 255, 255);
 ellipse(500, 450, 50, 50); 
 ellipse(300, 450, 50, 50); 
 
 //WINDOW LINES//

 strokeWeight(4);
 line(500, 475, 500, 425); 
 line(300, 475, 300, 425);
 line(324, 450, 276, 450);
 line(524, 450, 476, 450);
}




