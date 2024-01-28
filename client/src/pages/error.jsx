import { useRouteError } from "react-router-dom";
function ErrorPage(){
const error = useRouteError();
console.error(error);
    return (
        <>
        <h1>Where the error page will be</h1>
          <p>
        <i>{error.statusText || error.message}</i>
      </p>
        </>
    )
}

export default ErrorPage