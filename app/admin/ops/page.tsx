import OpsAdminClient from "@/components/OpsAdminClient";
import { listApplications, listEvents, listNews } from "@/lib/server/services";

export const dynamic = "force-dynamic";

export default async function OpsAdminPage() {
  const [apps, events, news] = await Promise.all([
    listApplications(),
    listEvents(),
    listNews(),
  ]);

  return (
    <main className="container-max py-16">
      <h1 className="text-3xl font-semibold text-[#10204b]">Operations Admin Tools (MVP)</h1>
      <p className="mt-2 text-sm text-[#556895]">
        Dynamic content publishing and membership workflow operations.
      </p>
      <OpsAdminClient apps={apps} events={events} news={news} />
    </main>
  );
}
