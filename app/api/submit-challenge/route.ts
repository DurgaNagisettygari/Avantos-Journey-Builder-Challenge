import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { authToken, solutionLink } = await request.json()

    if (!authToken || !solutionLink) {
      return NextResponse.json({ error: "Auth token and solution link are required" }, { status: 400 })
    }

    const response = await fetch("https://makefizz.buzz/api/challenges/cmbmgaa4n0001kd7yuf4ohhlw/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // The API expects a Bearer token in the Authorization header
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ solutionLink }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { error: errorData.message || `API error: ${response.statusText}` },
        { status: response.status },
      )
    }

    // The API might return an empty body on success, so we handle that.
    const data = await response.json().catch(() => ({ success: true }))
    return NextResponse.json(data)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
