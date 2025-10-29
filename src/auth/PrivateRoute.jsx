"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

export const PrivateRoute = ({ children, rolesAllowed = [] }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Check if user has required role
  if (rolesAllowed.length > 0) {
    const hasRequiredRole = rolesAllowed.some((role) => user.roles?.includes(role))

    if (!hasRequiredRole) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <h1 className="text-4xl font-bold text-destructive">403</h1>
          <p className="text-muted-foreground">Você não tem permissão para acessar esta página.</p>
          <a href="/" className="text-primary hover:underline">
            Voltar para Home
          </a>
        </div>
      )
    }
  }

  return children
}
