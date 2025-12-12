export default function DialogoConfirmacao({
  aberto,
  titulo = "Confirmar ação",
  mensagem,
  nome,
  aoConfirmar,
  aoCancelar,
}) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-2">{titulo}</h2>
        <p className="text-sm text-slate-300 mb-4">
          {mensagem || "Tem certeza que deseja prosseguir?"}{" "}
          {nome && (
            <>
              {" "}
              <span className="font-semibold">{nome}</span>?
            </>
          )}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={aoCancelar}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={aoConfirmar}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-sm font-semibold"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
