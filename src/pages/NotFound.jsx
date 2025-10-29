import { Link } from "react-router-dom"
import { BookX } from "lucide-react"

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <BookX className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Página não encontrada</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  )
}
