import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const normalizar = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.dados)) return data.dados;
  return [];
};

export const veiculoService = {
  async listar(busca) {
    const params = {};
    if (busca) params.busca = busca;
    const resposta = await api.get("/api/veiculos", { params });
    return normalizar(resposta.data);
  },

  async criar(dadosVeiculo) {
    const resposta = await api.post("/api/veiculos", dadosVeiculo);
    return resposta.data;
  },

  async atualizar(id, dadosVeiculo) {
    const resposta = await api.put(`/api/veiculos/${id}`, dadosVeiculo);
    return resposta.data;
  },

  async excluir(id) {
    const resposta = await api.delete(`/api/veiculos/${id}`);
    return resposta.data;
  },
};

export const manutencaoService = {
  async listar(busca) {
    const params = {};
    if (busca) params.busca = busca;
    const resposta = await api.get("/api/manutencoes", { params });
    return normalizar(resposta.data);
  },

  async criar(dadosManutencao) {
    const resposta = await api.post("/api/manutencoes", dadosManutencao);
    return resposta.data;
  },

  async atualizar(id, dadosManutencao) {
    const resposta = await api.put(`/api/manutencoes/${id}`, dadosManutencao);
    return resposta.data;
  },

  async excluir(id) {
    const resposta = await api.delete(`/api/manutencoes/${id}`);
    return resposta.data;
  },
};
