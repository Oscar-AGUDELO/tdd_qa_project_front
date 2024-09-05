export async function GET(request: Request) {
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "API-Key": process.env.DATA_API_KEY!,
  //   },
  // });
  // request.body
  const res = { name: "Oscar", age: 28 };
  const user = res;

  return Response.json({ id });
}
