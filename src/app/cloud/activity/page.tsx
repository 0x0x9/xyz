
import { Suspense } from "react";
import ActivityClient from "./client";

export default function CloudActivityPage() {
  return (
    <Suspense>
      <ActivityClient docs={[]} loading={false} />
    </Suspense>
  );
}
