import Auth from "../../utils/auth"
function HomePage(){
    return(
        Auth.loggedIn()?(
        <>
        <h1>where the main content will go</h1>
        </>
        ):(
            <h1>Gotta Login Lil Bro</h1>
        )

    )
}

export default HomePage