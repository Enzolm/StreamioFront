import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CallCreateService from "../../admin/service_admin/CreateServiceAPI";
import Logo from "../../../assets/logo.png";
import { Button, Input } from "@components/index";

export default function AdminService() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    if (true) {
      try {
        CallCreateService(data);
        // navigate("/");
      } catch (error) {
        const err = error as Error;
        setError("root", { message: "erreur", type: "custom" });
      }
    }
  };

  return (
    <>
      <form
        className={`rounded-[37px] bg-main shadow-connect flex flex-col transition-all duration-700 items-center p-6 overflow-hidden h-[365px] w-[287px]`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link to="/">
          <img
            src={Logo}
            className="animate-breathing w-32 h-auto max-w-xs mb-6 md:w-40 md:max-w-sm lg:w-48 lg:max-w-md xl:w-56 xl:max-w-lg"
            alt="Logo"
          />
        </Link>
        <div className="flex flex-col ">
          <Input
            {...register("service_titre")}
            label="Entrez votre e-mail"
            type="text"
          />
          <Input
            {...register("service_description")}
            label="Entrez une description"
            type="text"
          />
          <select
            {...register("categorie", { required: "La catégorie est requise" })}
            className="select select-bordered w-full max-w-xs bg-transparent mb-6 text-white border-white"
          >
            <option disabled value="" className="bg-main">
              Sélectionnez une catégorie
            </option>
            <option className="bg-main" value="Vidéo">
              Vidéo
            </option>
            <option className="bg-main" value="Photo">
              Photo
            </option>
            <option className="bg-main" value="Conseil">
              Conseil
            </option>
            <option className="bg-main" value="Autre">
              Autre
            </option>
          </select>
          <Button label="Créer un service" />
          <div className="w-full my-5 h-0.2 bg-gray-400 "></div>
        </div>

        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </form>
    </>
  );
}
