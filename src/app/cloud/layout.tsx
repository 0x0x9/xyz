import CloudLayoutClient from './layout-client';

export default function CloudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CloudLayoutClient>{children}</CloudLayoutClient>;
}
