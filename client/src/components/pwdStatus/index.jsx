import genService from '../../../utils/genPassword'
function PasswordStatus({userResults}){
const userTest=genService.testUser(userResults);
console.log(userTest)
console.log(genService.strength(userTest))

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