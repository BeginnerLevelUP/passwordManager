import genService from '../../../utils/genPassword'
function PasswordStatus({userResults}){
const userTest=genService.testUser(userResults);
const strength=genService.strength(userTest)
return(
    <div className='strength'>
        <h3>Strength : {strength.statusMessage}</h3>
        <div>
            <ul>
                <li>{strength.statusHint[0]}</li>
                <li>{strength.statusHint[1]}</li>
            </ul>
        </div>
    </div>
)
}

export default PasswordStatus