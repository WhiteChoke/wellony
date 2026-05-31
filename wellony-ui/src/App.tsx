import SubmitButton from "./components/submitButton/SubmitButton";
import "./styles/App.css";

function App() {
  return (
    <>
      <form className="auth-form">
        <div className="input-field">
            <label htmlFor="email">your email</label>
            <input name="email" placeholder="email" type="email" />
        </div>
        <div className="input-field">
            <label htmlFor="password">your password</label>
            <input name="password" placeholder="password" type="password" />
        </div>
        <SubmitButton onClick={() => console.log("btn")} text="Sign In"/>
      </form>
    </>
  );
}

export default App;
