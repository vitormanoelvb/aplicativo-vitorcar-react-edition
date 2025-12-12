import { useEffect, useState } from "react";

export default function FormCadastroVeiculo({
  veiculoEdicao,
  aoFechar,
  aoSalvar,
}) {
  const [form, setForm] = useState({
    modelo: "",
    marca: "",
    ano: "",
    placa: "",
    dono: "",
    data_cadastro: "",
  });

  useEffect(() => {
    if (veiculoEdicao) {
      setForm({
        modelo: veiculoEdicao.modelo || "",
        marca: veiculoEdicao.marca || "",
        ano: veiculoEdicao.ano || "",
        placa: veiculoEdicao.placa || "",
        dono: veiculoEdicao.dono || "",
        data_cadastro: veiculoEdicao.data_cadastro
          ? veiculoEdicao.data_cadastro.slice(0, 16)
          : "",
      });
    } else {
      setForm({
        modelo: "",
        marca: "",
        ano: "",
        placa: "",
        dono: "",
        data_cadastro: "",
      });
    }
  }, [veiculoEdicao]);

  const atualizarCampo = (e) => {
    const { name, value } = e.target;
    setForm((atual) => ({
      ...atual,
      [name]: value,
    }));
  };

  const enviar = (e) => {
    e.preventDefault();
    if (!form.modelo || !form.marca || !form.placa) {
      alert("Preencha pelo menos modelo, marca e placa.");
      return;
    }

    const dados = {
      ...form,
      ano: form.ano ? Number(form.ano) : null,
      data_cadastro: form.data_cadastro || null,
    };

    const id = veiculoEdicao ? veiculoEdicao.id_veiculo : null;
    aoSalvar(dados, id);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-40">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-50 mb-4">
          {veiculoEdicao ? "Editar veículo" : "Novo veículo"}
        </h2>

        <form onSubmit={enviar} className="space-y-3 text-sm text-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1">Modelo</label>
              <input
                type="text"
                name="modelo"
                value={form.modelo}
                onChange={atualizarCampo}
                className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Marca</label>
              <input
                type="text"
                name="marca"
                value={form.marca}
                onChange={atualizarCampo}
                className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 mb-1">Ano</label>
              <input
                type="number"
                name="ano"
                value={form.ano}
                onChange={atualizarCampo}
                className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Placa</label>
              <input
                type="text"
                name="placa"
                value={form.placa}
                onChange={atualizarCampo}
                className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
                placeholder="ABC1D23"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Data de cadastro</label>
              <input
                type="datetime-local"
                name="data_cadastro"
                value={form.data_cadastro}
                onChange={atualizarCampo}
                className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Proprietário</label>
            <input
              type="text"
              name="dono"
              value={form.dono}
              onChange={atualizarCampo}
              className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
              placeholder="Nome do proprietário"
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
