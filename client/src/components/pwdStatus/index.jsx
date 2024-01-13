import genService from '../../../utils/genPassword'
function PasswordStatus({userResults}){
    const userStatus=genService.strength(userResults)
    console.log(userStatus)
return(
    <div>
        <h3>Strength</h3>
        <div>
            {/* good */}
            <h4>Have</h4>

        </div>

        <div>
            {/* bad */}
            <h4>Missing</h4>
        </div>
    </div>
)
}

export default PasswordStatus