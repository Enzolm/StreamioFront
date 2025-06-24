import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import { useEffect } from "react";

type FormValues = {
  Nom: string;
  categorie: string;
  description: string;
};

function EditService({ id, data }: { id: string; data: FormValues }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    // Set default values for the form fields when `data` changes
    console.log("Data received for editing:", data);
    reset(data);
  }, [data]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form submitted with data:", data);
    await fetch(`http://localhost:3000/update/service/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Modifer le service</DialogTitle>
          <Input type="text" {...register("Nom")} placeholder="Nom" defaultValue={data?.Nom} className="mb-4" />
          <Input type="text" {...register("categorie")} placeholder="Categorie" defaultValue={data?.categorie} className="mb-4" />
          <Input type="text" {...register("description")} placeholder="Description" defaultValue={data?.description} className="mb-4" />
          <Button type="submit">Enregistrer les modifications</Button>
        </form>
      </DialogHeader>
    </DialogContent>
  );
}

export default EditService;
