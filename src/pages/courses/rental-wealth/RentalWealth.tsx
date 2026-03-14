import { useParams, Navigate } from 'react-router-dom'
import { COURSES } from '../courseData'
import { useCourseProgress } from '../useCourseProgress'
import { CourseLayout } from '../CourseLayout'
import { RWLesson1 } from './RWLesson1'
import { RWLesson2 } from './RWLesson2'
import { RWLesson3 } from './RWLesson3'
import { RWLesson4 } from './RWLesson4'
import { RWLesson5 } from './RWLesson5'

const LESSON_MAP: Record<string, React.ComponentType> = {
  'lesson-1': RWLesson1,
  'lesson-2': RWLesson2,
  'lesson-3': RWLesson3,
  'lesson-4': RWLesson4,
  'lesson-5': RWLesson5,
}

const course = COURSES.find((c) => c.slug === 'rental-wealth')!

export function RentalWealth() {
  const { lessonSlug = 'lesson-1' } = useParams<{ lessonSlug: string }>()
  const { progress, completedCount, markComplete, markIncomplete } = useCourseProgress('rental-wealth')

  const LessonContent = LESSON_MAP[lessonSlug]
  if (!LessonContent) return <Navigate to="/courses/rental-wealth/lesson-1" replace />

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
