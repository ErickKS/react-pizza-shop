import { useMutation, useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";

import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { signOut } from "@/api/sign-out";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Dialog } from "./ui/dialog";
import { StoreProfileDialog } from "./store-profile-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function AccountMenu() {
  const navigate = useNavigate();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
  });

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
  });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => navigate("/sign-in", { replace: true }),
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} className="flex items-center gap-2 select-none">
            {isLoadingManagedRestaurant ? <Skeleton className="h-4 w-10" /> : managedRestaurant?.name}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingManagedRestaurant ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-sm font-normal text-muted-foreground">{profile?.email}</span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="size-4 mr-2" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400" disabled={isSigningOut}>
            <button className="w-full" onClick-={() => signOutFn()}>
              <LogOut className="size-4 mr-2" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  );
}
