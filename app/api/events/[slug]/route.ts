import { Event } from "@/database";
import type { IEvent } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return NextResponse.json(
        { message: "Invalid slug parameter. Slug is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    const normalizedSlug = slug.toLowerCase().trim();
    await connectDB();
    const event = await Event.findOne({ slug: normalizedSlug }).lean<IEvent>();
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${normalizedSlug}" not found.` },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    if (error instanceof Error) {
      if (error.message.includes("MONGODB_URI") || error.message.includes("connection")) {
        return NextResponse.json(
          {
            message: "Database connection error",
            error: "Unable to connect to the database. Please try again later.",
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
