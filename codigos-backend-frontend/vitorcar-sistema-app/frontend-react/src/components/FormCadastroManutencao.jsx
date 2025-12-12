import { useEffect, useState } from "react";

export default function FormCadastroManutencao({
  manutencaoEdicao,
  aoFechar,
  aoSalvar,
}) {
  const [form, setForm] = useState({
    id_veiculo: "",
    descricao: "",
    data: "",
    custo: "",
  });

  useEffect(() => {
    if (manutencaoEdicao) {
      setForm({
        id_veiculo: manutencaoEdicao.id_veiculo || "",
        descricao: manutencaoEdicao.descricao || "",
        data: manutencaoEdicao.data
          ? manutencaoEdicao.data.slice(0, 16)
          : "",
        custo:
          manutencaoEdicao.custo != null
            ? String(manutencaoEdicao.custo)
            : "",
      });
    } else {
      setForm({
        id_veiculo: "",
        descricao: "",
        data: "",
        custo: "",
      });
    }
  }, [manutencaoEdicao]);

  const atualizarCampo = (e) => {
    const { name, value } = e.target;
    setForm((atual) => ({
      ...atual,
      [name]: value,
    }));
  };

  const enviar = (e) => {
    e.preventDefault();

    if (!form.descricao) {
      alert("Informe a descrição do serviço.");
      return;
    }

    const dados = {
      descricao: form.descricao,
      id_veiculo: form.id_veiculo ? Number(form.id_veiculo) : null,
      data: form.data || null,
      custo: form.custo ? Number(form.custo) : null,
    };

    const id = manutencaoEdicao ? manutencaoEdicao.id_manutencao : null;
    aoSalvar(dados, id);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-40">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-50 mb-4">
          {manutencaoEdicao ? "Editar manutenção" : "Nova manutenção"}
        </h2>

        <form onSubmit={enviar} className="space-y-3 text-sm text-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1">ID do veículo</label>
              <input
                type="number"
                name="id_veiculo"
                value={form.id_veiculo}
                onChange={atualizarCampo}
                className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
                placeholder="Ex: 1"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">
                Data da manutenção
              </label>
              <input
                type="datetime-local"
                name="data"
                value={form.data}
                onChange={atualizarCampo}
                className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">
              Descrição do serviço
            </label>
            <input
              type="text"
              name="descricao"
              value={form.descricao}
              onChange={atualizarCampo}
              className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
              placeholder="Ex: Troca de óleo e filtro"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Custo (R$)</label>
            <input
              type="number"
              step="0.01"
              name="custo"
              value={form.custo}
              onChange={atualizarCampo}
              className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
              placeholder="Ex: 260.00"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={aoFechar}
              className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-vitorcarYellow text-slate-900 font-semibold hover:brightness-110 transition"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
