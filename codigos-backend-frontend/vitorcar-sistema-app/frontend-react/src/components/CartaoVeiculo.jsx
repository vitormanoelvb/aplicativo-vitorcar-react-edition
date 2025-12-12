export default function CartaoVeiculo({ veiculo, aoEditar, aoExcluir }) {
  return (
    <div className="border border-slate-700 rounded-2xl p-5 bg-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition">
      <header className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">
            {veiculo.modelo || "Modelo não informado"}
          </h3>
          <p className="text-xs text-slate-400">
            Marca{" "}
            <span className="font-medium text-slate-200">
              {veiculo.marca || "-"}
            </span>
          </p>
        </div>

        <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-slate-900 text-slate-200 border border-slate-600">
          {veiculo.ano || "s/ ano"}
        </span>
      </header>

      <div className="space-y-1 text-[13px] text-slate-200">
        <p>
          <span className="text-slate-400">Placa:</span>{" "}
          <span className="font-mono font-semibold">
            {veiculo.placa || "—"}
          </span>
        </p>
        <p>
          <span className="text-slate-400">Proprietário:</span>{" "}
          <span className="font-medium">
            {veiculo.dono || "Não informado"}
          </span>
        </p>
        <p className="text-xs text-slate-400">
          Cadastro:{" "}
          <span className="text-slate-200">
            {veiculo.data_cadastro
              ? veiculo.data_cadastro.slice(0, 16).replace("T", " ")
              : "—"}
          </span>
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={aoEditar}
          className="flex-1 px-3 py-2 text-xs rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={aoExcluir}
          className="flex-1 px-3 py-2 text-xs rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
