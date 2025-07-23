
import { Suspense } from "react";
import ActivityClient from "./client";

export const dynamic = "force-dynamic";

export default function CloudActivityPage() {
  return (
    <Suspense>
      <ActivityClient docs={[]} loading={false} />
    </Suspense>
  );
}
