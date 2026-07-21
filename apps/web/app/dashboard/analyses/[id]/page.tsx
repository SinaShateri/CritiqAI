import StreamClient from '@/components/pages/dashboard/analyses/id/stream-client';

const Page = async ({ params }: PageProps<'/dashboard/analyses/[id]'>) => {
  const { id } = await params;

  return <StreamClient analysisId={id} />;
};

export default Page;
