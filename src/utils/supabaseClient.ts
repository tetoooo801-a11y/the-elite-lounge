import { createClient } from "@supabase/supabase-js";

const getSupabaseCredentials = () => {
  let url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  let key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

  // If variables are missing or stringified "undefined"/"null"
  if (!url || url === "undefined" || url === "null") {
    console.warn("NEXT_PUBLIC_SUPABASE_URL is missing. Using fallback placeholder URL.");
    url = "https://placeholder-project.supabase.co";
  } else {
    // Auto-fix common copy/paste protocol typos
    if (url.startsWith("ttps://")) {
      url = "https://" + url.slice(7);
    } else if (url.startsWith("ttps//")) {
      url = "https://" + url.slice(6);
    } else if (url.startsWith("https//")) {
      url = "https://" + url.slice(7);
    } else if (url.startsWith("http//")) {
      url = "http://" + url.slice(6);
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      console.warn("NEXT_PUBLIC_SUPABASE_URL is missing http/https protocol. Prepending https://");
      url = `https://${url}`;
    }
  }

  if (!key || key === "undefined" || key === "null") {
    console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Using fallback placeholder key.");
    key = "placeholder-anon-key";
  }

  return { url, key };
};

const { url, key } = getSupabaseCredentials();

export const supabase = createClient(url, key);

