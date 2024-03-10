import genService from '../../../utils/genPassword'
function PasswordStatus({userResults}){
const userTest=genService.testUser(userResults);
 let score = 0;
  let color;

  for (const key in userTest) {
    if (userTest[key] === true) {
      score++;
    } else {
      score--;
    }
  }

  if (score === 5) {
    color = '#50C878';
  } else if (score < 4 && score > 1) {
    color = '#FF7518';
  } else {
    color = ' #DC143C';
  }
const strength=genService.strength(userTest)
return(
    <div className='strength' style={{backgroundColor:color,transition:"1s",opacity:"0.75"}}>
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