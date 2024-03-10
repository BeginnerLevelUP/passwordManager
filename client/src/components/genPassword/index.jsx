import { useState } from "react"
import genService from "../../../utils/genPassword"
import Dropdown from 'react-bootstrap/Dropdown';
function GenPassword({onGen,forSignUp}){
    

    // States for the Checkboxes
    const [upper,isUpper]=useState(true)
    const [lower,isLower]=useState(true)
    const [num,isNum]=useState(true)
    const [spec,isSpec]=useState(true)
    
    // State for Range
    const [length,setLength]=useState(8)
    const [range,setRange]=useState(true)
    
    //State for Textarea
    const [text,setText]=useState('')

    // Getting The variables needed 
    const customPassword=genService.genUserPsw(length,lower,upper,num,spec,0)
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
        }else{
        setText(defaultPassword)
        onGen(defaultPassword)

        }

};

  return (
    <>
      {!forSignUp ? (
        <>
        <div className="flex-container">
          {/* TextArea where user can type or generate password */}
          <div className="textareaDiv">
            <textarea
              id="textInput"
              rows={10}
              cols={100}
              value={text}
              onChange={onTextareaChange}
              onClick={onTextAreaClick}
            ></textarea>
          </div>

          <div className="specifications">
            <h3>Specifications</h3>
          {/* Range for Length */}
          {range ? (
            <div className="rangeDiv">
              <label htmlFor="pwdLength">Length : {length}</label>
              <input
                id="pwdLength"
                type="range"
                min={8}
                max={200}
                value={length}
                onChange={onRangeChange}
              ></input>
            </div>
          ) : (
            <div className="rangeDiv">
              <label htmlFor="pwdLength">Length : {length}</label>
            </div>
          )}
          {/* CheckBoxes to Specify Password */}
          <div className="checkboxContainer">
            <div className="checkboxDiv">
                <div className="checkBox">
         <label htmlFor="uppercase">Uppercase</label>
                  <input 
                  className="sc-gJwTLC ikxBAC"
                  id="uppercase"
                  type="checkbox"
                  checked={upper}
                  onChange={() => {
                  onCheckboxChange(upper, isUpper);
                }}
                  ></input>
                  </div>
            </div>

            <div className="checkboxDiv">
              <div  className="checkBox">
              <label htmlFor="lowercase">Lowercase</label>
              <input
                className="sc-gJwTLC ikxBAC"
                id="lowercase"
                type="checkbox"
                checked={lower}
                onChange={() => {
                  onCheckboxChange(lower, isLower);
                }}
              ></input>
              </div>

            </div>

            <div className="checkboxDiv">
              <div className="checkBox">
              <label htmlFor="numbers">Numbers</label>
              <input
                className="sc-gJwTLC ikxBAC"
                id="numbers"
                type="checkbox"
                checked={num}
                onChange={() => {
                  onCheckboxChange(num, isNum);
                }}
              ></input>
              </div>
            </div>

            <div className="checkboxDiv">
            <div className="checkBox">
              <label htmlFor="specialCharacters">Special Characters</label>
              <input
                className="sc-gJwTLC ikxBAC"
                id="specialCharacters"
                type="checkbox"
                checked={spec}
                onChange={() => {
                  onCheckboxChange(spec, isSpec);
                }}
              ></input>
              </div>

            </div>
          </div>

          </div>

        </div>
          {/* Button To Generate */}
          <button onClick={onGenClick}>Generate Password</button>
        </>
      ) : (
<>
<Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       Generate Your Password With Us
      </Dropdown.Toggle>

      <Dropdown.Menu>
   <div className="checkboxContainer">
            <div className="checkboxDiv">
              <label htmlFor="uppercase">Uppercase</label>
              <input
                id="uppercase"
                type="checkbox"
                className="checkbox"
                checked={upper}
                onChange={() => {
                  onCheckboxChange(upper, isUpper);
                }}
              ></input>
            </div>

            <div className="checkboxDiv">
              <label htmlFor="lowercase">Lowercase</label>
              <input
                id="lowercase"
                type="checkbox"
                checked={lower}
                onChange={() => {
                  onCheckboxChange(lower, isLower);
                }}
              ></input>
            </div>

            <div className="checkboxDiv">
              <label htmlFor="numbers">Numbers</label>
              <input
                id="numbers"
                type="checkbox"
                checked={num}
                onChange={() => {
                  onCheckboxChange(num, isNum);
                }}
              ></input>
            </div>

            <div className="checkboxDiv">
              <label htmlFor="specialCharacters">Special Characters</label>
              <input
                id="specialCharacters"
                type="checkbox"
                checked={spec}
                onChange={() => {
                  onCheckboxChange(spec, isSpec);
                }}
              ></input>
            </div>
          </div>
          
           <div className="rangeDiv">
              <label htmlFor="pwdLength">Length : {length}</label>
              <input
                id="pwdLength"
                type="range"
                min={8}
                max={200}
                value={length}
                onChange={onRangeChange}
              ></input>
            </div>
        <Dropdown.Item onClick={onGenClick} >Generate Password</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
       

</>
      )}
    </>
  );
}

export default GenPassword