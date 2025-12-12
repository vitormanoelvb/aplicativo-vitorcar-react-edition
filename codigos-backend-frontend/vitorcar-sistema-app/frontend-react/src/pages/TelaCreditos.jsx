import { useEffect } from "react";

export default function TelaCreditos({ voltarParaInicio }) {
  useEffect(() => {
    document.title = "VitorCar | Créditos";
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="mb-2">
        <button
          type="button"
          onClick={voltarParaInicio}
          className="
            inline-flex items-center gap-2
            px-8 py-2
            rounded-full
            bg-slate-900/80
            border border-slate-600
            text-slate-50 text-sm font-semibold
            shadow-lg
            hover:bg-slate-800 hover:shadow-xl hover:-translate-y-[1px]
            transition
            focus:outline-none
          "
        >
          <span className="text-lg">←</span>
          Voltar à tela inicial
        </button>
      </div>

      <section className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-50">
          Créditos do Projeto
        </h1>
        <p className="text-xs md:text-sm text-slate-300 max-w-3xl mx-auto">
          Aplicativo Sistema{" "}
          <span className="font-semibold">VitorCar React Edition</span> – Sistema
          de Controle de Veículos e Manutenções com foco em organização,
          transparência e tecnologia acessível, desenvolvido em React +
          Tailwind CSS.
        </p>
      </section>

      <section className="bg-slate-900/90 rounded-3xl border border-slate-700 shadow-xl p-6 md:p-8">
        <header className="mb-4 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-1 text-vitorcarYellow">
            Sobre o VitorCar React Edition
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            Conheça o VitorCar, suas principais funções e o autor do projeto em
            sua nova versão React Edition.
          </p>
        </header>

        <p className="text-sm md:text-base text-slate-200 mb-4">
          O <span className="font-semibold">VitorCar</span> é um sistema de
          controle de veículos e manutenções desenvolvido para organizar
          informações de modelos, placas, proprietários e serviços realizados,
          oferecendo uma visão clara do histórico de cada veículo. Nesta edição,
          o sistema foi reimplementado utilizando{" "}
          <span className="font-semibold">React</span>,{" "}
          <span className="font-semibold">Tailwind CSS</span> e consumo da API
          criada nas etapas anteriores.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        
        <article className="bg-slate-900/90 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-700 bg-slate-950/70 flex items-center gap-2">
            <span className="text-vitorcarYellow text-lg">🪪</span>
            <h2 className="text-sm md:text-base font-semibold text-slate-50">
              Informações do Projeto
            </h2>
          </div>
          <div className="px-5 py-4 text-sm text-slate-100 space-y-3">
            <div>
              <dt className="font-semibold">Aplicativo</dt>
              <dd className="text-slate-300">
                Aplicativo Sistema{" "}
                <span className="font-semibold">VitorCar React Edition</span> –
                Sistema de Controle de Veículos e Manutenções.
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Autor</dt>
              <dd className="text-slate-300">Vitor Manoel Vidal Braz</dd>
            </div>

            <div>
              <dt className="font-semibold">Disciplina / Projeto</dt>
              <dd className="text-slate-300">
                Avaliação prática de Frontend – Aplicativo de controle de
                veículos (versão React + Tailwind).
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Objetivo</dt>
              <dd className="text-slate-300">
                Prover um aplicativo web moderno para cadastro, consulta e
                acompanhamento de veículos e suas manutenções, integrando
                backend com API REST, banco de dados relacional e interface
                responsiva construída com React.
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Arquitetura</dt>
              <dd className="text-slate-300">
                Backend com API REST organizada, banco de dados relacional para
                histórico de veículos e manutenções, e frontend em{" "}
                <span className="font-semibold">
                  React + Vite + Tailwind CSS
                </span>{" "}
                (com componentes adicionais em Semantic UI React) para as telas
                do VitorCar React Edition.
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Agradecimento especial</dt>
              <dd className="text-slate-300">
                <span className="font-semibold">VM Systems</span> – parceria
                fictícia responsável pelo desenho da arquitetura, integrações e
                boas práticas adotadas no projeto VitorCar.
              </dd>
            </div>
          </div>
        </article>

        <article className="bg-slate-900/90 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-700 bg-slate-950/70 flex items-center gap-2">
            <span className="text-vitorcarYellow text-lg">📊</span>
            <h2 className="text-sm md:text-base font-semibold text-slate-50">
              Entidades do Sistema
            </h2>
          </div>

          <div className="px-5 py-4 text-sm text-slate-100 space-y-4">
            <p className="text-slate-300">
              O modelo de dados do VitorCar foi pensado para ser simples e
              direto, mas suficiente para atender o controle de veículos e
              manutenções proposto na avaliação.
            </p>

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold mb-1">
                  Entidade <span className="font-bold">Veículo</span>
                </h3>
                <p className="text-xs text-slate-300 mb-1">
                  Representa cada veículo controlado pelo sistema.
                </p>
                <p className="text-xs text-slate-300 flex flex-wrap gap-1">
                  {[
                    "id_veiculo",
                    "modelo",
                    "marca",
                    "ano",
                    "placa",
                    "dono",
                  ].map((campo) => (
                    <span
                      key={campo}
                      className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px] border border-slate-600"
                    >
                      {campo}
                    </span>
                  ))}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-1">
                  Entidade <span className="font-bold">Manutenção</span>
                </h3>
                <p className="text-xs text-slate-300 mb-1">
                  Guarda cada serviço realizado em um veículo, com custo e data.
                </p>
                <p className="text-xs text-slate-300 flex flex-wrap gap-1">
                  {[
                    "id_manutencao",
                    "descricao",
                    "data",
                    "custo",
                    "id_veiculo",
                  ].map((campo) => (
                    <span
                      key={campo}
                      className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px] border border-slate-600"
                    >
                      {campo}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="mt-2 border-t border-slate-700 pt-3">
              <h3 className="text-sm font-semibold mb-1">Relacionamento</h3>
              <p className="text-xs text-slate-300">
                <span className="font-semibold">
                  Um veículo pode ter várias manutenções
                </span>
                , mantendo o histórico completo de serviços realizados ao longo
                do tempo.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-slate-900/90 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-700 bg-slate-950/70 flex items-center gap-2">
          <span className="text-vitorcarYellow text-lg">🧩</span>
          <h2 className="text-sm md:text-base font-semibold text-slate-50">
            Créditos de desenvolvimento e tecnologias
          </h2>
        </div>

        <div className="px-5 py-4 text-sm text-slate-100">
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>
              <strong>Frontend:</strong> React + Vite com Tailwind CSS para
              estruturação, estilização e componentes visuais das telas.
            </li>
            <li>
              <strong>Linguagem de programação:</strong> JavaScript/TypeScript
              (ecosistema React), responsável pela lógica do cliente e
              integração com a API VitorCar.
            </li>
            <li>
              <strong>Camada de UI:</strong> Tailwind CSS combinado com
              Semantic UI React, permitindo grids modernos, botões,
              formulários e tabelas responsivas.
            </li>
            <li>
              <strong>Backend / API:</strong> API REST construída em etapa
              anterior, responsável pelo cadastro e histórico de veículos e
              manutenções.
            </li>
            <li>
              <strong>Motor Gráfico Conceitual:</strong> VM Engine Development
              5.0, utilizado como referência visual e identidade do projeto.
            </li>
            <li>
              <strong>Empresa de desenvolvimento:</strong>{" "}
              <span className="font-semibold">VM Systems</span>, estúdio
              fictício responsável pela concepção do backend, frontend e banco
              de dados do VitorCar React Edition.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-slate-950/80 rounded-3xl border border-slate-800 shadow-xl px-5 py-6">
        <div className="grid gap-6 md:grid-cols-4 text-center">
          <figure className="flex flex-col items-center">
            <img
              src="/imagens/foto-prof-patrick.png"
              alt="Professor Patrick Vinicius Estevão Oliveira"
              className="w-40 h-40 md:w-44 md:h-44 rounded-full object-cover border-4 border-slate-700 shadow-lg"
            />
            <figcaption className="mt-3 text-xs text-slate-300">
              Professor orientador:
              <br />
              <span className="font-semibold">
                Patrick Vinicius Estevão Oliveira
              </span>
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center">
            <img
              src="/imagens/foto-vitor.png"
              alt="Vitor Manoel Vidal Braz"
              className="w-40 h-40 md:w-44 md:h-44 rounded-full object-cover border-4 border-slate-700 shadow-lg"
            />
            <figcaption className="mt-3 text-xs text-slate-300">
              Desenvolvedor do projeto:
              <br />
              <span className="font-semibold">Vitor Manoel Vidal Braz</span>
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center">
            <img
              src="/imagens/logo-vmenginedev.png"
              alt="Logo VM Engine Development 5.0"
              className="w-40 h-40 md:w-44 md:h-44 rounded-2xl object-cover border-4 border-slate-700 shadow-lg"
            />
            <figcaption className="mt-3 text-xs text-slate-300">
              Motor gráfico conceitual:
              <br />
              <span className="font-semibold">
                VM Engine Development 5.0
              </span>
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center">
            <img
              src="/imagens/logo-vmsystems.png"
              alt="Logo VM Systems"
              className="w-40 h-40 md:w-44 md:h-44 rounded-2xl object-cover border-4 border-slate-700 shadow-lg"
            />
            <figcaption className="mt-3 text-xs text-slate-300">
              Estúdio fictício de desenvolvimento:
              <br />
              <span className="font-semibold">VM Systems</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-slate-950/80 rounded-3xl border border-slate-800 shadow-xl px-5 py-6 text-center">
        <h2 className="text-sm md:text-base font-semibold text-slate-50 mb-4 flex items-center justify-center gap-2">
          <span>🔗</span>
          Redes e Repositórios do Desenvolvedor
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-4">
          <a
            href="https://linktr.ee/vitormanoelvb?fbclid=PAY2xjawG3CWxleHRuA2FlbQIxMQABpvQyNVHzy9_0zPlyXMkr3uXSyY_d9xF5WrGRdRlTC5tsVKHO_lki5K6Uiw_aem_LAlMOl4j9oHdurtMJMglcA"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-slate-50 text-sm font-semibold shadow-lg transition"
          >
            <img
              src="https://api.blog.production.linktr.ee/wp-content/uploads/2022/06/Avatar-Symbol-Canopy.png"
              alt="Linktree Logo"
              className="w-6 h-6 rounded-full"
            />
            Linktree
          </a>

          <a
            href="https://github.com/vitormanoelvb"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-50 text-sm font-semibold shadow-lg transition"
          >
            <img
              src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png"
              alt="GitHub Logo"
              className="w-6 h-6 rounded-full object-cover"
            />
            GitHub – Vitor Manoel Vidal Braz
          </a>

          <a
            href="https://github.com/vitormanoelvb/aplicativo-vitorcar-react-edition"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-700 hover:bg-sky-600 text-slate-50 text-sm font-semibold shadow-lg transition"
          >
            <img
              src="https://git-scm.com/images/logos/logomark-black@2x.png"
              alt="Git Logo"
              className="w-6 h-6 rounded-full object-cover bg-white p-1"
            />
            Repositório do Projeto VitorCar
          </a>
        </div>
      </section>

      <section className="text-center pt-2 pb-4">
        
      </section>
    </main>
  );
}
