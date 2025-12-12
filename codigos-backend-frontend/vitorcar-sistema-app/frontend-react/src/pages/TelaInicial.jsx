import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { veiculoService, manutencaoService } from "../services/vitorcarApi";

export default function TelaInicial({
  irParaVeiculos,
  irParaManutencoes,
  irParaCreditos,
}) {
  const [veiculosPainel, setVeiculosPainel] = useState([]);
  const [manutencoesPainel, setManutencoesPainel] = useState([]);

  useEffect(() => {
    document.title = "VitorCar | Inicio";
  }, []);

  useEffect(() => {
    const carregarResumo = async () => {
      try {
        const [listaVeiculos, listaManutencoes] = await Promise.all([
          veiculoService.listar(),
          manutencaoService.listar(),
        ]);

        setVeiculosPainel(listaVeiculos || []);
        setManutencoesPainel(listaManutencoes || []);
      } catch (erro) {
        console.error("Erro ao carregar dados do painel inicial:", erro);
      }
    };

    carregarResumo();
  }, []);

  const gerarRelatorioTxt = () => {
    try {
      const linhas = []; 

      linhas.push("========================================");
      linhas.push(" RELATÓRIO GERAL - VitorCar");
      linhas.push("========================================");
      linhas.push("");
      linhas.push("VEÍCULOS CADASTRADOS NO SISTEMA");
      linhas.push("ID\tMODELO\tPLACA\tPROPRIETÁRIO");

      if (veiculosPainel.length === 0) {
        linhas.push("NENHUM VEÍCULO CADASTRADO.");
      } else {
        veiculosPainel.forEach((v) => {
          const linha = `${v.id_veiculo ?? ""}\t${v.modelo ?? ""}\t${
            v.placa ?? ""
          }\t${v.proprietario || v.dono || ""}`;
          linhas.push(linha);
        });
      }

      linhas.push("");
      linhas.push("----------------------------------------");
      linhas.push("MANUTENÇÕES REGISTRADAS");
      linhas.push("ID\tVEÍCULO\tSERVIÇO\tSTATUS");

      if (manutencoesPainel.length === 0) {
        linhas.push("NENHUMA MANUTENÇÃO REGISTRADA.");
      } else {
        manutencoesPainel.forEach((m) => {
          const linha = `${m.id_manutencao ?? ""}\t${
            m.id_veiculo ?? m.veiculo ?? ""
          }\t${
            m.tipo_servico ?? m.servico ?? m.tipo ?? m.descricao ?? ""
          }\t${m.status ?? "Registrada"}`;
          linhas.push(linha);
        });
      }

      const conteudo = linhas.join("\r\n");
      const blob = new Blob([conteudo], {
        type: "text/plain;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const hoje = new Date().toISOString().slice(0, 10);

      link.href = url;
      link.download = `relatorio_vitorcar_${hoje}.txt`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (erro) {
      console.error("Erro ao gerar relatório TXT:", erro);
      alert("Não foi possível gerar o relatório em TXT.");
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center px-4 py-10 bg-slate-900 text-slate-50">
      <section className="mb-8">
        <div
          className="
            max-w-md mx-auto
            rounded-[3rem]
            bg-gradient-to-r from-amber-900 via-slate-900 to-sky-900
            border border-slate-800/80
            shadow-[0_28px_70px_rgba(0,0,0,0.9)]
            px-4 py-3
            flex items-center justify-center
          "
        >
          <img
            src="/imagens/LetreiroVitorCar.png"
            alt="Letreiro VitorCar – Sistema de Controle de Veículos e Manutenções"
            className="w-[210px] md:w-[340px] max-w-full object-contain"
          />
        </div>
      </section>

      <div className="text-center mb-10 w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Bem-vindo ao <span className="text-vitorcarYellow">VitorCar</span>
        </h1>

        <div className="max-w-3xl mx-auto border-y border-slate-700 py-3">
          <p className="text-sm md:text-base text-slate-300 whitespace-nowrap">
            Escolha uma função abaixo para gerenciar{" "}
            <span className="font-semibold">veículos</span>,{" "}
            <span className="font-semibold">manutenções</span> ou visualizar
            informações gerais do sistema.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <button
          type="button"
          onClick={irParaVeiculos}
          className="relative group bg-gradient-to-br from-blue-700 to-blue-900 p-10 rounded-3xl flex flex-col items-center shadow-lg hover:scale-105 hover:shadow-2xl transition transform focus:outline-none overflow-hidden"
        >
          <span className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 transition duration-300" />

          <div className="w-20 h-20 mb-5 flex items-center justify-center">
            <i
              className="bi bi-car-front-fill text-6xl text-white"
              aria-hidden="true"
            ></i>
          </div>
          <h2 className="text-xl font-semibold mb-2">Veículos</h2>
          <p className="text-slate-200 text-center text-sm">
            Gerencie modelos, placas e proprietários.
          </p>
        </button>

        <button
          type="button"
          onClick={irParaManutencoes}
          className="relative group bg-gradient-to-br from-blue-700 to-blue-900 p-10 rounded-3xl flex flex-col items-center shadow-lg hover:scale-105 hover:shadow-2xl transition transform focus:outline-none overflow-hidden"
        >
          <span className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 transition duration-300" />

          <div className="w-20 h-20 mb-5 flex items-center justify-center">
            <i
              className="bi bi-wrench-adjustable-circle text-6xl text-white"
              aria-hidden="true"
            ></i>
          </div>
          <h2 className="text-xl font-semibold mb-2">Manutenções</h2>
          <p className="text-slate-200 text-center text-sm">
            Acompanhe serviços, custos e histórico dos veículos.
          </p>
        </button>

        <button
          type="button"
          onClick={irParaCreditos}
          className="relative group bg-gradient-to-br from-blue-700 to-blue-900 p-10 rounded-3xl flex flex-col items-center shadow-lg hover:scale-105 hover:shadow-2xl transition transform focus:outline-none overflow-hidden"
        >
          <span className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 transition duration-300" />

          <div className="w-20 h-20 mb-5 flex items-center justify-center">
            <i
              className="bi bi-person-badge-fill text-6xl text-white"
              aria-hidden="true"
            ></i>
          </div>
          <h2 className="text-xl font-semibold mb-2">Créditos</h2>
          <p className="text-slate-200 text-center text-sm mb-2">
            Conheça o VitorCar, suas funções e o autor do projeto.
          </p>
          <span className="text-[11px] text-slate-300 italic"></span>
        </button>
      </div>

      <section className="w-full max-w-5xl mt-12">
        <div className="flex justify-center mb-8">
          <div className="px-10 py-3 rounded-full bg-slate-600 text-white border border-slate-200/80 shadow-[0_18px_40px_rgba(0,0,0,0.6)]">
            <h2 className="text-lg md:text-xl font-semibold text-center">
              Visão geral de veículos e manutenções
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="rounded-3xl bg-slate-600 shadow-[0_22px_50px_rgba(0,0,0,0.85)] p-[2px]">
            <div className="rounded-[1.6rem] bg-white p-[2px]">
              <div className="rounded-[1.4rem] overflow-hidden bg-slate-950/95">
                <div className="bg-[#4f46e5] px-6 py-3 text-center">
                  <h3 className="text-sm md:text-base font-semibold text-slate-50">
                    Veículos cadastrados no sistema
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-900">
                      <tr>
                        <th className="px-4 py-2 text-left border-b border-slate-800 text-slate-100 text-xs font-semibold uppercase tracking-wide">
                          ID
                        </th>
                        <th className="px-4 py-2 text-left border-b border-slate-800 text-slate-100 text-xs font-semibold uppercase tracking-wide">
                          Modelo
                        </th>
                        <th className="px-4 py-2 text-left border-b border-slate-800 text-slate-100 text-xs font-semibold uppercase tracking-wide">
                          Placa
                        </th>
                        <th className="px-4 py-2 text-left border-b border-slate-800 text-slate-100 text-xs font-semibold uppercase tracking-wide">
                          Proprietário
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {veiculosPainel.length === 0 ? (
                        <tr className="bg-slate-950">
                          <td
                            colSpan={4}
                            className="px-4 py-5 text-center text-slate-500 italic"
                          >
                            Nenhum veículo cadastrado disponível para exibição
                            no painel inicial.
                          </td>
                        </tr>
                      ) : (
                        veiculosPainel.slice(0, 5).map((v) => (
                          <tr
                            key={v.id_veiculo}
                            className="bg-slate-950 odd:bg-slate-950 even:bg-slate-900"
                          >
                            <td className="px-4 py-2 border-b border-slate-800 text-slate-100">
                              {v.id_veiculo}
                            </td>
                            <td className="px-4 py-2 border-b border-slate-800 text-slate-100">
                              {v.modelo}
                            </td>
                            <td className="px-4 py-2 border-b border-slate-800 text-slate-100">
                              {v.placa}
                            </td>
                            <td className="px-4 py-2 border-b border-slate-800 text-slate-100">
                              {v.proprietario || v.dono || "—"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-600 shadow-[0_22px_50px_rgba(0,0,0,0.85)] p-[2px]">
            <div className="rounded-[1.6rem] bg-white p-[2px]">
              <div className="rounded-[1.4rem] overflow-hidden bg-slate-950/95">
                <div className="bg-[#4f46e5] px-6 py-3 text-center">
                  <h3 className="text-sm md:text-base font-semibold text-slate-50">
                    Veículos em manutenção / serviços ativos
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-900">
                      <tr>
                        <th className="px-4 py-2 text-left border-b border-slate-800 text-slate-100 text-xs font-semibold uppercase tracking-wide">
                          ID
                        </th>
                        <th className="px-4 py-2 text-left border-b border-slate-800 text-slate-100 text-xs font-semibold uppercase tracking-wide">
                          Veículo
                        </th>
                        <th className="px-4 py-2 text-left border-b border-slate-800 text-slate-100 text-xs font-semibold uppercase tracking-wide">
                          Serviço
                        </th>
                        <th className="px-4 py-2 text-left border-b border-slate-800 text-slate-100 text-xs font-semibold uppercase tracking-wide">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {manutencoesPainel.length === 0 ? (
                        <tr className="bg-slate-950">
                          <td
                            colSpan={4}
                            className="px-4 py-5 text-center text-slate-500 italic"
                          >
                            Nenhuma manutenção em andamento no momento.
                          </td>
                        </tr>
                      ) : (
                        manutencoesPainel.slice(0, 5).map((m) => (
                          <tr
                            key={m.id_manutencao}
                            className="bg-slate-950 odd:bg-slate-950 even:bg-slate-900"
                          >
                            <td className="px-4 py-2 border-b border-slate-800 text-slate-100">
                              {m.id_manutencao}
                            </td>
                            <td className="px-4 py-2 border-b border-slate-800 text-slate-100">
                              {m.id_veiculo ?? m.veiculo ?? ""}
                            </td>
                            <td className="px-4 py-2 border-b border-slate-800 text-slate-100">
                              {m.tipo_servico ??
                                m.servico ??
                                m.tipo ??
                                m.descricao ??
                                ""}
                            </td>
                            <td className="px-4 py-2 border-b border-slate-800 text-slate-100">
                              {m.status ?? "Registrada"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={gerarRelatorioTxt}
            className="
              relative group
              inline-flex items-center justify-center
              px-10 py-3
              rounded-full
              bg-gradient-to-r from-slate-700 via-slate-900 to-purple-700
              text-slate-50 text-sm md:text-base font-semibold
              border border-purple-400/70
              shadow-[0_18px_40px_rgba(0,0,0,0.7)]
              overflow-hidden
              transition
              hover:scale-[1.02] hover:shadow-[0_22px_50px_rgba(0,0,0,0.9)]
              focus:outline-none
              active:opacity-70
            "
          >
            <span
              className="
                pointer-events-none absolute inset-0
                bg-white/10
                opacity-0
                group-hover:opacity-100
                transition duration-300
              "
            />
            <span className="relative flex items-center gap-2">
              <i className="bi bi-file-earmark-text text-lg" />
              <span>Gerar relatório em TXT</span>
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
