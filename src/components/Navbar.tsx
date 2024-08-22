'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { logout } from "@/lib/auth";
import { User } from "@/types/types";


const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors duration-300">
          Cardápio
        </Link>
        <div className="relative">
          {user ? (
            <div className="flex items-center">
              <span className="text-white font-medium cursor-pointer mr-1" onClick={() => setDropdownOpen(!dropdownOpen)} >{user.nome}</span>
              <FaUserCircle
                size={28}
                className="text-white cursor-pointer hover:text-gray-200 transition-colors duration-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    {user.role !== "user" && (
                      <li>
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          Painel de Admin
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="text-lg font-semibold text-white hover:text-gray-200 transition-colors duration-300">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
