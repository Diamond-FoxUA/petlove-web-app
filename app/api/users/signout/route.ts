import { NextResponse } from "next/server";
import { api, type ApiError } from "../../api";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      try {
        await api.post("/users/signout", null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.log("Sighout failed: ", error);
      }
    }

    cookieStore.delete("accessToken");

    return NextResponse.json(
      { message: "Logout successfull" },
      { status: 200 },
    );
  } catch (error) {
    const axiosError = error as ApiError;

    return NextResponse.json(
      { error: axiosError.message || "Internal Server Error" },
      { status: axiosError.status || 500 },
    );
  }
}
