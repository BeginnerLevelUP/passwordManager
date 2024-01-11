import Auth from "../../utils/auth"
import SavePassword from "../components/savePassword"
import GenPassword from "../components/genPassword"
function HomePage(){

const onSaveClick=()=>{

}
    return(
        <>
<GenPassword></GenPassword>

  {          !Auth.loggedIn()?(
     <button onClick={onSaveClick}>Must be logged in to Save Password</button>
    //  add some css later
            ):(
     <SavePassword></SavePassword>
            )}
       

        
    </>
    )
}

export default HomePage