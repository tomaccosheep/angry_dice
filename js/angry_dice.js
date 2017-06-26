'use strict';

var round = 1;


function Die (id) {
    this.id = id;
    this.val = 0;
    this.held = false;
    this.setVal = function () {
        if (!this.held) {
            this.val = Math.floor(Math.random() * 6) + 1;
            this.render();
        };
    };

    this.render = function () {
//        document.getElementById(this.id).innerHTML = this.val.toString();
        var image_path = "url(dice_pics/" + this.val + ".png)";
        console.log(image_path);
        document.getElementById(this.id).style.backgroundImage = image_path;
        document.getElementById(this.id).style.backgroundSize = '100%';
    };
};

function changeRound() {
    document.getElementById('roundNumber').innerHTML = round.toString();
};

function releaseHold() {
    die1.held = false;
    die2.held = false;
    document.getElementById(die1.id).style.borderColor = 'black';
    document.getElementById(die2.id).style.borderColor = 'black';
};

function checkRound() {
    if (die1.val === 3 && die2.val === 3) {
        round = 1;
        changeRound();
        document.getElementById('message').innerHTML = "Angry Dice sends you back to round 1.";
    } else if (round === 1 && die1.val + die2.val === 3) {
        round = 2;
        changeRound();
        releaseHold();
    } else if (round === 2 && (die1.val === 3 || die1.val === 4) && (die2.val === 3 || die2.val === 4)) {
        round = 3;
        changeRound();
        releaseHold();
    } else if (round === 3 && die1.val + die2.val === 11) {
        document.getElementById('message').innerHTML = 'You Win!!!';
        changeRound();
        releaseHold();
    }
};

var die1 = new Die('die1');
var die2 = new Die('die2');

document.getElementById('roll').addEventListener('click', function (e) {
    e.preventDefault();
    die1.setVal();
    die2.setVal();
    checkRound();
}); 

var dieDivs = document.getElementsByClassName('dieClick');

Array.from(dieDivs).forEach(function (el) {
    el.addEventListener('click', function () {
        if (this.id === 'die1' && !die1.held && die1.val != 6) {
            die1.held = true;
            this.style.borderColor = 'red';
        } else if (this.id == 'die2' && !die2.held && die2.val != 6) {
            die2.held = true; 
            this.style.borderColor = 'red';
        } else if (this.id == 'die1' && die1.held) {
            die1.held = false; 
            this.style.borderColor = 'black';
        } else if (this.id == 'die2' && die2.held) {
            die2.held = false; 
            this.style.borderColor = 'black';
        };
    });
});


