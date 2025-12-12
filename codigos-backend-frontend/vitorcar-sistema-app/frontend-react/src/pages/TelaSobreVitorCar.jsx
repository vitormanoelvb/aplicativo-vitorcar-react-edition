import { useEffect } from "react";

export default function TelaSobreVitorCar() {
  useEffect(() => {
    document.title = "VitorCar | Sobre nós";
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      
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
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Sobre o VitorCar
        </h1>

        <div className="max-w-3xl mx-auto border-y border-slate-700/70 py-3">
          <p className="text-sm md:text-base text-slate-300 text-center tracking-[0.01em]">
            Conheça a origem do sistema e a parceria com a VM Systems.
          </p>
        </div>
      </div>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-start">
        <div className="space-y-8 text-slate-100">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Como tudo começou
            </h2>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              A ideia do VitorCar nasceu dentro de uma oficina pequena, no fim
              de mais um dia cheio. Entre ordens de serviço empilhadas,
              orçamentos soltos e lembretes escritos à mão, Vitor Manoel
              percebeu que estava arriscando aquilo que mais prezava: a confiança
              dos clientes. Bastou a perda de um orçamento importante e o
              esquecimento de uma revisão crítica para surgir a decisão: era hora
              de abandonar os papéis e criar um sistema único, organizado e
              acessível de qualquer lugar.
            </p>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mt-3">
              A solução não poderia ser improvisada. Vitor buscava algo
              profissional, seguro e escalável. Foi nesse momento que surgiu a
              parceria com a <span className="font-semibold">VM Systems</span>,
              uma empresa especializada em soluções digitais para gestão
              automotiva. A equipe assumiu o desafio de transformar a rotina da
              oficina em tecnologia aplicada.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Arquitetura pensada para crescer
            </h2>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              Juntas, as equipes desenharam uma arquitetura completa: um{" "}
              <span className="font-semibold">backend</span> robusto com API
              REST organizada, pronto para integrar ERPs, aplicativos mobile e
              serviços externos; um{" "}
              <span className="font-semibold">banco de dados relacional</span>{" "}
              modelado para registrar veículos, manutenções, custos e histórico
              com segurança e rastreabilidade; e um{" "}
              <span className="font-semibold">frontend</span> moderno,
              responsivo e intuitivo, desenvolvido como aplicativo web focado na
              rotina real de oficinas, frotistas e gestores.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              O que o VitorCar entrega
            </h2>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              O VitorCar – Sistema de Controle de Veículos e Manutenções –
              centraliza cadastro, consultas, alertas e relatórios em uma única
              plataforma. Através dele é possível acompanhar revisões, registrar
              serviços realizados, controlar gastos, vincular manutenções a cada
              veículo e manter todo o histórico sempre disponível. Mais do que um
              sistema, o VitorCar representa organização, transparência e
              tecnologia acessível para quem cuida de veículos todos os dias.
            </p>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mt-3">
              Ao escolher a VM Systems, Vitor assumiu um compromisso com a
              qualidade: cada tela, cada endpoint da API, cada tabela do banco de
              dados foi pensada para ser simples de usar, confiável e preparada
              para o futuro. Esse é o propósito do VitorCar: transformar dados em
              decisões e rotinas em resultados.
            </p>
          </div>
        </div>

        <div className="w-full mt-10 lg:mt-16">
          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 shadow-[0_24px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            <img
              src="/imagens/apresentacaovc.png"
              alt="Apresentação do sistema VitorCar em uso"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
