import { Suspense } from "react";
import ActivityClient from "./client";

export const dynamic = "force-dynamic";

const CloudActivityPage = () => {
  return (
    <Suspense>
      <ActivityClient docs={[]} loading={false} />
    </Suspense>
  );
}
export default CloudActivityPage;
