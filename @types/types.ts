export interface PetForm {
  name: string;
  owner_name: string;
  species: string;
  age: number;
  poddy_trained: boolean;
  diet: string;
  image_url: string;
  likes: string[];
  dislikes: string[];
}

export interface FormProps {
  formId: string;
  petForm: PetForm;
  forNewPet: boolean;
}

export interface PetsType {
  _id: string;
  name: string;
  image_url: string;
  owner_name: string;
  likes: string[];
  dislikes: string[];
}

export interface Pets {
  pets: PetsType[];
}

export interface PetProps {
  pet: PetsType;
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
