import { useEffect, useState } from "react";
import { Form, Button, Icon, Table, Message } from "semantic-ui-react";
import { veiculoService } from "../services/vitorcarApi";

export default function TelaVeiculos({ voltarParaInicio }) {
  const [veiculos, setVeiculos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [textoBusca, setTextoBusca] = useState("");

  const [formVeiculo, setFormVeiculo] = useState({
    id_veiculo: "",
    modelo: "",
    marca: "",
    ano: "",
    placa: "",
    proprietario: "",
    data_cadastro: "",
  });

  const [idExcluir, setIdExcluir] = useState("");
  const [placaExcluir, setPlacaExcluir] = useState("");

  useEffect(() => {
    document.title = "VitorCar | Veículos";
  }, []);

  const carregarVeiculos = async (busca) => {
    try {
      setCarregando(true);
      setErro("");

      const lista = await veiculoService.listar(busca);

      const listaNormalizada = Array.isArray(lista)
        ? lista.map((v) => ({
            ...v,
            proprietario: v.proprietario ?? v.dono ?? "",
          }))
        : [];

      setVeiculos(listaNormalizada);
    } catch (erro) {
      console.error(erro);
      setErro("Erro ao carregar veículos. Verifique se a API está ativa.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const limparFormulario = () => {
    setFormVeiculo({
      id_veiculo: "",
      modelo: "",
      marca: "",
      ano: "",
      placa: "",
      proprietario: "",
      data_cadastro: "",
    });
  };

  const handleChange = (e, { name, value }) => {
    setFormVeiculo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const salvarVeiculo = async (e) => {
    e.preventDefault();

    const { id_veiculo, ...dados } = formVeiculo;

    if (!dados.data_cadastro) delete dados.data_cadastro;

    const payload = {
      ...dados,
      dono: dados.proprietario,
    };
    delete payload.proprietario;

    try {
      if (id_veiculo) {
        await veiculoService.atualizar(id_veiculo, payload);
      } else {
        await veiculoService.criar(payload);
      }

      await carregarVeiculos(textoBusca || undefined);
      limparFormulario();
    } catch (erro) {
      console.error("Erro ao salvar veículo:", erro);
      alert("Erro ao salvar veículo.");
    }
  };

  const preencherEdicao = (veiculo) => {
    setFormVeiculo({
      id_veiculo: veiculo.id_veiculo ?? "",
      modelo: veiculo.modelo ?? "",
      marca: veiculo.marca ?? "",
      ano: veiculo.ano?.toString() ?? "",
      placa: veiculo.placa ?? "",
      proprietario: veiculo.proprietario ?? veiculo.dono ?? "",
      data_cadastro: veiculo.data_cadastro
        ? veiculo.data_cadastro.substring(0, 10)
        : "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const excluirPorId = async (id) => {
    if (!id) return;

    if (!window.confirm("Tem certeza que deseja excluir este veículo?")) {
      return;
    }

    try {
      await veiculoService.excluir(id);
      await carregarVeiculos(textoBusca || undefined);

      setIdExcluir((valorAtual) =>
        valorAtual === String(id) ? "" : valorAtual
      );
    } catch (erro) {
      console.error("Erro ao excluir veículo:", erro);
      alert("Erro ao excluir veículo.");
    }
  };

  const excluirRapido = async () => {
    if (!idExcluir && !placaExcluir) {
      alert("Informe um ID ou uma placa para excluir o veículo.");
      return;
    }

    if (idExcluir) {
      await excluirPorId(Number(idExcluir));
      return;
    }

    try {
      const lista = await veiculoService.listar();
      const placaBusca = placaExcluir.trim().toUpperCase();

      const encontrados = lista.filter(
        (v) => String(v.placa).toUpperCase() === placaBusca
      );

      if (encontrados.length === 0) {
        alert("Nenhum veículo encontrado com essa placa.");
        return;
      }

      if (
        !window.confirm(
          `Tem certeza que deseja excluir ${encontrados.length} veículo(s) com a placa ${placaBusca}?`
        )
      ) {
        return;
      }

      for (const v of encontrados) {
        await veiculoService.excluir(v.id_veiculo);
      }

      setPlacaExcluir("");
      await carregarVeiculos(textoBusca || undefined);
    } catch (erro) {
      console.error("Erro ao excluir veículo pela placa:", erro);
      alert("Erro ao excluir veículo pela placa.");
    }
  };
 
  const buscar = async (e) => {
    e.preventDefault();
    await carregarVeiculos(textoBusca.trim() || undefined);
  };

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

      <section className="flex justify-center">
        <div
          className="
            rounded-[2.5rem]
            bg-gradient-to-r from-amber-900 via-slate-900 to-sky-900
            shadow-[0_32px_90px_rgba(0,0,0,0.85)]
            px-10 py-6
            text-center text-slate-50
            max-w-3xl w-full
          "
        >
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Gerenciamento de Veículos
          </h1>
          <p className="text-sm md:text-base text-slate-200">
            Cadastre, edite e consulte os veículos controlados pelo sistema
            VitorCar.
          </p>
        </div>
      </section>

      <section
        className="
          rounded-3xl overflow-hidden
          bg-slate-900/90
          shadow-[0_22px_70px_rgba(0,0,0,0.9)]
        "
      >
        <div className="bg-[#4f46a6] text-slate-50 px-6 py-3 flex items-center gap-3">
          <span className="text-lg">
            <Icon name="car" />
          </span>
          <div className="font-semibold text-sm md:text-base">
            Cadastro / Edição de veículo
          </div>
        </div>

        <div className="bg-slate-100 px-6 py-5">
          <Form onSubmit={salvarVeiculo} className="space-y-4 text-sm">
            <div className="grid md:grid-cols-4 gap-4">
              <Form.Input
                label="ID"
                name="id_veiculo"
                value={formVeiculo.id_veiculo}
                placeholder="Automático"
                readOnly
              />
              <Form.Input
                label="Modelo"
                name="modelo"
                value={formVeiculo.modelo}
                onChange={handleChange}
                placeholder="Ex: Onix Plus"
              />
              <Form.Input
                label="Marca"
                name="marca"
                value={formVeiculo.marca}
                onChange={handleChange}
                placeholder="Ex: Chevrolet"
              />
              <Form.Input
                label="Ano"
                name="ano"
                value={formVeiculo.ano}
                onChange={handleChange}
                placeholder="Ex: 2025"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Form.Input
                label="Placa"
                name="placa"
                value={formVeiculo.placa}
                onChange={handleChange}
                placeholder="ABC1D23"
              />
              <Form.Input
                label="Proprietário"
                name="proprietario"
                value={formVeiculo.proprietario}
                onChange={handleChange}
                placeholder="Nome do proprietário"
              />
              <Form.Input
                label="Data de cadastro"
                name="data_cadastro"
                type="date"
                value={formVeiculo.data_cadastro}
                onChange={handleChange}
                placeholder="dd/mm/aaaa"
              />
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
              <Button
                type="submit"
                color="blue"
                className="!rounded-xl !px-6 !py-2 !text-sm"
                icon
                labelPosition="left"
              >
                <Icon name="plus circle" />
                {formVeiculo.id_veiculo ? "Atualizar" : "Cadastrar"}
              </Button>

              <Button
                type="button"
                basic
                color="grey"
                className="!rounded-xl !px-6 !py-2 !text-sm"
                icon
                labelPosition="left"
                onClick={limparFormulario}
              >
                <Icon name="erase" />
                Limpar
              </Button>
            </div>
          </Form>
        </div>
      </section>

      <section
        className="
          rounded-3xl
          bg-slate-950
          shadow-[0_22px_70px_rgba(0,0,0,0.9)]
          overflow-hidden
        "
      >
        <div className="bg-red-700 text-slate-50 px-6 py-3 flex items-center gap-3">
          <Icon name="trash alternate" />
          <span className="font-semibold text-sm md:text-base">
            Exclusão de veículo
          </span>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="md:col-span-1">
              <label className="block text-slate-200 mb-1">ID do veículo</label>
              <input
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Informe o ID para excluir"
                value={idExcluir}
                onChange={(e) => setIdExcluir(e.target.value)}
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-slate-200 mb-1">
                ou Placa do veículo
              </label>
              <input
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Ex: ABC1D23"
                value={placaExcluir}
                onChange={(e) => setPlacaExcluir(e.target.value)}
              />
            </div>

            <div className="md:col-span-1 flex items-end justify-end">
              <Button
                color="red"
                className="!rounded-full !px-10 !py-3 !text-sm"
                icon
                labelPosition="left"
                onClick={excluirRapido}
              >
                <Icon name="trash" />
                Excluir do sistema
              </Button>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Você também pode excluir diretamente pela tabela abaixo, utilizando
            o botão de ações de cada veículo.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-center">
          <div
            className="
              rounded-full
              bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
              px-10 py-3
              shadow-[0_18px_50px_rgba(0,0,0,0.8)]
              text-center
            "
          >
            <p className="text-sm md:text-base font-semibold text-slate-100">
              Veículos cadastrados no sistema
            </p>
          </div>
        </div>

        <form
          onSubmit={buscar}
          className="flex flex-col md:flex-row gap-3 items-stretch md:items-center"
        >
          <label className="text-slate-100 text-sm md:mr-2">
            Buscar veículo (modelo, placa ou proprietário):
          </label>

          <div className="flex flex-1 gap-2 items-stretch">
            <input
              type="text"
              value={textoBusca}
              onChange={(e) => setTextoBusca(e.target.value)}
              placeholder="Digite para pesquisar..."
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-vitorcarYellow"
            />

            <Button
              type="submit"
              className="!rounded-xl !px-5 !py-2 !text-sm"
              color="blue"
              icon
              labelPosition="left"
            >
              <Icon name="search" />
              Buscar
            </Button>
          </div>
        </form>

        {erro && (
          <Message
            negative
            className="!rounded-2xl !bg-rose-950/80 !border !border-rose-500/60 !text-rose-50"
          >
            {erro}
          </Message>
        )}

        {carregando ? (
          <div className="text-center text-slate-400 py-10 text-sm">
            Carregando veículos...
          </div>
        ) : (
          <div
            className="
              rounded-3xl
              bg-slate-800
              border border-slate-600
              shadow-[0_22px_60px_rgba(0,0,0,0.85)]
              overflow-hidden
            "
          >
            <Table celled unstackable className="!bg-slate-900 !text-slate-100">
              <Table.Header className="!bg-slate-200">
                <Table.Row>
                  <Table.HeaderCell
                    width={1}
                    className="!bg-slate-200 !text-slate-900 !font-semibold"
                  >
                    ID
                  </Table.HeaderCell>
                  <Table.HeaderCell className="!bg-slate-200 !text-slate-900 !font-semibold">
                    Modelo
                  </Table.HeaderCell>
                  <Table.HeaderCell className="!bg-slate-200 !text-slate-900 !font-semibold">
                    Marca
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    width={2}
                    className="!bg-slate-200 !text-slate-900 !font-semibold"
                  >
                    Ano
                  </Table.HeaderCell>
                  <Table.HeaderCell className="!bg-slate-200 !text-slate-900 !font-semibold">
                    Placa
                  </Table.HeaderCell>
                  <Table.HeaderCell className="!bg-slate-200 !text-slate-900 !font-semibold">
                    Proprietário
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    width={2}
                    className="!bg-slate-200 !text-slate-900 !font-semibold"
                  >
                    Ações
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {veiculos.length === 0 ? (
                  <Table.Row className="!bg-slate-900">
                    <Table.Cell
                      colSpan="7"
                      className="!text-center !py-8 !text-slate-400 italic"
                    >
                      Nenhum veículo cadastrado no momento. Utilize o formulário
                      acima para incluir.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  veiculos.map((v) => (
                    <Table.Row
                      key={v.id_veiculo}
                      className="!bg-slate-900 even:!bg-slate-800"
                    >
                      <Table.Cell>{v.id_veiculo}</Table.Cell>
                      <Table.Cell>{v.modelo}</Table.Cell>
                      <Table.Cell>{v.marca}</Table.Cell>
                      <Table.Cell>{v.ano}</Table.Cell>
                      <Table.Cell>{v.placa}</Table.Cell>

                      <Table.Cell>{v.proprietario || v.dono || "—"}</Table.Cell>

                      <Table.Cell>
                        <div className="flex gap-2">
                          <Button
                            size="tiny"
                            color="yellow"
                            className="!text-xs !rounded-lg !text-slate-900"
                            icon
                            labelPosition="left"
                            onClick={() => preencherEdicao(v)}
                          >
                            <Icon name="edit" />
                            Editar
                          </Button>

                          <Button
                            size="tiny"
                            color="red"
                            className="!text-xs !rounded-lg"
                            icon
                            labelPosition="left"
                            onClick={() => excluirPorId(v.id_veiculo)}
                          >
                            <Icon name="trash" />
                            Excluir
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        )}
      </section>
    </main>
  );
}
