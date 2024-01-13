import { useState } from "react"
import genService from "../../../utils/genPassword"
function GenPassword({onGen}){
    

    // States for the Checkboxes
    const [upper,isUpper]=useState(true)
    const [lower,isLower]=useState(true)
    const [num,isNum]=useState(true)
    const [spec,isSpec]=useState(true)

    // State for Range
    const [length,setLength]=useState(50)

    //State for Textarea
    const [text,setText]=useState('')

    // Function that changes the state and keeps it modular
    const onCheckboxChange=(variable,stateChange)=>{   
        stateChange(!variable)
    }

    // Function that changes the state of the rnage
    const onRangeChange=({target})=>{
        setLength(target.value)
    }
    
    //Function that changes the state of the textarea
    const onTextareaChange=({target})=>{
        setText(target.value)
    }

const onGenClick = () => {
      const defaultOptions =
        upper === true &&
        lower === true &&
        num === true &&
        spec === true &&
        length === 50;
        if(!defaultOptions){
            const customPassword=genService.genUserPsw(length,upper,lower,num,spec)
            setText(customPassword)
            onGen(customPassword)
        }else{
        const defaultPassword = genService.getDefault();
        setText(defaultPassword)
        onGen(defaultPassword)
        }

};

    return(
        <>
        
        {/* TextArea where user can type or generate password */}
        <div className="textareaDiv">
        <label htmlFor="textInput">
            Password
        </label>
        <textarea 
        id='textInput'
        rows={10}
        cols={100}
        value={text}
        onChange={onTextareaChange}
        ></textarea>
        </div>



        {/* CheckBoxes to Speicify Password*/}
        <div className="checkboxContainer">

            <div className="checkboxDiv" >
                
                <label htmlFor="uppercase">
                    Uppercase
                </label>

                <input
                id='uppercase'
                type='checkbox'
                checked={upper}
                onChange={()=>{onCheckboxChange(upper,isUpper)}}
                ></input>
            </div>

             <div className="checkboxDiv" >
                 <label htmlFor="lowercase">
                    Lowercase
                </label>

                <input
                id='lowercase'
                type='checkbox'
                checked={lower}
                onChange={()=>{onCheckboxChange(lower,isLower)}}
                //checked or onchange??
                ></input>          
            </div>

            <div className="checkboxDiv" >
                 <label htmlFor="numbers">
                    Numbers
                </label>

                <input
                id='numbers'
                type='checkbox'
                checked={num}
                onChange={()=>{onCheckboxChange(num,isNum)}}
                ></input>      
            </div>

            <div className="checkboxDiv">
                 <label htmlFor="specialCharacters">
                    Special Characters
                </label>

                <input
                 id='specialCharacters'
                type='checkbox'
                checked={spec}
                onChange={()=>{onCheckboxChange(spec,isSpec)}}
                ></input>         
            </div>


        </div>
        
        {/* Range for Length */}
        <div className="rangeDiv">
            <label htmlFor="pwdLength">
                Length : {length}
            </label>
            <input
            id='pwdLength'
            type='range'
            min={0}
            max={200}
            value={length}
            onChange={onRangeChange}
            ></input>
        </div>

        {/* Button To Generate */}
            <button onClick={onGenClick}>Generate Password</button>


        
    </>
    )
}

export default GenPassword