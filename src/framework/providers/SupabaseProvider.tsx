import React, { createContext, useContext, ReactNode } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../../../supabaseClient'

type SupabaseContextType = {
  supabase: SupabaseClient
}

// Crea el contexto con un valor inicial `null` para TypeScript
const SupabaseContext = createContext<SupabaseContextType | null>(null)

// Props para el proveedor del contexto
interface SupabaseProviderProps {
  children: ReactNode // Especifica que `children` puede ser cualquier nodo React
}

// Define el proveedor del contexto
export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children,
}) => {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

// Hook para usar el contexto de Supabase
export const useSupabase = (): SupabaseContextType => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}
