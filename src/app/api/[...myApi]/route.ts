export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, props: { params: Promise<{ myApi: string[] }> }) {
  const params = await props.params;
  const url = request.url;
  console.log(`---- url: ${url} ----`)
  console.log(`---- params: ${params.myApi.join(',')} ----`)
  return Response.json({ params: `${params.myApi.join(',') }` })
}

export async function POST(request: Request, props: { params: Promise<{ myApi: string[] }> }) {
  const params = await props.params;
  const url = request.url;
  console.log(`---- postUrl: ${url} ----`)
  console.log(`---- postParams: ${params.myApi.join(',') } ----`)
  return Response.json({ params: `${params.myApi.join(',') }` })
}