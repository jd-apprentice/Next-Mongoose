import { CloudinaryImage } from "@cloudinary/url-gen";

export interface PetForm {
  name: string;
  owner_name: string;
  species: string;
  age: number;
  image_url: File | string;
}

export interface FormProps {
  formId: string;
  petForm: PetForm;
  forNewPet: boolean;
}

export interface PetsType {
  _id: string;
  name: string;
  image_url: CloudinaryImage | undefined | Blob | File | string;
  owner_name: string;
}

export interface Pets {
  pets: PetsType[];
}

export interface PetProps {
  pet: PetsType;
}

export interface ServerSideProps {
  params: {
    id: string;
  };
}

export type TResponse = {
  ok: boolean;
  status: number | undefined;
  json: () => Promise<any>;
};

export type App = {
  Component: any;
  pageProps: any;
};

export type FormError = Omit<
  PetForm,
  "age" | "poddy_trained" | "diet" | "likes" | "dislikes"
>;
