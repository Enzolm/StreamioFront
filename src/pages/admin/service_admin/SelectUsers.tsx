import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type User = {
  id: number;
  prenom?: string;
  nom?: string;
  email?: string;
};

interface Props {
  onSelect: (id: number, closed: boolean) => void;
}

const UserSelectPopup: React.FC<Props> = ({ onSelect }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/get/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erreur récupération utilisateurs :", err));
  }, []);

  const handleSelect = (value: string) => {
    setSelectedId(Number(value));
    setOpen(false);
  };

  const handleSave = () => {
    if (selectedId !== null) {
      onSelect(selectedId, true); // on renvoie l'id et l'état de fermeture au parent
      setOpen(false); // et on ferme le Dialog
      console.log("Utilisateur sélectionné :", selectedId);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Choisir un utilisateur</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 mt-4">
        <Label>Liste des utilisateurs</Label>
        <Select onValueChange={handleSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un utilisateur" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.prenom ?? ""} {user.nom ?? ""} ({user.email ?? "email inconnu"})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSave} disabled={selectedId === null}>
          Sauvegarder
        </Button>
      </div>
    </DialogContent>
  );
};

export default UserSelectPopup;
