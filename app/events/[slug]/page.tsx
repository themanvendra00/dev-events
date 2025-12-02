import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails params={params} />
      </Suspense>
    </main>
  );
}
