import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function InputField({
  type = "string",
  label,
  value,
  handleChange,
}: {
  type?: string;
  label: string;
  value: string | number;
  handleChange: Dispatch<SetStateAction<string>>;
}) {
  const { loading } = useGlobalContext();

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={label}
      label={label}
      type={type}
      id={label}
      autoComplete={label}
      disabled={loading}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
