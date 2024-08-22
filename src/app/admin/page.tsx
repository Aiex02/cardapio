"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import Navbar from "@/components/Navbar";
import AdminPanel from "@/components/AdminPanel";
import { User } from "@/types/types";

export default function Admin() {
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
    <div>
      <Navbar />
      <AdminPanel />
    </div>
  );
}
