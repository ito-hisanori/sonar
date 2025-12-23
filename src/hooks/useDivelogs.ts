import { useEffect, useState } from "react";
import { Record, User } from "@/interfaces";
import { getLoggedInUser } from "@/server-actions/users";
import toast from "react-hot-toast";
import { deleteRecord, getAllRecords } from "@/server-actions/record";

export const useDivelogs = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<Record[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);

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
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchRecords(Number(user.id));
    }
  }, [user?.id]);

  return {
    loading,
    records,
    user,
    deleteDialogOpen,
    setDeleteDialogOpen,
    openDeleteDialog,
    handleDelete,
  };
};
