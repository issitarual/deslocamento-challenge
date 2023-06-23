import { DISPLACEMENT } from "@/helpers/contants";
import InputField from "./InputField";
import { Dispatch, SetStateAction } from "react";

export default function DisplacementForRider({
  checkList,
  setCheckList,
  motivo,
  setMotivo,
  observacao,
  setObservacao,
}: {
  checkList: string;
  setCheckList: Dispatch<SetStateAction<string>>;
  motivo: string;
  setMotivo: Dispatch<SetStateAction<string>>;
  observacao: string;
  setObservacao: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <InputField
        name={DISPLACEMENT.CHECKLIST}
        value={checkList}
        handleChange={setCheckList}
      />
      <InputField
        name={DISPLACEMENT.REASON}
        value={motivo}
        handleChange={setMotivo}
      />
      <InputField
        name={DISPLACEMENT.OBSERVATION}
        value={observacao}
        handleChange={setObservacao}
      />
    </>
  );
}
