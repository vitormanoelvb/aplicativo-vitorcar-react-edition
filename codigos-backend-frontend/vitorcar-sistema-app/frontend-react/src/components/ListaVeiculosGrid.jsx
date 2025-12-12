import CartaoVeiculo from "./CartaoVeiculo";

export default function ListaVeiculosGrid({ veiculos, aoEditar, aoExcluir }) {
  if (!veiculos || veiculos.length === 0) {
    return (
      <div className="text-center text-slate-400 py-10 text-sm border border-dashed border-slate-700 rounded-2xl">
        Nenhum veículo cadastrado. Use o botão{" "}
        <span className="font-semibold text-slate-100">“Novo veículo”</span>{" "}
        para começar.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {veiculos.map((v) => (
        <CartaoVeiculo
          key={v.id_veiculo}
          veiculo={v}
          aoEditar={() => aoEditar(v)}
          aoExcluir={() => aoExcluir(v)}
        />
      ))}
    </div>
  );
}
