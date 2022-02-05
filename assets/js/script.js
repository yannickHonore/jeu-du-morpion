
const launchGame = () => {
	new TicTacToe();
}

let score = {'X': 0, 'O': 0};
let scoreX = document.getElementById('scoreX');
let scoreO = document.getElementById('scoreO');

class TicTacToe {
	cases = document.getElementsByClassName("case");
	casesValues = document.getElementsByClassName("ticTacToe__case");
	message = document.getElementById("message2");

	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];
	isFinish = false;
	player = ["X", "O"];
	turn = 0;

	constructor() {
		for (let i = 0; i < this.cases.length; i++) {
			this.casesValues[i].textContent = '';
			this.cases[i].addEventListener("click", () => {
				if (this.isFinish == false) {
					this.play(i);
				}
			});
		}
		message.style.cssText = "display: none";
	}

	/**
	 * Fonction qui gère l'action de l'uitilisateur
	 * @param {*} i index de la case choisie
	 */
	play = (i) => {
		let y;
		let x;

		// On détermine sur quel ligne on est
		if (i == 0 || i == 1 || i == 2) {
			y = 0;
		} else if (i == 3 || i == 4 || i == 5) {
			y = 1;
		} else {
			y = 2;
		}

		/* On aurait aussi pue utiliser cette fonction
		const index = i + 1;
		y = Math.ceil(index / 3) - 1;
		*/

		// On détermine sur quel colone on est
		if (i == 0 || i == 3 || i == 6) {
			x = 0;
		} else if (i == 1 || i == 4 || i == 7) {
			x = 1;
		} else {
			x = 2;
		}

		// On vérifie que notre case ne contien rien
		if (this.board[y][x] == "") {
			// On rentre une X ou un O dans notre tableau
			this.board[y][x] = this.player[this.turn];
			// On affiche une X ou un O sur notre grille
			this.casesValues[i].textContent = this.player[this.turn];

			// On regarde si le joueur a gagné
			const res = this.isWin();
			// On regarde si la grille est pleine
			const full = this.isFull();

			const divMessage = document.getElementById("message");
			if (res == true) {
				// Si un joueur a gagné on signale que la partie est terminé et on affiche le message de victoire
				this.message.textContent = `Le joueur ${this.player[this.turn]} à gagné`;
				this.isFinish = true;
				divMessage.style.cssText = "display: flex";
			} else if (full == true) {
				// Si aucun joueur a gagné on signale que la partie est terminé et on affiche le message de dégalité
				this.message.textContent = `Toutes les cases sont prise, personne n'a gagné`;
				this.isFinish = true;
				divMessage.style.cssText = "display: flex";
			}

			// On change le tour du joueur
			if (this.turn == 1) {
				this.turn = 0;
			} else {
				this.turn = 1;
			}
		}
	};

	/**
	 * Fonction qui vérifie que des cases soit encore disponible
	 * @returns true si le tableau est plein
	 */
	isFull = () => {
		for (let y = 0; y < this.board.length; y++) {
			for (let x = 0; x < this.board[y].length; x++) {
				if (this.board[y][x] == "") {
					return false;
				}
			}
		}
		return true;
	};

	/**
	 * Permet de mettre à jour le score et à l'afficher
	 */
	scoreUpdate = () => {
		if(this.turn == 0){
			score.X++;
			scoreX.textContent = score.X;
		}else{
			score.O++;
			scoreO.textContent = score.O;
		}
	}

	/**
	 * Vérifie quelqu'un à gagner
	 * @returns true si quelqu'un à gagner
	 */
	isWin = () => {
		// On boule pour vérifier si une ligne ou une collone contien les meme valeurs
		for (let i = 0; i < this.board.length; i++) {
			if (
				(this.board[i][0] != "" &&
					this.board[i][0] == this.board[i][1] &&
					this.board[i][0] == this.board[i][2]) ||
				(this.board[0][i] != "" &&
					this.board[0][i] == this.board[1][i] &&
					this.board[0][i] == this.board[2][i])
			) {
				this.scoreUpdate();
				return true;
			}
		}

		// On test les diagonales
		if (
			(this.board[0][0] != "" &&
				this.board[0][0] == this.board[1][1] &&
				this.board[0][0] == this.board[2][2]) ||
			(this.board[0][2] != "" &&
				this.board[0][2] == this.board[1][1] &&
				this.board[0][2] == this.board[2][0])
		) {
			this.scoreUpdate();
			return true;
		}

		return false;
	};
}


// Ecouteur pour lancer une partie
document.getElementById('launchGame').addEventListener('click', launchGame);
document.getElementById('replay').addEventListener('click', launchGame);

// Ecouteur pour pouvoir fermer la fennetre message
document.getElementById("croix").addEventListener("click", function(){ message.style.cssText = "display: none"; });