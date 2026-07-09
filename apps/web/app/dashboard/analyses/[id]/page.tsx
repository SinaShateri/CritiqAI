import StreamClient from '@/components/pages/dashboard/analyses/id/stream-client';

const Page = ({ params }: { params: { id: string } }) => {
  return <StreamClient analysisId={params.id} />;
};

export default Page;
