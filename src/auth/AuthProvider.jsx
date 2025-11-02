"use client"

import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          logout()
        } else {
          setUser({
            id: decoded.id || decoded.userId || decoded.sub,
            email: decoded.sub,
            roles: decoded.roles || [],
          })
        }
      } catch (error) {
        console.error("Invalid token:", error)
        logout()
      }
    }
    setLoading(false)
  }, [])

  const login = (token) => {
    localStorage.setItem("token", token)
    const decoded = jwtDecode(token)
    const userData = {
      id: decoded.id || decoded.userId || decoded.sub,
      email: decoded.sub,
      roles: decoded.roles || [],
    }
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  const hasRole = (role) => {
    return user?.roles?.includes(role) || false
  }

  const isCliente = () => hasRole("ROLE_CLIENTE")
  const isFuncionario = () => hasRole("ROLE_FUNCIONARIO")
  const isAdmin = () => hasRole("ROLE_ADMINISTRADOR")

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        hasRole,
        isCliente,
        isFuncionario,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
