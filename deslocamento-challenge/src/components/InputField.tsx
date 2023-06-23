import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function InputField({
  type = "string",
  name,
  value,
  handleChange,
}: {
  type?: string;
  name: string;
  value: string | number;
  handleChange: Dispatch<SetStateAction<string>>;
}) {
  const { loading } = useGlobalContext();

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={name}
      label={type === "date"? null: name}
      type={type}
      id={name}
      autoComplete={name}
      disabled={loading}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
