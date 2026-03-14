import { useParams, Navigate } from 'react-router-dom'
import { COURSES } from '../courseData'
import { useCourseProgress } from '../useCourseProgress'
import { CourseLayout } from '../CourseLayout'
import { OFLesson1 } from './OFLesson1'
import { OFLesson2 } from './OFLesson2'
import { OFLesson3 } from './OFLesson3'
import { OFLesson4 } from './OFLesson4'
import { OFLesson5 } from './OFLesson5'

const LESSON_MAP: Record<string, React.ComponentType> = {
  'lesson-1': OFLesson1,
  'lesson-2': OFLesson2,
  'lesson-3': OFLesson3,
  'lesson-4': OFLesson4,
  'lesson-5': OFLesson5,
}

const course = COURSES.find((c) => c.slug === 'owner-finance-deals')!

export function OwnerFinanceDeals() {
  const { lessonSlug = 'lesson-1' } = useParams<{ lessonSlug: string }>()
  const { progress, completedCount, markComplete, markIncomplete } = useCourseProgress('owner-finance-deals')

  const LessonContent = LESSON_MAP[lessonSlug]
  if (!LessonContent) return <Navigate to="/courses/owner-finance-deals/lesson-1" replace />

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
