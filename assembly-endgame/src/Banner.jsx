import clsx from "clsx"
import { languages } from "./languages"
import {getFarewellText} from "./utils"
export default function Banner(props){
    function correctbanner(){
        if(props.isGameWon){
          return(
            <>
              <p>You win!</p>
              <p>Well done!🎉</p>
            </>
          )
        }
        else if(props.isGameLost){
            return(
                <>
                  <p>Game over!</p>
                  <p>You lose! Better start learning Assembly 😭</p>
                </>)
        }
        else if(props.totalGuesses !==undefined && props.totalGuesses!==0){
            const index = props.wrongGuessCount - 1;
            if (index >= 0 && index < languages.length) {
                const currentLostLanguage = languages[index].name;
                return (
                    <>
                    <p>{getFarewellText(currentLostLanguage)}</p>
                    </>
                );
            }
            
            // console.log(props.totalGuesses)
            // const currentLostLanguage=languages[props.wrongGuessCount-1].name;
            // return(
            //     <>
            //         <p>{getFarewellText(currentLostLanguage)} </p>
            //     </>
            // )
          
        }
    }
    const className=clsx("banner" ,{
            bannerNotVisible:props.wrongGuessCount===0 && !props.isGameOver,
            bannerForWon : props.isGameWon,
            bannerForLost:props.isGameLost,
            bannerForFarewell : props.totalGuesses!==0 && !props.isGameOver
        }
    )
    return(
        <>
            <section className={className}>
                {correctbanner()}
            </section>
        </>
    )
}