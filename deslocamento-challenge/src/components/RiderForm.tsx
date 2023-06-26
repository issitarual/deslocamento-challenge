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
        name={DOCUMENT.CPF}
        type="number"
        value={numeroDocumento}
        handleChange={setNumeroDocumento}
      />
      <InputField
        name={RIDER.ADDRESS}
        value={logradouro}
        handleChange={setLogradouro}
      />
      <InputField name={RIDER.NUMBER} value={numero} handleChange={setNumero} />
      <InputField
        name={RIDER.DISTRICT}
        value={bairro}
        handleChange={setBairro}
      />
      <InputField
        name={RIDER.CITY}
        value={cidade}
        handleChange={setCidade}
      />
      <InputField name={RIDER.STATE} value={uf} handleChange={setUF} />
    </>
  );
}
