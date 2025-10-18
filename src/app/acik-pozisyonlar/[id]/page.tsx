import JobDetailClient from './JobDetailClient'

interface PageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: PageProps) {
  return <JobDetailClient jobId={params.id} />
}
