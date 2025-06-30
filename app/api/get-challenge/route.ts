import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookie = "fbmd_token=fbmd_b2a6491e5e87869a356b05390c3d49f3265245077836c7f38f6405580476f838"

    const response = await fetch("https://makefizz.buzz/api/challenges/cmbmgaa4n0001kd7yuf4ohhlw", {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "API error" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
