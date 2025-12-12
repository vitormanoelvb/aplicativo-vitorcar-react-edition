export default function RodapeVitorCar() {
  const anoAtual = new Date().getFullYear();

  return (

    <footer className="text-slate-100 bg-slate-800/80 backdrop-blur-sm">
     
      <div className="h-[3px] w-full bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500" />

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center gap-6">
       
        <div className="flex items-center gap-2">
          <img
            src="/imagens/logo-vmengine.png"
            alt="Logo VM Engine"
            className="h-8 w-8 object-contain"
          />
          <img
            src="/imagens/logo-vmsystems.png"
            alt="Logo VM Systems"
            className="h-8 w-8 object-contain"
          />
        </div>

        <p className="text-[11px] md:text-xs text-center">
          © {anoAtual} – VitorCar • Sistema de Controle de Veículos e Manutenções •
          Aplicativo de Controle de Veículos • Projeto Acadêmico
        </p>

        <div className="flex items-center gap-2">
          <img
            src="/imagens/logo-univale.png"
            alt="Logo Univale"
            className="h-8 w-8 object-contain"
          />
          <img
            src="/imagens/logo-sistemas-info.png"
            alt="Logo Sistemas de Informação Univale"
            className="h-8 w-8 object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
