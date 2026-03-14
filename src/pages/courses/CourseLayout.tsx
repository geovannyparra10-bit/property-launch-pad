import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CircleCheck as CheckCircle, Circle, Trophy, Lock, ChevronRight } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'
import { PremiumFeatureModal } from '../../components/PremiumFeatureModal'
import { useState } from 'react'
import type { Course } from './courseData'

interface CourseLayoutProps {
  course: Course
  lessonSlug: string
  progress: Record<string, boolean>
  completedCount: number
  onMarkComplete: (slug: string) => void
  onMarkIncomplete: (slug: string) => void
  children: React.ReactNode
}

export function CourseLayout({
  course,
  lessonSlug,
  progress,
  completedCount,
  onMarkComplete,
  onMarkIncomplete,
  children,
}: CourseLayoutProps) {
  const { language } = useLanguage()
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const isPremium = profile?.subscription_status === 'active'

  const currentIndex = course.lessons.findIndex((l) => l.slug === lessonSlug)
  const currentLesson = course.lessons[currentIndex]
  const prevLesson = course.lessons[currentIndex - 1]
  const nextLesson = course.lessons[currentIndex + 1]
  const total = course.lessons.length
  const allDone = completedCount === total
  const isComplete = progress[lessonSlug]

  if (!isPremium) {
    return (
      <>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl inline-flex mb-6">
              <Lock className="h-12 w-12 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              {language === 'en' ? 'Premium Required' : 'Se Requiere Premium'}
            </h2>
            <p className="text-gray-400 mb-6">
              {language === 'en'
                ? 'Crash Courses are a Premium feature. Upgrade to unlock all courses and track your progress.'
                : 'Los Cursos Intensivos son una función Premium. Actualiza para desbloquear todos los cursos y seguir tu progreso.'}
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/courses" className="px-5 py-2.5 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors">
                {language === 'en' ? 'Back to Courses' : 'Volver a Cursos'}
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                {language === 'en' ? 'Upgrade Now' : 'Actualizar Ahora'}
              </button>
            </div>
          </div>
        </div>
        <PremiumFeatureModal isOpen={showModal} onClose={() => setShowModal(false)} featureName={language === 'en' ? 'Crash Courses' : 'Cursos Intensivos'} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-6">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-5 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                {language === 'en' ? 'All Courses' : 'Todos los Cursos'}
              </Link>

              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
                <h2 className="text-sm font-bold text-white mb-1 leading-snug">
                  {language === 'en' ? course.titleEn : course.titleEs}
                </h2>
                <p className="text-xs text-gray-400 mb-4">
                  {completedCount}/{total} {language === 'en' ? 'lessons complete' : 'lecciones completadas'}
                </p>

                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${total > 0 ? Math.round((completedCount / total) * 100) : 0}%` }}
                  />
                </div>

                <nav className="space-y-1">
                  {course.lessons.map((lesson, i) => {
                    const done = progress[lesson.slug]
                    const isCurrent = lesson.slug === lessonSlug
                    return (
                      <Link
                        key={lesson.slug}
                        to={`/courses/${course.slug}/${lesson.slug}`}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                          isCurrent
                            ? 'bg-blue-600/20 border border-blue-500/40 text-white'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {done ? (
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle className={`h-4 w-4 flex-shrink-0 ${isCurrent ? 'text-blue-400' : 'text-gray-600'}`} />
                        )}
                        <span className="leading-tight">
                          <span className="text-xs text-gray-500 mr-1">{i + 1}.</span>
                          {language === 'en' ? lesson.titleEn : lesson.titleEs}
                        </span>
                      </Link>
                    )
                  })}
                </nav>

                {allDone && (
                  <div className="mt-5 p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <p className="text-green-400 text-xs font-semibold">
                      {language === 'en' ? 'Course Complete!' : '¡Curso Completado!'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span>{language === 'en' ? course.titleEn : course.titleEs}</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-gray-300">{language === 'en' ? currentLesson?.titleEn : currentLesson?.titleEs}</span>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {language === 'en' ? currentLesson?.titleEn : currentLesson?.titleEs}
                </h1>
                <span className="text-xs text-gray-500 hidden sm:block">
                  {language === 'en' ? `Lesson ${currentIndex + 1} of ${total}` : `Lección ${currentIndex + 1} de ${total}`}
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-700 mb-8" />

            <div className="prose-article">
              {children}
            </div>

            <div className="mt-10 p-5 bg-gray-800 border border-gray-700 rounded-2xl">
              {!isComplete ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {language === 'en' ? 'Finished this lesson?' : '¿Terminaste esta lección?'}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {language === 'en' ? 'Mark it complete to track your progress.' : 'Márcala como completada para seguir tu progreso.'}
                    </p>
                  </div>
                  <button
                    onClick={() => onMarkComplete(lessonSlug)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
                  >
                    <CheckCircle className="h-4 w-4" />
                    {language === 'en' ? 'Mark Complete' : 'Marcar Completa'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {language === 'en' ? 'Lesson Complete' : 'Lección Completada'}
                      </p>
                      <button
                        onClick={() => onMarkIncomplete(lessonSlug)}
                        className="text-gray-500 text-xs hover:text-gray-300 transition-colors mt-0.5"
                      >
                        {language === 'en' ? 'Mark as incomplete' : 'Marcar como incompleta'}
                      </button>
                    </div>
                  </div>
                  {nextLesson ? (
                    <button
                      onClick={() => navigate(`/courses/${course.slug}/${nextLesson.slug}`)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
                    >
                      {language === 'en' ? 'Next Lesson' : 'Siguiente Lección'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : allDone ? (
                    <Link
                      to="/courses"
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors"
                    >
                      <Trophy className="h-4 w-4" />
                      {language === 'en' ? 'View All Courses' : 'Ver Todos los Cursos'}
                    </Link>
                  ) : null}
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              {prevLesson ? (
                <Link
                  to={`/courses/${course.slug}/${prevLesson.slug}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors group"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  {language === 'en' ? prevLesson.titleEn : prevLesson.titleEs}
                </Link>
              ) : <div />}
              {nextLesson ? (
                <Link
                  to={`/courses/${course.slug}/${nextLesson.slug}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors group"
                >
                  {language === 'en' ? nextLesson.titleEn : nextLesson.titleEs}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : <div />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
