"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AddFoodForm from "@/components/AddFoodForm";
import { User } from "@/types/types";

export default function AddFood() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const currentUser = userDoc.data() as User;
          setUser(currentUser);

          if (currentUser.role === "user") {
            router.push("/");
          }
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="container mx-auto">
            <AddFoodForm />
          </div>
        </div>
      </div>
    </div>
  );
}
