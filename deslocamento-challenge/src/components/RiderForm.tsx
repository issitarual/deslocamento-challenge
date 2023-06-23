import { Dispatch, SetStateAction } from "react";
import InputField from "./InputField";
import { DOCUMENT, RIDER } from "@/helpers/contants";

export default function RiderForm({
  numeroDocumento,
  setNumeroDocumento,
  logradouro,
  setLogradouro,
  numero,
  setNumero,
  bairro,
  setBairro,
  cidade,
  setCidade,
  uf,
  setUF,
}: {
  logradouro: string;
  setLogradouro: Dispatch<SetStateAction<string>>;
  numero: string;
  setNumero: Dispatch<SetStateAction<string>>;
  bairro: string;
  setBairro: Dispatch<SetStateAction<string>>;
  cidade: string;
  setCidade: Dispatch<SetStateAction<string>>;
  uf: string;
  setUF: Dispatch<SetStateAction<string>>;
  numeroDocumento: string;
  setNumeroDocumento: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <InputField
        label={DOCUMENT.CPF}
        type="number"
        value={numeroDocumento}
        handleChange={setNumeroDocumento}
      />
      <InputField
        label={RIDER.ADDRESS}
        value={logradouro}
        handleChange={setLogradouro}
      />
      <InputField
        label={RIDER.NUMBER}
        value={numero}
        handleChange={setNumero}
      />
      <InputField
        label={RIDER.DISTRICT}
        value={bairro}
        handleChange={setBairro}
      />
      <InputField
        label={RIDER.DISTRICT}
        value={cidade}
        handleChange={setCidade}
      />
      <InputField label={RIDER.STATE} value={uf} handleChange={setUF} />
    </>
  );
}
