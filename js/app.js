let rows = 6;
let columns = 7;
let winChain = 4;

new Grid(rows,columns);
let joueur1 = new Player(1,"Joueur1", "pink");
let joueur2 = new Player(2,"Joueur2", "dodgerblue");

let tour = document.querySelector("#tour_joueur span")
let sectionGrid = document.querySelector("#grid")

joueur1.isPlaying = true;
tour.textContent=joueur1.name

// action sur le btn reset
document.querySelector("#reset").addEventListener("click", function() {
    reset();
})

function changePlayer(){
    joueur1.isPlaying = !joueur1.isPlaying;
    joueur2.isPlaying = !joueur2.isPlaying;
   
    if(joueur1.isPlaying) {
        tour.textContent=joueur1.name
    } else {
        tour.textContent=joueur2.name
    }
}

function reset() {
   sectionGrid.innerHTML = ""
   new Grid(rows,columns)
}



