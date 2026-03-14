import { useParams, Navigate } from 'react-router-dom'
import { COURSES } from '../courseData'
import { useCourseProgress } from '../useCourseProgress'
import { CourseLayout } from '../CourseLayout'
import { BRLesson1 } from './BRLesson1'
import { BRLesson2 } from './BRLesson2'
import { BRLesson3 } from './BRLesson3'
import { BRLesson4 } from './BRLesson4'
import { BRLesson5 } from './BRLesson5'

const LESSON_MAP: Record<string, React.ComponentType> = {
  'lesson-1': BRLesson1,
  'lesson-2': BRLesson2,
  'lesson-3': BRLesson3,
  'lesson-4': BRLesson4,
  'lesson-5': BRLesson5,
}

const course = COURSES.find((c) => c.slug === 'brrr-blueprint')!

export function BRRRBlueprint() {
  const { lessonSlug = 'lesson-1' } = useParams<{ lessonSlug: string }>()
  const { progress, completedCount, markComplete, markIncomplete } = useCourseProgress('brrr-blueprint')

  const LessonContent = LESSON_MAP[lessonSlug]
  if (!LessonContent) return <Navigate to="/courses/brrr-blueprint/lesson-1" replace />

  return (
    <CourseLayout
      course={course}
      lessonSlug={lessonSlug}
      progress={progress}
      completedCount={completedCount}
      onMarkComplete={markComplete}
      onMarkIncomplete={markIncomplete}
    >
      <LessonContent />
    </CourseLayout>
  )
}
