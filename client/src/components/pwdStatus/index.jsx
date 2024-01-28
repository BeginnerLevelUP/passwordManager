import genService from '../../../utils/genPassword'
function PasswordStatus({userResults}){
const userTest=genService.testUser(userResults);
const strength=genService.strength(userTest)
return(
    <div>
        <h3>Strength : {strength.statusMessage}</h3>
        <div>
            <h4>Hints :</h4>
            <ul>
                <li>{strength.statusHint[0]}</li>
                <li>{strength.statusHint[1]}</li>
            </ul>
        </div>
    </div>
)
}

export default PasswordStatus