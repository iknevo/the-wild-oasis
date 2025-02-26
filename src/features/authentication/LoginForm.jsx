import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import SpinnerMini from "./../../ui/SpinnerMini.jsx";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShow] = useState(false);
  const { login, isLogingIn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  function handleShowPassword(e) {
    e.preventDefault();
    setPasswordShow((shown) => !shown);
  }
  function handleGuestValues(e) {
    e.preventDefault();
    setEmail("nevo@example.com");
    setPassword("11111111");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          disabled={isLogingIn}
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <div>
        <FormRowVertical label="Password">
          <Input
            disabled={isLogingIn}
            type={passwordShown ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRowVertical>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button size="small" onClick={handleGuestValues}>
            use guest
          </Button>
          <Button size="small" onClick={handleShowPassword}>
            show password
          </Button>
        </div>
      </div>
      <FormRowVertical>
        <Button type="submit" size="large" disabled={isLogingIn}>
          {!isLogingIn ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
