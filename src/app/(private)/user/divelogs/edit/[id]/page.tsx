"use client";
import DivelogForm from "@/components/functional/divelog-form";
import PageTitle from "@/components/ui/page-title";
import Spinner from "@/components/ui/spinner";
import { useDivelogEdit } from "@/hooks/useDivelogEdit";
import { use } from "react";

function EditDivelogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { loading, record } = useDivelogEdit(id);

  if (loading) return <Spinner />;
  if (!record) return <div>Divelog not found</div>;

  return (
    <div>
      <PageTitle title="Edit Divelog" />
      <DivelogForm formType="edit" divelogData={record} />
    </div>
  );
}

export default EditDivelogPage;
