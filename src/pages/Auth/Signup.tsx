import { BiX } from "react-icons/bi";
import Input from "../../components/ui/Input/Input";
import { useForm } from "../../hooks/useForm";
import { SignupSchema } from "../../lib/zod";
import { useState } from "react";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import Button from "../../components/ui/Button/Button";

function Signup() {
  const { formData, updateField, validateField, getHelperText, getInputState } =
    useForm({
      initialValues: { username: "", email: "", password: "" },
      schema: SignupSchema,
    });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form noValidate className="flex flex-col gap-5">
      <Input
        value={formData.username}
        id="username"
        label="Username"
        type="text"
        icon={
          formData.username ? (
            <BiX onClick={() => updateField("username", "")} />
          ) : null
        }
        helperText={getHelperText("username")}
        state={getInputState("username")}
        onChange={(e) => {
          updateField("username", e.target.value);
        }}
        onBlur={(e) => {
          validateField("username", e.target.value);
        }}
      />
      <Input
        value={formData.email}
        id="email"
        label="Email"
        type="email"
        icon={
          formData.email ? (
            <BiX onClick={() => updateField("email", "")} />
          ) : null
        }
        helperText={getHelperText("email")}
        state={getInputState("email")}
        onChange={(e) => {
          updateField("email", e.target.value);
        }}
        onBlur={(e) => validateField("email", e.target.value)}
      />
      <Input
        value={formData.password}
        id="password"
        label="password"
        type={showPassword ? "text" : "password"}
        icon={
          showPassword ? (
            <GrFormView onClick={() => setShowPassword(false)} />
          ) : (
            <GrFormViewHide onClick={() => setShowPassword(true)} />
          )
        }
        helperText={getHelperText("password")}
        state={getInputState("password")}
        onChange={(e) => {
          updateField("password", e.target.value);
        }}
        onBlur={(e) => {
          validateField("password", e.target.value);
        }}
      />
      <Button type="submit" color="primary" className="rounded-lg">
        Sign Up
      </Button>
    </form>
  );
}

export default Signup;
