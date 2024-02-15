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
import { UploadDropzone } from "@/lib/uploadthing";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoCardModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}
export const InfoCardModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoCardModalProps) => {
  const [name, setName] = useState(initialName);
  const [isPending, setIsPending] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) return;
    try {
      setIsPending(true);
      await axios.put("/api/user-actions/chat/toogle", {
        name,
      });
      toast.success("Steam settings updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      document.getElementById("closeDialog")?.click();
      setIsPending(false);
    }
  };

  const handleRemoveThumbnail = async () => {
    if (!thumbnailUrl) return;
    try {
      setIsPending(true);
      await axios.put("/api/user-actions/chat/toogle", {
        thumbnailUrl: null,
      });
      toast.success("Steam thumbnail removed");
      setThumbnailUrl("");
      document.getElementById("closeDialog")?.click();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
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
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form className=" space-y-14" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Stream name"
              value={name}
              onChange={handleChange}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Upload</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className=" absolute top-2 right-2 z-10">
                  <Hint label="Remove thumbnail" asChild>
                    <Button
                      type="button"
                      disabled={isPending}
                      className="h-auto w-auto p-1.5"
                      onClick={() => handleRemoveThumbnail()}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={thumbnailUrl}
                  alt="thumbnail"
                  fill
                  className=" object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF",
                    },
                    allowedContent: {
                      color: "#FFFFFF",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res[0].url);
                    router.refresh();
                  }}
                />
              </div>
            )}
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
