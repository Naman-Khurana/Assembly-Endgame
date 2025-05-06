import clsx from "clsx"
export default function Key(props){
    const className=clsx("key",{
        correct: props.isCorrect,
        wrong : props.isWrong,
        isDisabled: props.isGameOver
      })
    let keyFunctionality=()=> props.addGuessedWord(props.id)
     
    return(
        <button disabled={props.isGameOver} className={className} onClick={keyFunctionality}>{props.letter} </button>
    )
}