import { useRouteError } from "react-router-dom";
import "../common.css";

export default function ErrorPage() {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div className="common-body" id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="highlight">{error.statusText}</i>
      </p>
    </div>
  );
}
