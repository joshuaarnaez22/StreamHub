"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AboutCardModalProps {
  initialBio: string | null;
}
export const AboutCardModal = ({ initialBio }: AboutCardModalProps) => {
  const [bio, setBio] = useState<string | null>(initialBio);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsPending(true);
      await axios.put("/api/user-actions/user", {
        bio,
      });
      toast.success("User bio updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      document.getElementById("closeDialog")?.click();
      setIsPending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="ml-auto" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit bio</DialogTitle>
        </DialogHeader>
        <form className=" space-y-14" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              placeholder="Bio"
              value={bio ?? ""}
              onChange={handleChange}
              disabled={isPending}
            />
          </div>
          <div className="flex justify-between ">
            <DialogClose asChild>
              <Button variant="ghost" type="button" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button variant="primary" type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
