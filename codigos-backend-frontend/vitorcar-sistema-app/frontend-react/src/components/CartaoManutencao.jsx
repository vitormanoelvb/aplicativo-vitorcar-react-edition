export default function CartaoManutencao({ manutencao, aoEditar, aoExcluir }) {
  const dataFormatada = manutencao.data
    ? manutencao.data.slice(0, 16).replace("T", " ")
    : "—";

  const custoFormatado =
    manutencao.custo != null
      ? Number(manutencao.custo).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : "—";

  return (
    <div className="border border-slate-700 rounded-2xl p-5 bg-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition">
      <header className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-50">
            {manutencao.descricao || "Serviço sem descrição"}
          </h3>
          <p className="text-xs text-slate-400">
            Veículo:{" "}
            <span className="font-mono">
              {manutencao.id_veiculo
                ? `ID ${manutencao.id_veiculo}`
                : "não vinculado"}
            </span>
          </p>
        </div>

        <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-slate-900 text-slate-200 border border-slate-600">
          #{manutencao.id_manutencao ?? "—"}
        </span>
      </header>

      <div className="space-y-1 text-[13px] text-slate-200">
        <p>
          <span className="text-slate-400">Data:</span>{" "}
          <span>{dataFormatada}</span>
        </p>
        <p>
          <span className="text-slate-400">Custo:</span>{" "}
          <span className="font-semibold">{custoFormatado}</span>
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
