import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaSignOutAlt } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Quote {
  id: number;
  title: string;
  status: string; // "In Progress", "Completed", etc.
  progress: number; // Progress in percentage (0-100)
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setError("User not authenticated");

      try {
        const response = await fetch("http://localhost:3000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      }
    };

    const fetchUserQuotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setError("User not authenticated");

      try {
        const response = await fetch("http://localhost:3000/user/quotes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user quotes");
        }

        const quoteData: Quote[] = await response.json();
        setQuotes(quoteData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      }
    };

    fetchUserProfile();
    fetchUserQuotes();
  }, []);

  const handleEditProfile = () => {
    setEditingUser(true);
    setEditedUser(user || {});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    setEditedUser({ ...editedUser, [field]: e.target.value });
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setError("User not authenticated");

    try {
      const response = await fetch("http://localhost:3000/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setUser({ ...user!, ...editedUser });
      setEditingUser(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Rediriger l'utilisateur vers la page de login
  };

  return (
    <div className="flex min-h-screen bg-[#164C4F]">
      <div className="w-64 p-5 bg-[#197277] shadow-inner rounded-r-xl flex flex-col items-start space-y-4">
        <h2 className="text-xl font-bold text-white">Mon Compte</h2>
        <button className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">Tableau de bord</button>
        <button className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">Devis</button>
        <button onClick={handleLogout} className="w-full p-3 bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition text-white">
          Se déconnecter <FaSignOutAlt />
        </button>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6 text-[#197277]">Mon Profil</h1>
        {error && <p className="text-red-500">{error}</p>}

        {user && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#197277]">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#197277]">Informations Personnelles</h2>
              <div>
                {editingUser ? (
                  <>
                    <div>
                      <label>Nom:</label>
                      <input type="text" value={editedUser.name || ""} onChange={(e) => handleChange(e, "name")} className="border p-2 w-full bg-gray-100 rounded-lg" />
                    </div>
                    <div>
                      <label>Email:</label>
                      <input type="email" value={editedUser.email || ""} onChange={(e) => handleChange(e, "email")} className="border p-2 w-full bg-gray-100 rounded-lg" />
                    </div>
                    <div>
                      <label>Téléphone:</label>
                      <input type="text" value={editedUser.phone || ""} onChange={(e) => handleChange(e, "phone")} className="border p-2 w-full bg-gray-100 rounded-lg" />
                    </div>
                    <div>
                      <label>Adresse:</label>
                      <input type="text" value={editedUser.address || ""} onChange={(e) => handleChange(e, "address")} className="border p-2 w-full bg-gray-100 rounded-lg" />
                    </div>
                    <button onClick={handleSaveProfile} className="text-green-500 hover:text-green-700 p-2 mt-4 rounded-lg">
                      <FaSave /> Sauvegarder
                    </button>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Nom:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Téléphone:</strong> {user.phone}
                    </p>
                    <p>
                      <strong>Adresse:</strong> {user.address}
                    </p>
                    <button onClick={handleEditProfile} className="text-blue-500 hover:text-blue-700 p-2 mt-4 rounded-lg">
                      <FaEdit /> Modifier
                    </button>
                  </>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#197277]">Devis en Cours</h2>
              <div>
                {quotes.map((quote) => (
                  <div key={quote.id} className="mb-4">
                    <h3 className="text-lg font-semibold">{quote.title}</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div className="bg-[#197277] h-2.5 rounded-full" style={{ width: `${quote.progress}%` }}></div>
                      </div>
                      <span className="ml-2">{quote.progress}%</span>
                    </div>
                    <p>Status: {quote.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
