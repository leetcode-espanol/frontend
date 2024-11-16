"use client";

import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CourseTree } from "./course-tree";
import { LessonContent } from "./lesson-content";

export function CourseLayout() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarContent className="w-auto">
            <CourseTree onSelectLesson={setSelectedLesson} />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-grow overflow-auto m-4">
          <SidebarTrigger />
          <LessonContent lessonId={selectedLesson} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
