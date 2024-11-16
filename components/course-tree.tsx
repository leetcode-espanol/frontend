'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CourseTreeProps {
  onSelectLesson: (lessonId: string) => void
}

export function CourseTree({ onSelectLesson }: CourseTreeProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([])

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const courseStructure = [
    {
      id: 'module1',
      title: 'Introduction to Web Development',
      lessons: [
        { id: 'lesson1', title: 'HTML Basics' },
        { id: 'lesson2', title: 'CSS Fundamentals' },
      ],
    },
    {
      id: 'module2',
      title: 'JavaScript Essentials',
      lessons: [
        { id: 'lesson3', title: 'Variables and Data Types' },
        { id: 'lesson4', title: 'Functions and Scope' },
      ],
    },
  ]

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Web Development Course</h1>
      {courseStructure.map(module => (
        <div key={module.id} className="mb-4">
          <Button
            variant="ghost"
            className="w-full justify-start font-semibold"
            onClick={() => toggleModule(module.id)}
          >
            {expandedModules.includes(module.id) ? (
              <ChevronDown className="mr-2 h-4 w-4" />
            ) : (
              <ChevronRight className="mr-2 h-4 w-4" />
            )}
            {module.title}
          </Button>
          {expandedModules.includes(module.id) && (
            <ul className="ml-6 mt-2 space-y-2">
              {module.lessons.map(lesson => (
                <li key={lesson.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => onSelectLesson(lesson.id)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {lesson.title}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
