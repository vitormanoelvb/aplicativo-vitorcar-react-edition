import { useEffect, useState } from "react";
import { produtoService } from "./services/api";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import DeleteModal from "./components/DeleteModal";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setErro("");
      const dados = await produtoService.getAll();
      setProdutos(Array.isArray(dados) ? dados : []);
    } catch (error) {
      console.error(error);
      setErro("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleSave = async (produto, id) => {
    try {
      if (id) {
        await produtoService.update(id, produto);
      } else {
        await produtoService.create(produto);
      }
      await carregarProdutos();
      setOpenForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleEdit = (produto) => {
    setEditingProduct(produto);
    setOpenForm(true);
  };

  const handleDeleteRequest = (produto) => {
    setSelectedProduct(produto);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      await produtoService.delete(selectedProduct.IDPRODUTO);
      await carregarProdutos();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-gray-800">
          Gerenciador de Produtos
        </h1>
        <p className="text-gray-500 mt-1">
          CRUD minimalista usando React + Tailwind
        </p>
      </header>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setEditingProduct(null);
            setOpenForm(true);
          }}
          className="px-5 py-2 text-sm font-medium bg-blue-400 hover:bg-blue-500 text-white rounded-lg  transition"
        >
          + Novo Produto
        </button>
      </div>

      {erro && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-6 text-sm">
          {erro}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-10">Carregando...</div>
      ) : (
        <ProductList
          produtos={produtos}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />
      )}

      {openForm && (
        <ProductForm
          produtoEdit={editingProduct}
          onClose={() => {
            setOpenForm(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
        />
      )}

      <DeleteModal
        open={deleteModalOpen}
        name={selectedProduct?.NOME}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
