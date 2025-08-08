let storedName = "";
export const GET = async () => {
  return new Response(JSON.stringify({ name: storedName }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    if (!data.name || typeof data.name !== "string") {
      return new Response(
        JSON.stringify({
          error: "Invalid name format. Please provide a string.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ message: `Hello, ${data.name}!` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON or server error." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
