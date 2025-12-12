import CartaoManutencao from "./CartaoManutencao";

export default function ListaManutencoesGrid({
  manutencoes,
  aoEditar,
  aoExcluir,
}) {
  if (!manutencoes || manutencoes.length === 0) {
    return (
      <div className="text-center text-slate-400 py-10 text-sm border border-dashed border-slate-700 rounded-2xl">
        Nenhuma manutenção cadastrada. Use o botão{" "}
        <span className="font-semibold text-slate-100">“Nova manutenção”</span>{" "}
        para começar.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {manutencoes.map((m) => (
        <CartaoManutencao
          key={m.id_manutencao}
          manutencao={m}
          aoEditar={() => aoEditar(m)}
          aoExcluir={() => aoExcluir(m)}
        />
      ))}
    </div>
  );
}
