import DivelogForm from "@/components/functional/divelog-form";
import InfoMessages from "@/components/ui/info-messages";
import PageTitle from "@/components/ui/page-title";
import { getRecord } from "@/server-actions/record";

interface EditDivelogPageProps {
  params: Promise<{ id: string }>;
}

async function EditDivelogPage({ params }: EditDivelogPageProps) {
  const { id } = await params;
  const divelogResponse = await getRecord(Number(id));
  if (!divelogResponse) {
    return <InfoMessages message="Divelog not found" />;
  }
  const divelogData = divelogResponse.data;
  return (
    <div>
      <PageTitle title="Edit Divelog" />
      <DivelogForm formType="edit" divelogData={divelogData} />
    </div>
  );
}

export default EditDivelogPage;
