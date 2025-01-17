import { supabase } from '../../../supabaseClient'

export const fetchFromSchema = async (table: string): Promise<T[] | null> => {
  try {
    let { data, error } = await supabase.from(table).select('*') // Especificar el esquema
    console.log(data)
    if (error) throw new Error(error.message)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}
