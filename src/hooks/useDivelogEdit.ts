import { useEffect, useState } from "react";
import { Record } from "@/interfaces";
import { getRecord } from "@/server-actions/record";
import toast from "react-hot-toast";

export const useDivelogEdit = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState<Record | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true);
        const response = await getRecord(Number(id));

        if (response.success) {
          setRecord(response.data);
        } else {
          toast.error(response.message || "Divelog not found");
        }
      } catch (error) {
        toast.error("Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  return {
    loading,
    record,
  };
};
