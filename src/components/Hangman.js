import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './Words.js';

import wrong0 from "./images/0.png";
import wrong1 from "./images/1.png";
import wrong2 from "./images/2.png";
import wrong3 from "./images/3.png";
import wrong4 from "./images/4.png";
import wrong5 from "./images/5.png";

class Hangman extends Component {
	static defaultProps = {
		maxWrong: 5,
		images:  [wrong0, wrong1, wrong2, wrong3, wrong4, wrong5]
	}

	constructor(props) {
		super(props);
		this.state = {
			mistake: 0,
			guessed: new Set([]),
            wrongguessed: new Array([]),
			answer: randomWord()
		}
	}
	
	handleGuess = e => {
		let letter = e.target.id;
		this.setState(x => ({
            //Adding Letter to list of letters Guessed
			guessed: x.guessed.add(letter),

            //Increment of mistake counter if wrong
			mistake: x.mistake + (x.answer.includes(letter) ? 0 : 1),

            //Adding Letter to list of letters wrong if wrong
            wrongguessed: x.wrongguessed + (x.answer.includes(letter) ? "" : letter)
			
		}));

        //Changing Colour of Buttons once guessed
        document.getElementById(letter).classList.add("btn-light")
        document.getElementById(letter).classList.remove("btn-primary")
		
	}
        
	
	guessedWord(){
		return this.state.answer.split("").map(letter =>  (this.state.guessed.has(letter) ? letter : " _ "));
	}

	buttons(){
		return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
			<button
				class="btn btn-lg btn-primary m-2"
				id = {letter}
				onClick = {this.handleGuess}
                disabled={this.state.guessed.has(letter)}
			>
				{letter}
			</button>
		));			
	}

    resetButton = () => {
	    this.setState({
	      mistake: 0,
	      guessed: new Set([]),
          wrongguessed: new Array([]),
	      answer: randomWord()
	    });
  	}

	render(){
		const gameLost = this.state.mistake >= this.props.maxWrong;
		const gameWon = this.guessedWord().join("") === this.state.answer;

		let display = this.buttons();
		
		if(gameLost){
			display = "You Lost!!"
		}
		if(gameWon){
			display = "You Won!!"
		}
		
		//Clicks the button based on Keyboard Input
		document.addEventListener("keydown", function onPress(event) {
			document.getElementById(event.key).click();
		});
		
		
		return(
			<div className="Hangman container">
		      <h1 className='text-center'>Hangman</h1>
		      <div className="float-right">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}
              <p>Letters Guessed: {this.state.wrongguessed}</p></div>
		      <div className="text-center">
					  <img src={this.props.images[this.state.mistake]} alt=""/> 
				  </div>
		      <div className="text-center">
		        <p>Guess the Word:</p>
		        <p> {!gameLost ? this.guessedWord() : this.state.answer} </p>
		          <p>{display}</p>
		          <button className='btn btn-info' onClick= {this.resetButton}>Reset</button>
		        </div>
		    </div>
		)
	}
}

export default Hangman;