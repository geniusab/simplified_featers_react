import supabase, { supabaseUrl } from "./supabase";
import { toast } from "react-hot-toast";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("cabins", error);
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  try {
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select();

    if (error) {
      throw new Error("Cabin could not be added");
    }

    // 2 upload image

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.at(0).id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created",
      );
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}
