import { useEffect, useState } from "react"; 
import { Form, Button, Icon, Table, Message } from "semantic-ui-react";
import { manutencaoService } from "../services/vitorcarApi";

export default function TelaManutencoes({ voltarParaInicio }) {
  const [manutencoes, setManutencoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [textoBusca, setTextoBusca] = useState("");

  const [formManutencao, setFormManutencao] = useState({
    id_manutencao: "",
    veiculo: "",
    tipo_servico: "",
    valor: "",
    data_manutencao: "",
    quilometragem: "",
    observacoes: "",
  });

  const [idExcluir, setIdExcluir] = useState("");
  const [idVeiculoExcluir, setIdVeiculoExcluir] = useState("");

  useEffect(() => {
    document.title = "VitorCar | Manutenções";
  }, []);

  const carregarManutencoes = async (busca) => {
    try {
      setCarregando(true);
      setErro("");
      const lista = await manutencaoService.listar(busca);
      setManutencoes(lista);
    } catch (erro) {
      console.error(erro);
      setErro("Erro ao carregar manutenções. Verifique se a API está ativa.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarManutencoes();
  }, []);

  const limparFormulario = () => {
    setFormManutencao({
      id_manutencao: "",
      veiculo: "",
      tipo_servico: "",
      valor: "",
      data_manutencao: "",
      quilometragem: "",
      observacoes: "",
    });
  };

  const handleChange = (e, { name, value }) => {
    setFormManutencao((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const salvarManutencao = async (e) => {
    e.preventDefault();

    const {
      id_manutencao,
      veiculo,
      tipo_servico,
      valor,
      data_manutencao,
    } = formManutencao;

    const dados = {
      id_veiculo: veiculo,
      descricao: tipo_servico,
      custo: valor,
      data_manutencao,
    };

    if (!dados.id_veiculo || !dados.descricao) {
      alert("Informe o ID do veículo e a descrição da manutenção.");
      return;
    }

    if (!dados.data_manutencao) delete dados.data_manutencao;
    if (dados.custo === "" || dados.custo === undefined) delete dados.custo;

    try {
      if (id_manutencao) {
        await manutencaoService.atualizar(id_manutencao, dados);
      } else {
        await manutencaoService.criar(dados);
      }

      await carregarManutencoes(textoBusca || undefined);
      limparFormulario();
    } catch (erro) {
      console.error("Erro ao salvar manutenção:", erro);
      alert("Erro ao salvar manutenção.");
    }
  };

  const preencherEdicao = (m) => {
    const dataCampo = m.data_manutencao ?? m.data ?? m.data_servico ?? "";

    setFormManutencao({
      id_manutencao: m.id_manutencao ?? "",
      veiculo:
        m.veiculo ??
        (m.id_veiculo !== undefined ? String(m.id_veiculo) : "") ??
        "",
      tipo_servico: m.tipo_servico ?? m.servico ?? m.tipo ?? m.descricao ?? "",
      valor:
        (m.valor !== undefined ? String(m.valor) : null) ??
        (m.custo !== undefined ? String(m.custo) : "") ??
        "",
      data_manutencao: dataCampo ? String(dataCampo).substring(0, 10) : "",
      quilometragem:
        m.quilometragem !== undefined ? String(m.quilometragem) : "",
      observacoes: m.observacoes ?? "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const excluirPorId = async (id) => {
    if (!id) return;

    if (!window.confirm("Tem certeza que deseja excluir esta manutenção?")) {
      return;
    }

    try {
      await manutencaoService.excluir(id);
      await carregarManutencoes(textoBusca || undefined);

      setIdExcluir((valorAtual) =>
        valorAtual === String(id) ? "" : valorAtual
      );
    } catch (erro) {
      console.error("Erro ao excluir manutenção:", erro);
      alert("Erro ao excluir manutenção.");
    }
  };

  const excluirRapido = async () => {
    if (!idExcluir && !idVeiculoExcluir) {
      alert("Informe o ID da manutenção ou o ID do veículo.");
      return;
    }

    if (idExcluir) {
      await excluirPorId(Number(idExcluir));
      return;
    }

    if (
      idVeiculoExcluir &&
      !window.confirm(
        "Tem certeza que deseja excluir todas as manutenções deste veículo?"
      )
    ) {
      return;
    }

    try {
      const lista = await manutencaoService.listar();
      const relacionadas = lista.filter((m) => {
        const idVeiculo = m.id_veiculo ?? m.veiculo;
        return String(idVeiculo) === String(idVeiculoExcluir);
      });

      for (const item of relacionadas) {
        await manutencaoService.excluir(item.id_manutencao);
      }

      setIdVeiculoExcluir("");
      await carregarManutencoes(textoBusca || undefined);
    } catch (erro) {
      console.error("Erro ao excluir por veículo:", erro);
      alert("Erro ao excluir manutenções deste veículo.");
    }
  };

  const buscar = async (e) => {
    e.preventDefault();
    await carregarManutencoes(textoBusca.trim() || undefined);
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
            Gerenciamento de Manutenções
          </h1>
          <p className="text-sm md:text-base text-slate-200">
            Registre, edite, exclua e acompanhe as manutenções dos veículos.
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
            <Icon name="wrench" />
          </span>
          <div className="font-semibold text-sm md:text-base">
            Cadastro / Edição de manutenção
          </div>
        </div>

        <div className="bg-slate-100 px-6 py-5">
          <Form onSubmit={salvarManutencao} className="space-y-4 text-sm">
            <div className="grid md:grid-cols-4 gap-4">
              {/* ID somente visual, não editável, mas com aparência normal */}
              <Form.Input
                label="ID"
                name="id_manutencao"
                value={formManutencao.id_manutencao}
                placeholder="Automático"
                readOnly
              />
              <Form.Input
                label="ID do veículo"
                name="veiculo"
                value={formManutencao.veiculo}
                onChange={handleChange}
                placeholder="Vincule ao veículo"
              />
              <Form.Input
                label="Descrição do serviço"
                name="tipo_servico"
                value={formManutencao.tipo_servico}
                onChange={handleChange}
                placeholder="Ex: Troca de óleo e filtro"
              />
              <Form.Input
                label="Data da manutenção"
                name="data_manutencao"
                type="date"
                value={formManutencao.data_manutencao}
                onChange={handleChange}
              />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Form.Input
                label="Custo (R$)"
                name="valor"
                value={formManutencao.valor}
                onChange={handleChange}
                placeholder="Ex: 260,00"
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
                <Icon
                  name={
                    formManutencao.id_manutencao ? "edit" : "plus circle"
                  }
                />
                {formManutencao.id_manutencao ? "Atualizar" : "Registrar"}
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
            Exclusão de manutenção
          </span>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="md:col-span-1">
              <label className="block text-slate-200 mb-1">
                ID da manutenção
              </label>
              <input
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Informe o ID para excluir"
                value={idExcluir}
                onChange={(e) => setIdExcluir(e.target.value)}
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-slate-200 mb-1">
                ou ID do veículo
              </label>
              <input
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Excluir manutenções deste veículo"
                value={idVeiculoExcluir}
                onChange={(e) => setIdVeiculoExcluir(e.target.value)}
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
              Manutenções registradas
            </p>
          </div>
        </div>

        <form
          onSubmit={buscar}
          className="flex flex-col md:flex-row gap-3 items-stretch md:items-center"
        >
          <label className="text-slate-100 text-sm md:mr-2">
            Buscar manutenção (ID, veículo ou descrição):
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
            Carregando manutenções...
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
                    ID Veículo
                  </Table.HeaderCell>
                  <Table.HeaderCell className="!bg-slate-200 !text-slate-900 !font-semibold">
                    Descrição
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    width={2}
                    className="!bg-slate-200 !text-slate-900 !font-semibold"
                  >
                    Data
                  </Table.HeaderCell>
                  <Table.HeaderCell className="!bg-slate-200 !text-slate-900 !font-semibold">
                    Custo (R$)
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
                {manutencoes.length === 0 ? (
                  <Table.Row className="!bg-slate-900">
                    <Table.Cell
                      colSpan="6"
                      className="!text-center !py-8 !text-slate-400 italic"
                    >
                      Nenhuma manutenção cadastrada no momento. Utilize o
                      formulário acima para registrar.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  manutencoes.map((m) => (
                    <Table.Row
                      key={m.id_manutencao}
                      className="!bg-slate-900 even:!bg-slate-800"
                    >
                      <Table.Cell>{m.id_manutencao}</Table.Cell>
                      <Table.Cell>{m.id_veiculo ?? m.veiculo ?? ""}</Table.Cell>
                      <Table.Cell>
                        {m.tipo_servico ??
                          m.servico ??
                          m.tipo ??
                          m.descricao ??
                          ""}
                      </Table.Cell>
                      <Table.Cell>
                        {m.data_manutencao ?? m.data ?? m.data_servico ?? ""}
                      </Table.Cell>
                      <Table.Cell>
                        {m.valor ?? m.custo ?? m.valor_total ?? ""}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="tiny"
                            color="yellow"
                            className="!text-xs !rounded-lg !text-slate-900"
                            icon
                            labelPosition="left"
                            onClick={() => preencherEdicao(m)}
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
                            onClick={() => excluirPorId(m.id_manutencao)}
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
