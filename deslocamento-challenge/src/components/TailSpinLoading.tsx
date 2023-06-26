import { useGlobalContext } from "../hooks/useGlobalContext";
import { TailSpin } from "react-loader-spinner";

export default function TailSpinLoading() {
  const { loading } = useGlobalContext();
  return (
    <TailSpin
      height="80"
      width="80"
      color="#556CD6"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{ justifyContent: "center", marginTop: "20px" }}
      wrapperClass=""
      visible={loading}
    />
  );
}
