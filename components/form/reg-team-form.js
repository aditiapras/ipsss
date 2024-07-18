"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { setUnit } from "@/lib/post/post-q";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className="disabled:opacity-50 disabled:cursor-not-allowed"
      type="submit"
    >
      {pending ? (
        <p className="flex items-center gap-2">
          <LoaderCircle size={15} className="animate-spin" />
          Loading
        </p>
      ) : (
        "Submit"
      )}
    </Button>
  );
}

export default function RegTeamForm({ teams }) {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        await setUnit(formData);
        router.refresh();
        window.location.reload();
      }}
      className="flex flex-col gap-1 mt-2"
    >
      <label htmlFor="unit_name" className="text-sm font-semibold">
        Unit Name
      </label>
      <input
        type="text"
        name="unit_name"
        id="unit_name"
        className="p-2 rounded-md border rounded-md"
        placeholder="Unit Name"
        required
        autoCapitalize="words"
      />
      <label htmlFor="unit_desc" className="text-sm font-semibold mt-3">
        Unit Description
      </label>
      <input
        type="text"
        name="unit_desc"
        id="unit_desc"
        className="p-2 rounded-md border rounded-md"
        placeholder="Description"
      />
      <input
        type="text"
        name="team_id"
        id="team_id"
        value={teams.id}
        className="hidden"
      />
      <div className="flex gap-2 justify-end mt-5">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <SubmitButton />
      </div>
    </form>
  );
}
