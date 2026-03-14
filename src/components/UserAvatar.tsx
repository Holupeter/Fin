"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@/providers/AuthProvider";

interface UserAvatarProps {
  className?: string;
  size?: number;
}

export default function UserAvatar({ className = "w-10 h-10", size = 40 }: UserAvatarProps) {
  const { user } = useAuth();
  const userId = user?.id || "";
  const convexUser = useQuery(api.users.getUser, { userId });
  const avatarUrl = useQuery(api.users.getAvatarUrl, { storageId: convexUser?.avatarStorageId });

  const finalUrl = avatarUrl || "/assets/images/avatars/emma-richardson.jpg";

  return (
    <div className={`rounded-full bg-white overflow-hidden border border-grey-500 relative ${className}`}>
      <Image 
        src={finalUrl} 
        alt="Profile" 
        fill 
        sizes={`${size}px`} 
        className="object-cover" 
      />
    </div>
  );
}
