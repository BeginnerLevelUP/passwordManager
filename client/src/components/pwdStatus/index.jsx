import genService from '../../../utils/genPassword'
function PasswordStatus({userResults}){
const userTest=genService.testUser(userResults);
const strength=genService.strength(userTest)

return(
    <div>
        <h3>Strength : {strength.status}</h3>
        <div>
            {/* good */}
            {strength && strength.strength<4?(
                <h4>Trying Icluding All Character Types</h4>
            ):(
                <h4>Great Job</h4>
            )
            }
        </div>
    </div>
)
}

export default PasswordStatus