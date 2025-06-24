import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import { useEffect } from "react";

type FormValues = {
  email: string;
  nom: string;
  prenom: string;
  isAdmin: number;
  isEmployee: number;
};

function EditUser({ id, data }: { id: string; data: FormValues }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    // Set default values for the form fields when `data` changes
    reset(data);
  }, [data]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form submitted with data:", data);
    await fetch(`http://localhost:3000/update/user/${id}`, {
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
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Make changes to the user information.</DialogDescription>
          <Input type="text" {...register("email")} placeholder="Email" defaultValue={data?.email} className="mb-4" />
          <Input type="text" {...register("nom")} placeholder="Nom" defaultValue={data?.nom} className="mb-4" />
          <Input type="text" {...register("prenom")} placeholder="Prenom" defaultValue={data?.prenom} className="mb-4" />
          <Input type="number" {...register("isAdmin")} placeholder="Admin" defaultValue={data?.isAdmin} className="mb-4" />
          <Input type="number" {...register("isEmployee")} placeholder="Employee" defaultValue={data?.isEmployee} className="mb-4" />
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogHeader>
    </DialogContent>
  );
}

export default EditUser;
