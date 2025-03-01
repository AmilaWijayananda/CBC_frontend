import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeXBlYnJocHFiemhrZ3RrcmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0OTIwNjcsImV4cCI6MjA1NDA2ODA2N30.uiIe-akY6Vvmd9Iw8vNHzGU84hWh30M5iyMG6KVFKSk`;

const url = "https://lrypebrhpqbzhkgtkrgb.supabase.co";

const supabase = createClient(url, key);

export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("File not added");
    }
    let fileName = file.name;
    const extension = fileName.split(".")[fileName.split(".").length - 1];

    const timestamp = new Date().getTime();

    fileName = timestamp +file.name+ "." + extension;

    supabase.storage.from("images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    }).then(()=>{
      const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
      resolve(publicUrl);
    }).catch((err)=>{
      reject(err);
    });
  });
}