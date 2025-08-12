// src/hooks/useLoginForm.ts
import { useState } from "react";
import { type ZodIssue, type ZodTypeAny } from "zod";

type ValidationState = {
  [key: string]: {
    success: boolean;
    errors: ZodIssue[];
  };
};

type FormData = {
  [key: string]: string;
};

function getInitialState(keys: (keyof FormData)[]): ValidationState {
  const initialState: ValidationState = {};
  keys.forEach((key) => {
    initialState[key] = { success: false, errors: [] };
  });
  return initialState;
}

export function useForm({
  initialValues,
  schema,
}: {
  initialValues: FormData;
  schema: ZodTypeAny;
}) {
  const [formData, setFormData] = useState<FormData>(initialValues);
  const [state, setState] = useState<ValidationState>(
    getInitialState(Object.keys(formData))
  );
  const [loading, setLoading] = useState<boolean>(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getHelperText = (field: string) => {
    return state[field].errors.length ? state[field].errors[0].message : null;
  };

  const getInputState = (field: string) => {
    return state[field].success
      ? "success"
      : state[field].errors.length
      ? "error"
      : "normal";
  };

  const validateField = (field: keyof ValidationState, value: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fieldResult = schema.shape[field].safeParse(value);
    if (!fieldResult.success) {
      setState({
        ...state,
        [field]: { success: false, errors: fieldResult.error.issues },
      });
    } else {
      setState({ ...state, [field]: { success: true, errors: [] } });
    }
  };

  return {
    formData,
    state,
    loading,
    updateField,
    validateField,
    setLoading,
    getHelperText,
    getInputState,
  };
}
