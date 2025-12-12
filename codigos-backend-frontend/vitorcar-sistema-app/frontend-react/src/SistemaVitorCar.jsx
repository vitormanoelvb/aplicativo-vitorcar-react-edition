import { useState, useEffect } from "react";
import CabecalhoVitorCar from "./layout/CabecalhoVitorCar";
import RodapeVitorCar from "./layout/RodapeVitorCar";
import TelaInicial from "./pages/TelaInicial";
import TelaVeiculos from "./pages/TelaVeiculos";
import TelaManutencoes from "./pages/TelaManutencoes";
import TelaCreditos from "./pages/TelaCreditos";
import TelaSobreVitorCar from "./pages/TelaSobreVitorCar";
import TelaBoasVindas from "./pages/TelaBoasVindas";

export default function SistemaVitorCar() {

  const [abaAtual, setAbaAtual] = useState(() => {
  try {
    const jaViu = sessionStorage.getItem("jaViuBoasVindas");
    const abaSalva = sessionStorage.getItem("abaAtual");

    if (!jaViu) {
      sessionStorage.setItem("jaViuBoasVindas", "true");
      sessionStorage.setItem("abaAtual", "boasvindas");
      return "boasvindas";
    }

    return abaSalva || "inicio";
  } catch {

    return "boasvindas";
  }
});

useEffect(() => {
  try {
    sessionStorage.setItem("abaAtual", abaAtual);
  } catch {
    // ignora erro ao salvar no sessionStorage
  }
}, [abaAtual]);



  const irParaInicio = () => setAbaAtual("inicio");
  const irParaVeiculos = () => setAbaAtual("veiculos");
  const irParaManutencoes = () => setAbaAtual("manutencoes");
  const irParaCreditos = () => setAbaAtual("creditos");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col">
      <CabecalhoVitorCar abaAtual={abaAtual} aoTrocarAba={setAbaAtual} />

      <div className="flex-1">
        {abaAtual === "boasvindas" && (
          <TelaBoasVindas irParaInicio={irParaInicio} />
        )}

        {abaAtual === "inicio" && (
          <TelaInicial
            irParaVeiculos={irParaVeiculos}
            irParaManutencoes={irParaManutencoes}
            irParaCreditos={irParaCreditos}
          />
        )}

        {abaAtual === "veiculos" && (
          <TelaVeiculos voltarParaInicio={irParaInicio} />
        )}

        {abaAtual === "manutencoes" && (
          <TelaManutencoes voltarParaInicio={irParaInicio} />
        )}

        {abaAtual === "creditos" && (
          <TelaCreditos voltarParaInicio={irParaInicio} />
        )}

        {abaAtual === "sobre" && (
          <TelaSobreVitorCar irParaInicio={irParaInicio} />
        )}
      </div>

      <RodapeVitorCar />
    </div>
  );
}
