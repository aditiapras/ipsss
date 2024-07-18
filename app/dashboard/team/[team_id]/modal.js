import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import RegTeamForm from "@/components/form/reg-team-form";

export default function ModalUnit({ team }) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-sm font-medium text-blue-400 hover:underline hover:text-blue-500">
            + Add Team Unit
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create team unit</AlertDialogTitle>
            <AlertDialogDescription>
              Create team unit, to be used in team. You can create multiple team
              unit for each team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <RegTeamForm teams={team} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
