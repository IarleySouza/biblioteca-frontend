"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { livrosAPI } from "../api/api"
import { toast } from "react-toastify"
import { ArrowLeft, Download, Loader2 } from "lucide-react"

export const LivroView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPdf()
  }, [id])

  const fetchPdf = async () => {
    try {
      const response = await livrosAPI.getPdf(id)
      const blob = new Blob([response.data], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
    } catch (error) {
      toast.error("Erro ao carregar o PDF do livro")
      navigate("/meus-livros")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = `livro-${id}.pdf`
      link.click()
      toast.success("Download iniciado!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando livro...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/meus-livros")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para Biblioteca</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Baixar PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pdfUrl ? (
          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            style={{ height: "calc(100vh - 200px)" }}
          >
            <iframe src={pdfUrl} className="w-full h-full" title="PDF Viewer" />
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Não foi possível carregar o PDF</p>
          </div>
        )}
      </div>
    </div>
  )
}
