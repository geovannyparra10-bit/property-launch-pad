import { useParams, Navigate } from 'react-router-dom'
import { COURSES } from '../courseData'
import { useCourseProgress } from '../useCourseProgress'
import { CourseLayout } from '../CourseLayout'
import { HHLesson1 } from './HHLesson1'
import { HHLesson2 } from './HHLesson2'
import { HHLesson3 } from './HHLesson3'
import { HHLesson4 } from './HHLesson4'
import { HHLesson5 } from './HHLesson5'

const LESSON_MAP: Record<string, React.ComponentType> = {
  'lesson-1': HHLesson1,
  'lesson-2': HHLesson2,
  'lesson-3': HHLesson3,
  'lesson-4': HHLesson4,
  'lesson-5': HHLesson5,
}

const course = COURSES.find((c) => c.slug === 'house-hack-mastery')!

export function HouseHackMastery() {
  const { lessonSlug = 'lesson-1' } = useParams<{ lessonSlug: string }>()
  const { progress, completedCount, markComplete, markIncomplete } = useCourseProgress('house-hack-mastery')

  const LessonContent = LESSON_MAP[lessonSlug]
  if (!LessonContent) return <Navigate to="/courses/house-hack-mastery/lesson-1" replace />

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
