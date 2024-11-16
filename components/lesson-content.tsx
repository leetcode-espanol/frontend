'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Question } from './question'

interface LessonContentProps {
  lessonId: string | null
}

export function LessonContent({ lessonId }: LessonContentProps) {
  const [showQuestion, setShowQuestion] = useState(false)

  const lessonContent = `
# HTML Basics

In this lesson, we'll cover the fundamentals of HTML (Hypertext Markup Language).

## What is HTML?

HTML is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.

## Video: Introduction to HTML

<video width="100%" controls>
  <source src="https://example.com/intro-to-html.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Basic HTML Structure

Here's a basic HTML structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to My Web Page</h1>
    <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

## Video: Creating Your First HTML Page

<video width="100%" controls>
  <source src="https://example.com/first-html-page.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Now that you've learned the basics, let's test your knowledge!
`

  if (!lessonId) {
    return <div className="p-8">Please select a lesson from the sidebar.</div>
  }

  return (
    <div className="p-8">
      <ReactMarkdown
        components={{
          video: (props) => (
            <video className="w-full max-w-3xl mx-auto my-4" controls {...props} />
          ),
        }}
      >
        {lessonContent}
      </ReactMarkdown>
      {!showQuestion && (
        <Button onClick={() => setShowQuestion(true)} className="mt-4">
          Take the Quiz
        </Button>
      )}
      {showQuestion && <Question />}
    </div>
  )
}