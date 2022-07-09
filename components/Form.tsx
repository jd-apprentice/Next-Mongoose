import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { FormError, FormProps, PetForm, TResponse } from "../@types/types";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { mutate } from "swr";

const Form: React.FC<FormProps> = ({ formId, petForm, forNewPet }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [imageUpload, setImageUpload] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();

  const [form, setForm] = useState<PetForm>({
    name: petForm.name,
    owner_name: petForm.owner_name,
    species: petForm.species,
    age: petForm.age,
    image_url: petForm.image_url,
  });

  const uploadFile = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((url) => {
        setImageURL(url);
      });
    });
  };

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: PetForm, firebaseURL: string) => {
    const { id } = router.query;
    try {
      imageURL && imageURL ? null : uploadFile();
      const res: TResponse = await fetch(`/api/pets/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({
          name: form.name,
          owner_name: form.owner_name,
          species: form.species,
          age: form.age,
          image_url: firebaseURL,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status?.toString());
      }

      const { data } = await res.json();

      mutate(`/api/pets/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: PetForm, firebaseURL: string) => {
    try {
      await uploadFile();
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({
          name: form.name,
          owner_name: form.owner_name,
          species: form.species,
          age: form.age,
          image_url: firebaseURL,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: { target: any }) => {
    const { target } = e;
    const { value, name } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewPet ? postData(form, imageURL!) : putData(form, imageURL!);
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err: FormError = {} as FormError;
    if (!form.name) err.name = "Name is required";
    if (!form.owner_name) err.owner_name = "Owner is required";
    if (!form.species) err.species = "Species is required";
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength={20}
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="owner_name">Owner</label>
        <input
          type="text"
          maxLength={20}
          name="owner_name"
          value={form.owner_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="species">Species</label>
        <input
          type="text"
          maxLength={30}
          name="species"
          value={form.species}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />

        <label htmlFor="image_url">Image</label>
        <input
          style={{ padding: "5px" }}
          type="file"
          name="image_url"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setImageUpload(event.target.files![0]);
          }}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
