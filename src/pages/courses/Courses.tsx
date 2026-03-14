import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, BookOpen, CircleCheck as CheckCircle, Lock, ArrowRight, GraduationCap } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'
import { PremiumFeatureModal } from '../../components/PremiumFeatureModal'
import { COURSES } from './courseData'
import { useCourseProgress } from './useCourseProgress'

function CourseCard({ course }: { course: typeof COURSES[0] }) {
  const { language } = useLanguage()
  const { profile } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const isPremium = profile?.subscription_status === 'active'
  const { completedCount, loading } = useCourseProgress(course.slug)
  const total = course.lessons.length
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0

  return (
    <>
      <div className="group bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.image}
            alt={language === 'en' ? course.titleEn : course.titleEs}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
          <span className="absolute top-4 left-4 bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
            {language === 'en' ? course.categoryEn : course.categoryEs}
          </span>
          {!isPremium && (
            <div className="absolute top-4 right-4 bg-amber-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Lock className="h-3 w-3" />
              {language === 'en' ? 'Premium' : 'Premium'}
            </div>
          )}
          {isPremium && completedCount === total && !loading && (
            <div className="absolute top-4 right-4 bg-green-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              {language === 'en' ? 'Complete' : 'Completado'}
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h2 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
            {language === 'en' ? course.titleEn : course.titleEs}
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
            {language === 'en' ? course.descriptionEn : course.descriptionEs}
          </p>

          {isPremium && !loading && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>{language === 'en' ? `${completedCount} of ${total} lessons` : `${completedCount} de ${total} lecciones`}</span>
                <span>{pct}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                {total} {language === 'en' ? 'lessons' : 'lecciones'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {language === 'en' ? course.estimatedTimeEn : course.estimatedTimeEs}
              </span>
            </div>
            {isPremium ? (
              <Link
                to={`/courses/${course.slug}`}
                className="flex items-center gap-1 text-blue-400 font-medium hover:gap-2 transition-all"
              >
                {completedCount > 0 ? (language === 'en' ? 'Continue' : 'Continuar') : (language === 'en' ? 'Start' : 'Comenzar')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 text-amber-400 font-medium hover:gap-2 transition-all"
              >
                {language === 'en' ? 'Unlock' : 'Desbloquear'}
                <Lock className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
      <PremiumFeatureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        featureName={language === 'en' ? 'Crash Courses' : 'Cursos Intensivos'}
      />
    </>
  )
}

export function Courses() {
  const { language } = useLanguage()
  const { profile, user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const isPremium = profile?.subscription_status === 'active'

  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest mb-5">
              <GraduationCap className="h-4 w-4" />
              {language === 'en' ? 'Premium Crash Courses' : 'Cursos Intensivos Premium'}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {language === 'en' ? 'Structured Learning Paths' : 'Rutas de Aprendizaje Estructuradas'}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Go from beginner to confident investor with step-by-step courses built for real-world execution.'
                : 'Pasa de principiante a inversor seguro con cursos paso a paso diseñados para la ejecución en el mundo real.'}
            </p>
            {!isPremium && user && (
              <div className="mt-6 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm px-5 py-3 rounded-xl">
                <Lock className="h-4 w-4 flex-shrink-0" />
                {language === 'en'
                  ? <span>Courses are a Premium feature. <button onClick={() => setShowModal(true)} className="underline font-semibold hover:text-amber-200">Upgrade to unlock all courses.</button></span>
                  : <span>Los cursos son una función Premium. <button onClick={() => setShowModal(true)} className="underline font-semibold hover:text-amber-200">Actualiza para desbloquear todos los cursos.</button></span>
                }
              </div>
            )}
            {!user && (
              <div className="mt-6 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm px-5 py-3 rounded-xl">
                <Lock className="h-4 w-4 flex-shrink-0" />
                {language === 'en'
                  ? <span>Sign in and upgrade to Premium to access all courses.</span>
                  : <span>Inicia sesión y actualiza a Premium para acceder a todos los cursos.</span>
                }
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {COURSES.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </div>
      <PremiumFeatureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        featureName={language === 'en' ? 'Crash Courses' : 'Cursos Intensivos'}
      />
    </>
  )
}
