import { useParams, Navigate } from 'react-router-dom'
import { COURSES } from '../courseData'
import { useCourseProgress } from '../useCourseProgress'
import { CourseLayout } from '../CourseLayout'
import { FPLesson1 } from './FPLesson1'
import { FPLesson2 } from './FPLesson2'
import { FPLesson3 } from './FPLesson3'
import { FPLesson4 } from './FPLesson4'
import { FPLesson5 } from './FPLesson5'

const LESSON_MAP: Record<string, React.ComponentType> = {
  'lesson-1': FPLesson1,
  'lesson-2': FPLesson2,
  'lesson-3': FPLesson3,
  'lesson-4': FPLesson4,
  'lesson-5': FPLesson5,
}

const course = COURSES.find((c) => c.slug === 'flip-profits')!

export function FlipProfits() {
  const { lessonSlug = 'lesson-1' } = useParams<{ lessonSlug: string }>()
  const { progress, completedCount, markComplete, markIncomplete } = useCourseProgress('flip-profits')

  const LessonContent = LESSON_MAP[lessonSlug]
  if (!LessonContent) return <Navigate to="/courses/flip-profits/lesson-1" replace />

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
