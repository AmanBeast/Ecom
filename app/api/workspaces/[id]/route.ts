import { NextResponse } from "next/server";
import { dataService } from "@/lib/services/dataService";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const workspace = dataService.getWorkspaceById(params.id);
  if (!workspace) {
    return NextResponse.json(
      { success: false, error: "Workspace not found" },
      { status: 404 }
    );
  }

  // Double check privacy requirement: Never return phone numbers
  const safeWorkspace = {
    ...workspace,
    host: {
      id: workspace.host.id,
      name: workspace.host.name,
      avatar: workspace.host.avatar,
      verified: workspace.host.verified,
      joinedYear: workspace.host.joinedYear,
      responseRate: workspace.host.responseRate,
      badge: workspace.host.badge,
    },
  };

  return NextResponse.json({ success: true, data: safeWorkspace });
}
