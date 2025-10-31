"use client"

import { Calendar, DollarSign, Package } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { vendaAPI } from "../api/api"

export const MeusPedidos = () => {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPedidos()
  }, [])

  const fetchPedidos = async () => {
    try {
      // Note: This endpoint might need adjustment based on your API
      // The spec doesn't have a specific "my orders" endpoint for clients
      // You may need to add this to your backend
      const response = await vendaAPI.getRelatorio()
      setPedidos(response.data)
    } catch (error) {
      toast.error("Erro ao carregar pedidos")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando pedidos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meus Pedidos</h1>
          <p className="text-muted-foreground">Histórico de compras realizadas</p>
        </div>

        {/* Orders List */}
        {pedidos.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Nenhum pedido encontrado</h3>
            <p className="text-muted-foreground">Você ainda não realizou nenhuma compra</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{pedido.livroTitulo}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(pedido.dataVenda)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>R$ {pedido.valor?.toFixed(2) ?? "0.00"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">
                      Concluído
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
