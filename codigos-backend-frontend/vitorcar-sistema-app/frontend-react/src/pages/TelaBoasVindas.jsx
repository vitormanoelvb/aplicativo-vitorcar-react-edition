import { useEffect } from "react";

export default function TelaBoasVindas({ irParaInicio }) {
  useEffect(() => {
    document.title = "VitorCar | Boas-vindas";

    const navBotoes = document.querySelector("header .inline-flex");
    const displayOriginal = navBotoes ? navBotoes.style.display : null;

    if (navBotoes) {
      navBotoes.style.display = "none";
    }

    return () => {
      if (navBotoes) {
        if (displayOriginal !== null) {
          navBotoes.style.display = displayOriginal;
        } else {
          navBotoes.style.removeProperty("display");
        }
      }
    };
  }, []);

  return (
    <main className="flex-1 bg-slate-900 text-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
       
        <div className="flex-1 space-y-5">
          <p className="text-xs md:text-sm tracking-[0.25em] text-slate-400 uppercase">
            Seja bem-vindo
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Gestão de veículos e manutenções{" "}
            <span className="block">em um só lugar</span>
          </h1>

          <p className="text-slate-300 max-w-xl text-sm md:text-base">
            O VitorCar foi pensado para oficinas, frotistas e gestores que
            precisam de organização, histórico e segurança nas informações do
            dia a dia.
          </p>

          <p className="text-slate-400 max-w-xl text-sm md:text-base">
            Cadastre veículos, acompanhe manutenções, controle custos e tenha
            uma visão clara de tudo o que acontece com a sua frota, de qualquer
            lugar.
          </p>

          <p className="text-slate-400 max-w-xl text-sm md:text-base">
            O sistema foi desenvolvido como um aplicativo web moderno, usando
            <span className="font-semibold">
              {" "}
              React, Tailwind e boas práticas de UI
            </span>
            , integrados a uma API própria. Isso garante uma base sólida para
            evoluir o projeto, adicionar novos módulos e transformar o VitorCar
            em uma solução completa para gestão de veículos.
          </p>

          <ul className="text-slate-300 max-w-xl text-sm md:text-base list-disc list-inside space-y-1">
            <li>Cadastro centralizado de veículos e proprietários.</li>
            <li>Histórico detalhado de serviços e manutenções realizadas.</li>
            <li>Painel inicial com visão geral da frota e dos serviços ativos.</li>
            <li>Área de créditos destacando o autor e a parceria com a VM Systems.</li>
          </ul>

          <button
            type="button"
            onClick={irParaInicio}
            className="
              mt-4 inline-flex items-center gap-2
              rounded-full
              px-8 py-3
              bg-blue-600 hover:bg-blue-500
              text-sm md:text-base font-semibold
              shadow-[0_0_35px_rgba(37,99,235,0.8)]
              transition
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900
            "
          >
            <span className="inline-block text-xs md:text-sm">▶</span>
            Iniciar aplicativo
          </button>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <div
            className="
              rounded-[3rem]
              bg-gradient-to-br from-amber-900 via-slate-900 to-sky-900
              shadow-[0_35px_80px_rgba(0,0,0,0.9)]
              overflow-hidden
              w-full max-w-xl
            "
          >
            <img
              src="/imagens/boas-vindas-vitorcar.png"
              alt="Profissional utilizando o sistema VitorCar na oficina"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
