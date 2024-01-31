
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request) {
  const ck = cookies();
  const names = ck.getAll().map((res) => res.name);

  names.forEach((name) => ck.delete(name));

  return NextResponse.json({
    body:true
  });
}
