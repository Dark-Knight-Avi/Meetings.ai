"use client"

import { Button, Input } from "@/components/ui";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const {data: session} = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async () => {
      await authClient.signUp.email({
        name,
        email,
        password
      }, {
        onError: () => {
          window.alert("Something went wrong!");
        },
        onSuccess: () => {
          window.alert("User created successfully!");
        }
      })
  }
  const handleOnLogout = async () => {
    await authClient.signOut();
  }
  const handleOnLogin = async () => {
      await authClient.signIn.email({
        email,
        password
      }, {
        onError: () => {
          window.alert("Something went wrong!");
        },
        onSuccess: () => {
          window.alert("User login successfully!");
        }
      })
  }
  if (session) {
    return (
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-2xl">Welcome, {session.user.name}!</h1>
        <p className="text-gray-600">You are logged in.</p>
        <Button onClick={handleOnLogout}>Log Out</Button>
      </div>
    );
  }
  
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Input placeholder="name" value={name} onChange={e => setName(e.target.value)}/>
        <Input placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <Input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <Button onClick={handleOnSubmit}>
          Sign Up
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Input placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <Input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <Button onClick={handleOnLogin}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
