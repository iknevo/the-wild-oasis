import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "./../../ui/SpinnerMini.jsx";

function LoginForm() {
  const [email, setEmail] = useState("nevo@example.com");
  const [password, setPassword] = useState("1234pass");
  const [passwordShown, setPasswordShow] = useState(false);
  const { login, isLogingIn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }

  function handleShowPassword(e) {
    e.preventDefault();
    setPasswordShow((shown) => !shown);
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
        <Button size="small" onClick={handleShowPassword}>
          show
        </Button>
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
