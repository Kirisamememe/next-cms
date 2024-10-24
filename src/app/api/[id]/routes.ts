export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(
  request: Request,
  { params }: { params: { myApi: string, id: string } }
) {
  const url = request.url;
  console.log(`---- url: ${url} ----`)
  console.log(`---- params: ${params.myApi} ----`)
  return Response.json({ params: `${params.myApi}` })
}

export async function POST(
  request: Request,
  { params }: { params: { myApi: string, id: string } }
) {
  const url = request.url;
  console.log(`---- postUrl: ${url} ----`)
  console.log(`---- postParams: ${params.myApi}, ${params.id} ----`)
  return Response.json({ params: `${params.myApi}, ${params.id}` })
}