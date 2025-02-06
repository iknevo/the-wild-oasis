import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // https://hxyuutkgtgcugaxwuhrc.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // a. create a new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // b. update an existing cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // if there is already an image we don't need to upload a new one
  // if (hasImage) return data;

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin Image couldn't be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data: cabins, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Cabin couldn't be deleted");
  }

  return cabins;
}
