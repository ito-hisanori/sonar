import DivelogForm from "@/components/functional/divelog-form";
import PageTitle from "@/components/ui/page-title";
import React from "react";

function EditDivelogPage() {
  return (
    <div>
      <PageTitle title="Edit Divelog" />
      <DivelogForm formType="edit" />
    </div>
  );
}

export default EditDivelogPage;
