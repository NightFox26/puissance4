class Grid {
    constructor(rows, columns) {
        this.rows = rows
        this.columns = columns
        this.cases = []
        this.nbToken = 0;
        this.gameover = false;
        this.init()
    }

    init() {
        let section = document.querySelector("#grid")
        let thhis = this;
        for (let i= 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let div = document.createElement("div")
                div.classList.add("case")
                div.dataset.row=i
                div.dataset.column=j
                div.dataset.occupied=0
                this.cases.push([i,j,div])
                
                div.addEventListener("click", function(event) {
                    thhis.setToken(div);                    
                })
                section.appendChild(div);
            } 
        }

        section.style.gridTemplateColumns="repeat(" + this.columns + ", 1fr)"
        section.style.gridTemplateRows="repeat(" + this.rows +", 1fr)"
        section.style.width=(100 * this.columns) + "px"
        section.style.height=(100 * this.rows) + "px"
    }

    setToken(div) {
        if(this.gameover){return}

        let column = div.dataset.column
        let i=this.rows;        
                  
        for (let t = this.cases.length-1; t >= 0; t--) {
            if(this.cases[t][1] == column){
                if(this.cases[t][2].dataset.occupied == 0){
                    let divToFill = this.cases[t][2];
                    this.nbToken++;                    
                    if(joueur1.isPlaying){
                        divToFill.style.backgroundColor = joueur1.color  
                        divToFill.dataset.occupied=joueur1.id
                        this.checkWin(joueur1,divToFill);          
                    }else{
                        divToFill.style.backgroundColor = joueur2.color   
                        divToFill.dataset.occupied=joueur2.id    
                        this.checkWin(joueur2,divToFill);    
                    }
                    changePlayer();
                    break;
                }
            }
            i--
        }        
    }

    checkWin(player,divFilled){
        if(this.nbToken>=winChain*2-1){
            this.checkHorizontal(player,divFilled);
            this.checkVertical(player,divFilled);
            this.checkDiagonalLeft(player,divFilled);
            this.checkDiagonalRight(player,divFilled);
        }
    }

    checkHorizontal(player,divFilled){
        let rowDiv = parseInt(divFilled.dataset.row);
        let columnDiv = parseInt(divFilled.dataset.column);
        let winStreak = 0;

        for (let i = columnDiv-(winChain-1); i < columnDiv+winChain; i++) {
            if(i>=0 && i <=this.rows){
                if(this.checkCaseOccupiedByPlayer(player.id, rowDiv, i)){
                    winStreak++;
                    this.isGridWin(player.name,winStreak)
                }else{
                    winStreak = 0;
                }
            }
        }
    }

    checkVertical(player,divFilled){
        let rowDiv = parseInt(divFilled.dataset.row);
        let columnDiv = parseInt(divFilled.dataset.column);
        let winStreak = 0;

        for (let i = rowDiv-(winChain-1); i < rowDiv+winChain; i++) {
            if(i>=0 && i <=this.columns){
                if(this.checkCaseOccupiedByPlayer(player.id, i, columnDiv)){
                    winStreak++;
                    this.isGridWin(player.name,winStreak)
                }else{
                    winStreak = 0;
                }
            }
        }
    }

    checkDiagonalLeft(player,divFilled){
        let rowDiv = parseInt(divFilled.dataset.row);
        let columnDiv = parseInt(divFilled.dataset.column);
        let winStreak = 0;

        for (let i = -winChain+1; i < winChain; i++) {
            console.log(winStreak)
            if(i>=0 && i <=this.columns){
                if(this.checkCaseOccupiedByPlayer(player.id, rowDiv+i, columnDiv+i)){
                    winStreak++;
                    this.isGridWin(player.name,winStreak)
                }
            }
        }
    }

    checkDiagonalRight(player,divFilled){
        let rowDiv = parseInt(divFilled.dataset.row);
        let columnDiv = parseInt(divFilled.dataset.column);
        let winStreak = 0;

        for (let i = -winChain+1; i < winChain; i++) {
            if(i>=0 && i <=this.columns){
                if(this.checkCaseOccupiedByPlayer(player.id, rowDiv+i, columnDiv-i)){
                    winStreak++;
                    this.isGridWin(player.name,winStreak)
                }
            }
        }
    }

    checkCaseOccupiedByPlayer(playerId, row, column){
        for (let i = 0; i<this.cases.length; i++) {
            if(this.cases[i][0] == row && this.cases[i][1] == column && this.cases[i][2].dataset.occupied == playerId){
                return true;
            }
        }   
        return false;
    }

    isGridWin(playerName,winStreak){
        if(winStreak >= winChain){
            this.gameover = true;
            setTimeout(function(){
                alert(playerName+" remporte la partie")
                reset()
            },200)
        }
    }
}