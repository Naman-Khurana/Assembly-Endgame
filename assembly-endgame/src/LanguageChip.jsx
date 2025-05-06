import clsx from "clsx"

export default function LanguageChip(props){
    const styles={
        backgroundColor: props.backgroundColor,
        color:props.color
    }

    const className=clsx("language-chip-button",{
        lost : props.isLost
    })
    
    
    return(
        <>
            <button style={styles} className={className}>{props.name}</button>
        </>
    )
}