import GenreList from "../components/genreList";
import AccountItem from "../components/accountItem";
import ChatItem from "../components/chat/chatItem";
import { Outlet } from "react-router-dom";
import "../App.css";

export default function Root() {
  handleCookieAuthorization();

  return (
    <div>
      <div className="bg-body-tertiary d-flex flex-column min-vh-100">
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid justify-content-end">
            <a
              href="/"
              className="text-decoration-none navbar-brand ms-3"
              style={{ color: "white" }}
            >
              <svg
                className="app-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                viewBox="0 0 25 20"
              >
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
              </svg>
              Book Shop
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end text-end"
              id="navbarSupportedContent"
            >
              <AccountItem></AccountItem>
            </div>
          </div>
        </header>
        <div className="container-fluid App">
          <div className="row flex-nowrap">
            <span
              className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary"
              style={{ width: "20%" }}
            >
              <span className="fs-5 fw-semibold d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-substack"
                  viewBox="0 0 20 15"
                >
                  <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z" />
                </svg>
                Choose your genre:
              </span>
              <div className="list-group list-group-flush">
                <GenreList />
              </div>
            </span>
            <div className="col">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <ChatItem
        isAuthenticated={localStorage.getItem("auth-token") !== null}
      ></ChatItem>
    </div>
  );
}

function handleCookieAuthorization() {
  if (localStorage.getItem("auth-token") !== null) {
    return;
  }

  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) =>
    row.startsWith(`OAUTH_AUTHENTICATED_TOKEN=`),
  );
  if (cookie === undefined) {
    return;
  }

  const server_token: string = cookie.split("=")[1];
  if (server_token === undefined) {
    return;
  }

  localStorage.setItem("auth-token", server_token);
}
