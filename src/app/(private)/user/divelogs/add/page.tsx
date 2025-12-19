import DivelogForm from "@/components/functional/divelog-form";
import PageTitle from "@/components/ui/page-title";
import React from "react";

function AddDivelog() {
  return (
    <div>
      <PageTitle title="Add Divelog" />
      <DivelogForm formType="add" />
    </div>
  );
}

export default AddDivelog;
