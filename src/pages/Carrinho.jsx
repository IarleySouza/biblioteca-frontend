"use client"

import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../auth/AuthProvider"
import { vendaAPI } from "../api/api"
import { toast } from "react-toastify"
import { ShoppingCart, Trash2, CreditCard, ArrowLeft, Clock } from "lucide-react"
import { useState } from "react"

export const Carrinho = () => {
  const { cart, rentalCart, removeFromCart, removeFromRental, clearCart, clearRentalCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const totalCompra = cart.reduce((sum, livro) => sum + livro.preco, 0)
  const totalAluguel = rentalCart.reduce((sum, livro) => sum + livro.preco * 0.3, 0)
  const total = totalCompra + totalAluguel

  const handleFinalizarCompra = async () => {
    if (cart.length === 0 && rentalCart.length === 0) {
      toast.error("Seu carrinho está vazio")
      return
    }

    if (!user?.id) {
      toast.error("Erro ao identificar usuário. Faça login novamente.")
      navigate("/login")
      return
    }

    setLoading(true)

    try {
      for (const livro of cart) {
        await vendaAPI.vender(user.id, livro.id)
      }

      for (const livro of rentalCart) {
        await vendaAPI.alugar(user.id, livro.id)
      }

      toast.success("Pedido realizado com sucesso!")
      clearCart()
      clearRentalCart()
      navigate("/meus-livros")
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao finalizar pedido")
    } finally {
      setLoading(false)
    }
  }

  const totalItems = cart.length + rentalCart.length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continuar Comprando</span>
          </button>
          <h1 className="text-3xl font-bold mb-2">Carrinho de Compras</h1>
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
          </p>
        </div>

        {totalItems === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h3>
            <p className="text-muted-foreground mb-6">Adicione livros para começar sua jornada literária</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Explorar Livros
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    Compras ({cart.length})
                  </h2>
                  <div className="space-y-4">
                    {cart.map((livro) => (
                      <div key={livro.id} className="bg-card border border-border rounded-xl p-6">
                        <div className="flex gap-4">
                          <div className="w-20 h-28 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ShoppingCart className="h-8 w-8 text-primary/40" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{livro.titulo}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{livro.autor}</p>
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                              {livro.genero}
                            </span>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <button
                              onClick={() => removeFromCart(livro.id)}
                              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                            <span className="text-xl font-bold text-primary">R$ {livro.preco.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rentalCart.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    Aluguéis ({rentalCart.length})
                  </h2>
                  <div className="space-y-4">
                    {rentalCart.map((livro) => (
                      <div key={livro.id} className="bg-card border border-border rounded-xl p-6">
                        <div className="flex gap-4">
                          <div className="w-20 h-28 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="h-8 w-8 text-accent/40" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{livro.titulo}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{livro.autor}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                                {livro.genero}
                              </span>
                              <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                                Aluguel 30 dias
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <button
                              onClick={() => removeFromRental(livro.id)}
                              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                            <span className="text-xl font-bold text-accent">R$ {(livro.preco * 0.3).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

                <div className="space-y-3 mb-6">
                  {cart.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Compras</span>
                      <span className="font-medium">R$ {totalCompra.toFixed(2)}</span>
                    </div>
                  )}
                  {rentalCart.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Aluguéis</span>
                      <span className="font-medium">R$ {totalAluguel.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Desconto</span>
                    <span className="font-medium text-green-500">R$ 0,00</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleFinalizarCompra}
                  disabled={loading}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-5 w-5" />
                  {loading ? "Processando..." : "Finalizar Pedido"}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Ao finalizar o pedido, você concorda com nossos termos de serviço
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
