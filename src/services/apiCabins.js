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
  const hasImageUrl = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImageUrl
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

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin Image couldn't be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  await deleteCabinImage(id);
  const { data: cabins, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Cabin couldn't be deleted");
  }

  return cabins;
}

async function deleteCabinImage(id) {
  const selectedCabin = await (
    await getCabins()
  ).find((cabin) => cabin.id === id);

  const path = selectedCabin.image.replace(supabaseUrl, "");
  const filePathArray = path.split("/");
  const fileName = filePathArray.slice(-1).at(0);
  const { error } = await supabase.storage
    .from("cabin-images")
    .remove([fileName]);
  if (error) {
    throw new Error("Could not delete the image from the buckets");
  }
}
