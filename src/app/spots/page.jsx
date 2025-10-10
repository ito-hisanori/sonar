import { createClient } from "@/utils/supabase/server";

export default async function Spots() {
  const supabase = await createClient();
  const { data: spots } = await supabase.from("spots").select();

  return <pre>{JSON.stringify(spots, null, 2)}</pre>;
}
