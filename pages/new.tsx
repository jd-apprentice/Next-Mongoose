import Form from "../components/Form";

const NewPet = () => {
  const petForm = {
    name: "",
    owner_name: "",
    species: "",
    age: 0,
    image_url: "",
  };

  return <Form formId="add-pet-form" petForm={petForm} forNewPet />;
};

export default NewPet;
