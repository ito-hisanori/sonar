"use client";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import Link from "next/link";
import React, { useEffect } from "react";
import { Record } from "@/interfaces";
import { deleteRecord, getAllRecords } from "@/server-actions/record";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import InfoMessages from "@/components/ui/info-messages";
import toast from "react-hot-toast";
import { User } from "@supabase/supabase-js";
import { getLoggedInUser } from "@/server-actions/users";
import { truncateHtml } from "@/helpers/truncate-html";

function userDivelogPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [records, setRecords] = React.useState<Record[]>([]);
  const [user, setUser] = React.useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [recordToDelete, setRecordToDelete] = React.useState<number | null>(
    null
  );

  const fetchUser = async () => {
    const response = await getLoggedInUser();
    if (response.success) {
      setUser(response.data);
    } else {
      if (response.message !== undefined) {
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchRecords = async (user_id: number) => {
    setLoading(true);
    const response = await getAllRecords(user_id);
    if (response.success) {
      setRecords(response.data);
    } else {
      setRecords([]);
    }
    setLoading(false);
  };

  const openDeleteDialog = (id: number) => {
    setRecordToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (recordToDelete === null) return;

    setLoading(true);
    setDeleteDialogOpen(false);

    const response = await deleteRecord(recordToDelete);
    if (response.success) {
      setRecords((prev) => prev.filter((rcd) => rcd.id !== recordToDelete));
      if (response.message !== undefined) {
        toast.success(response.message);
      }
    } else {
      if (response.message !== undefined) {
        toast.error(response.message);
      }
    }
    setLoading(false);
    setRecordToDelete(null);
  };

  useEffect(() => {
    if (user?.id) {
      fetchRecords(Number(user.id));
    }
  }, [user?.id]);

  const columns = [
    "Rate",
    "Dived at",
    "Description",
    "Created at",
    "Updated at",
    "action",
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <PageTitle title="Divelogs" />
        <Button>
          <Link href="/user/divelogs/add">Add divelog</Link>
        </Button>
      </div>

      {loading && <Spinner />}

      {!loading && records.length === 0 && (
        <InfoMessages message="No divelogs found. Please add a divelog." />
      )}

      {!loading && records.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              {columns.map((column) => (
                <TableHead className="font-bold text-primary" key={column}>
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((recordData: Record) => (
              <TableRow key={recordData.id}>
                <TableCell>{recordData.rate}</TableCell>
                <TableCell>{getDateTimeFormat(recordData.dived_at)}</TableCell>
                <TableCell>
                  {truncateHtml(recordData.description, 30)}
                </TableCell>
                <TableCell>
                  {getDateTimeFormat(recordData.created_at)}
                </TableCell>
                <TableCell>
                  {getDateTimeFormat(recordData.updated_at)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-5 p-3">
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() =>
                        router.push(`/user/divelogs/edit/${recordData.id}`)
                      }
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() => openDeleteDialog(recordData.id)}
                      disabled={loading}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。このダイブログを削除します。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              削除する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default userDivelogPage;
