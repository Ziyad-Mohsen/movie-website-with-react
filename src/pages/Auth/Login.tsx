import { GrFormView, GrFormViewHide } from "react-icons/gr";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { LoginSchema } from "../../lib/zod";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

function Login() {
  const { formData, updateField, validateField, getHelperText, getInputState } =
    useForm({
      initialValues: { email: "", password: "" },
      schema: LoginSchema,
    });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form noValidate className="flex flex-col gap-5">
      <Input
        value={formData.email}
        id="email"
        label="Email"
        type="email"
        helperText={getHelperText("email")}
        icon={
          formData.email ? (
            <BiX onClick={() => updateField("email", "")} />
          ) : null
        }
        state={getInputState("email")}
        onChange={(e) => updateField("email", e.target.value)}
        onBlur={(e) => validateField("email", e.target.value)}
      />
      <Input
        value={formData.password}
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        helperText={getHelperText("password")}
        state={getInputState("password")}
        icon={
          showPassword ? (
            <GrFormView onClick={() => setShowPassword(false)} />
          ) : (
            <GrFormViewHide onClick={() => setShowPassword(true)} />
          )
        }
        onChange={(e) => {
          updateField("password", e.target.value);
        }}
        onBlur={(e) => validateField("password", e.target.value)}
      />
      <Link
        to="#"
        className="text-sm text-center hover:text-primary underline transition-colors duration-200"
      >
        Forgot password?
      </Link>
      <Button type="submit" color="primary" className="rounded-lg">
        Login
      </Button>
    </form>
  );
}

export default Login;
