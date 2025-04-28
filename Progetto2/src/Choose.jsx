import { useNavigate } from "react-router-dom";
export default function Choose() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleRegister() {
    navigate("/register");
  }

  return (
    <>
      <div className="login">
        <div className="login-card">
          <button className="normal-signin" onClick={handleLogin}>
            Login
          </button>
          <div className="instruction-text">Non sei registrato?</div>
          <button className="create-account" onClick={handleRegister}>
            Crea un Account
          </button>
          <a
            style={{
              fontSize: 20,
              marginTop: 20,
              marginBottom: 20,
              color: "#9d0a0e",
            }}
            href="/"
          >
            Ritorna alla Home
          </a>
        </div>
      </div>
    </>
  );
}
