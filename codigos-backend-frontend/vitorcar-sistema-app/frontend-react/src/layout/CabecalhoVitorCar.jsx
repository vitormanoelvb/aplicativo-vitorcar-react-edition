import { useEffect, useState } from "react";

export default function CabecalhoVitorCar({ abaAtual, aoTrocarAba }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const botaoClasse = (aba) =>
    `px-3 py-1 rounded-lg text-xs md:text-sm font-medium transition ${
      abaAtual === aba
        ? "bg-slate-100 text-slate-900 font-semibold"
        : "text-slate-300 hover:text-white"
    }`;

  const logoClicavel = abaAtual !== "boasvindas";

  return (
    <header
      className={`
        sticky top-0 z-40
        border-b border-slate-800
        backdrop-blur
        transition-all duration-300
        ${isScrolled ? "bg-slate-950/95 shadow-md" : "bg-slate-950/80"}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {logoClicavel ? (
            <button
              type="button"
              onClick={() => aoTrocarAba("inicio")}
              className="focus:outline-none"
            >
              <img
                src="/imagens/logo-vitorcar.png"
                alt="Logo VitorCar"
                className="w-10 h-10 rounded-xl shadow-lg object-cover"
              />
            </button>
          ) : (
            <img
              src="/imagens/logo-vitorcar.png"
              alt="Logo VitorCar"
              className="w-10 h-10 rounded-xl shadow-lg object-cover"
            />
          )}

          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight">
              VitorCar • Sistema de Veículos e Manutenções
            </h1>
            <p className="text-[11px] md:text-xs text-slate-400">
              Gerenciamento completo de veículos e serviços de manutenção.
            </p>
          </div>
        </div>

        {(abaAtual === "inicio" || abaAtual === "sobre") && (
          <div className="inline-flex rounded-xl bg-slate-900 border border-slate-700 p-1 text-xs md:text-sm">
            <button
              type="button"
              className={botaoClasse("inicio")}
              onClick={() => aoTrocarAba("inicio")}
            >
              Início
            </button>

            <button
              type="button"
              className={botaoClasse("sobre")}
              onClick={() => aoTrocarAba("sobre")}
            >
              Sobre nós
            </button>
          </div>
        )}
      </div>

      <div className="h-[2px] w-full bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500" />
    </header>
  );
}
