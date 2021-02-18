new Vue({
    el: '#app',
    data: {
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
        sequence: [],
        score: 0,
        elements: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        userSequence: [],
        partyOver: true,
        isDisplaying: false
    },
    methods: {
        addRandomElementsToSequence() {
            for (let i = 0; i < 3 + this.score; i++) {
                this.sequence.push(this.elements[Math.floor(Math.random() * 4)])
            }
        },
        addElementToUserSequence(element) {

            // the player cannot play if the game is not started or if the sequence is displayed
            if (!this.partyOver && !this.isDisplaying) {

                // color the clicked square
                this[element] = true

                // after 500 ms
                setTimeout(() => {

                    // If the square on which the player clicks does not correspond to the square of the sequence the player loses
                    if (element !== this.sequence[this.userSequence.length]) {

                        // Ask the player if they want to redo a game
                        if (window.confirm(`Vous avez perdu ! Votre score : ${this.score}. Voulez vous recommencer ?`)) {
                            this.newGame();
                        } else {
                            this.partyOver = true;
                        }
                    } else {
                        // if correct square is clicked element is save in the array
                        this.userSequence.push(element);
                    }

                    // if the array is complete the user win
                    if (this.userSequence.length === this.sequence.length) {
                        this.score++;
                        this.newLap();
                    }

                    // uncolor the clicked square
                    this[element] = false;
                }, 300);
            }
        },
        newGame() {
            this.resetAllSequences();
            this.score = 0;
            this.partyOver = false;
            this.newLap();
        },
        displaySequence() {
            // the sequence is diplaying so user cannot click on square
            this.isDisplaying = true;
            // after 500 ms all element generated randomly are displayed to user
            setTimeout(() => {
                this.displayElement(0);
            }, 500);
        },
        displayElement(elementIndex) {
            if (elementIndex < this.sequence.length) {
                let element = this.sequence[elementIndex]
                this[element] = true;

                 // wait 300 ms before undisplay element
                setTimeout(() => {
                    this[element] = false;

                    // 300 ms before display element
                    setTimeout(() => {

                        // display the next element
                        this.displayElement(elementIndex + 1);
                    }, 300);
                }, 300);
            } else {

                // the user can click on square
                this.isDisplaying = false;
                return;
            }
        },
        newLap() {
            this.resetAllSequences();
            this.addRandomElementsToSequence();
            this.displaySequence();
        },
        resetAllSequences() {
            this.userSequence = [];
            this.sequence = [];
        }
    }
});