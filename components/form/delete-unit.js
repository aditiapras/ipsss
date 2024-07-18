"use client";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { deleteUnit } from "@/lib/delete/delete-q";
import { useRouter } from "next/navigation";
import { LoaderCircle, Trash2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      variant="destructive"
      className="flex items-center gap-2"
    >
      {pending ? (
        <p className="flex items-center gap-2">
          Deleting...
          <LoaderCircle size={15} className="animate-spin" />
        </p>
      ) : (
        <p className="flex items-center gap-2">
          Delete
          <Trash2 size={15} />
        </p>
      )}
    </Button>
  );
}

export default function DeleteUnit({ unitId }) {
  const router = useRouter();
  return (
    <form
      action={async () => {
        await deleteUnit(unitId);
        router.refresh();
        window.location.reload();
      }}
    >
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <SubmitButton />
      </AlertDialogFooter>
    </form>
  );
}
