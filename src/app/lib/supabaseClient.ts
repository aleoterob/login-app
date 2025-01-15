import { createClient } from "@supabase/supabase-js";

// Usa las variables de entorno para las credenciales de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Crear instancia del cliente
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
