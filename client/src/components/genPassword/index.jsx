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
    const [range,setRange]=useState(false)
    
    //State for Textarea
    const [text,setText]=useState('')

    // Getting The variables needed 
    const customPassword=genService.genUserPsw(length,upper,lower,num,spec,0)
    const defaultPassword = genService.getDefault();

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
        onGen(target.value) 

        if(target.value!==customPassword || target.value!==defaultPassword){
            setRange(false)
          const userResults=  genService.testUser(target.value)
          isUpper(userResults.upper)
          isLower(userResults.lower)
          isSpec(userResults.spec)
          isNum(userResults.num)
          setLength(target.value.length)
          
          if(!target.value){
            window.location.reload()
          }
    }
  }
    const onTextAreaClick=()=>{
        setText('')
    }



const onGenClick = () => {
    setRange(true)
      const defaultOptions =
        upper === true &&
        lower === true &&
        num === true &&
        spec === true &&
        length === 50;
        if(!defaultOptions){
            setText(customPassword)
            onGen(customPassword)
            console.log(customPassword)
        }else{
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
        onClick={onTextAreaClick}
        placeholder={`
        Click Generate Button to get a password based on the cretiera below
                                     Orr
        Type your password and have the validity checked 
        `}
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

  { /* Range for Length */ }
{range ? (
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
) : (
  <div className="rangeDiv">
    <label htmlFor="pwdLength">
      Length : {length}
    </label>
  </div>
)}



        {/* Button To Generate */}
            <button onClick={onGenClick}>Generate Password</button>


        
    </>
    )
}

export default GenPassword