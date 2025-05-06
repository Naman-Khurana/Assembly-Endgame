import { useEffect, useState } from 'react'
import './App.css'
import { useWindowSize } from 'react-use'
import LanguageChip from './LanguageChip'
import { languages } from './languages'
import { nanoid } from 'nanoid'
import Key from './Key'
import clsx from 'clsx'
import Banner from './Banner'
import { getRandomWord } from './utils'
import Confetti from 'react-confetti'
function App() {
  const [currentWord, setCurrentWord]=useState(()=>getRandomWord());
  const[guessedWord,setGuessedWord]=useState([]);
  const { width, height } = useWindowSize()

  //derived values 

  const wrongGuessCount=guessedWord.reduce((acc,val) =>{
    return !currentWord.includes(val) ? acc+1 : acc ;
  },0)
  
  
  const languagesArray=languages.map((lang,index)=>
    <LanguageChip 
      name={lang.name} 
      backgroundColor={lang.backgroundColor}
      color={lang.color}
      id={index}
      key={index}
      isLost={index < wrongGuessCount}
      
      />
    
  )
  const isGameWon=currentWord.split('').every(letter=>guessedWord.includes(letter))
  const isGameLost=wrongGuessCount>=languagesArray.length-1
  const isGameOver=(isGameLost) || isGameWon;
 

  

  const wordArray=currentWord.split('').map((letter,index)=> {
    const wordGridClassName=clsx("letter-box",{
      missedLetter : isGameLost && !guessedWord.includes(letter)
    }
    )
  

    return (
    <span 
      className={wordGridClassName}
      key={index} 
    >
      {isGameOver?letter.toUpperCase() : (guessedWord.includes(letter) ? letter.toUpperCase() : null)}
    </span>)
    }
  )

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(targetId){
    
    const letter=alphabet[targetId];
    setGuessedWord(prev=>
      prev.includes(letter) ?prev : [...prev,letter]);
  }

 

   

  const alphabetArray=alphabet.split('').map((alpha,index)=>{
    const isGuessed=guessedWord.includes(alpha);
    const isCorrect=isGuessed && currentWord.includes(alpha);
    const isWrong=isGuessed &&  !currentWord.includes(alpha);
    
    return(<Key 
      letter={alpha.toUpperCase()} 
      key={index} id={index} 
      addGuessedWord={addGuessedLetter} 
      isWrong={isWrong}
      isCorrect={isCorrect}
      isGameOver={isGameOver}
      />)})

    function newGame(){
      setCurrentWord(()=>getRandomWord())
      setGuessedWord([])
    }
    let guessesLeft=(languagesArray.length-1)-wrongGuessCount
  
  return (
    <main>
      <header>
        <p>Remaining Guesses : {guessesLeft} </p>

        <h1>Assembly : Engame</h1>
        
        <p>Guess the word in under {languages.length-1} attempts to keep the programming world safe from Assembly!!</p>
        
        <Banner 
          isGameOver={isGameOver} 
          isGameWon={isGameWon} 
          isGameLost={isGameLost} 
          wrongGuessCount={wrongGuessCount}  
          totalGuesses={guessedWord.length} 
        />
      
      </header>

      <section className='language-box'>
        
        {languagesArray}
      
      </section>
      
      <section className='word-grid'>
      
        {wordArray}
      
      </section>
      
      <div className='keyboard'>
      
        {alphabetArray}
      
      </div>
      
      {isGameOver && <button className='new-game-button' 
                             onClick={newGame}
                      >
                        New Game
                      </button>}
      
      {isGameWon && <Confetti 
                      width={width}
                      height={height}
      />}
    </main>
  )
}

export default App
