export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(
  request: Request,
) {
  const url = request.url;
  console.log(`---- url: ${url} ----`)
  return Response.json({ params: `${url}` })
}

export async function POST(
  request: Request,
) {
  const url = request.url;
  console.log(`---- postUrl: ${url} ----`)
  return Response.json({ params: `${url}` })
}