"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {
  userData: User;
};

export const UserForm = ({userData}: Props) => {
  const [user, setUser] = useState<User>(
    userData || {
      name: null,
      email: null,
      emailVerified: null,
      image: null,
      website: null,
      githubURL: null,
      linkedInURL: null,
      xUrl: null,
      birthday: null,
      location: null,
    },
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Updated user:', user)
  }

  console.log(user); 
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={user.image || undefined}
            alt={user.name || "User"}
          />
          <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={user.name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={user.email || ""} 
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="url"
            value={user.website || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="githubURL">GitHub URL</Label>
          <Input
            id="githubURL"
            name="githubURL"
            type="url"
            value={user.githubURL || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedInURL">LinkedIn URL</Label>
          <Input
            id="linkedInURL"
            name="linkedInURL"
            type="url"
            value={user.linkedInURL || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="xUrl">X (Twitter) URL</Label>
          <Input
            id="xUrl"
            name="xUrl"
            type="url"
            value={user.xUrl || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            id="birthday"
            name="birthday"
            type="date"
            value={user.birthday || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={user.location || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Button type="submit" onClick={handleSubmit} className="ml-auto">
        Save Changes
      </Button>
    </form>
  );
};
