import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

interface ProgressMap {
  [lessonSlug: string]: boolean
}

export function useCourseProgress(courseSlug: string) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<ProgressMap>({})
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    if (!user) { setLoading(false); return }
    const { data } = await supabase
      .from('user_course_progress')
      .select('lesson_slug')
      .eq('user_id', user.id)
      .eq('course_slug', courseSlug)
    if (data) {
      const map: ProgressMap = {}
      data.forEach((row) => { map[row.lesson_slug] = true })
      setProgress(map)
    }
    setLoading(false)
  }, [user, courseSlug])

  useEffect(() => { fetchProgress() }, [fetchProgress])

  const markComplete = useCallback(async (lessonSlug: string) => {
    if (!user) return
    await supabase.from('user_course_progress').upsert({
      user_id: user.id,
      course_slug: courseSlug,
      lesson_slug: lessonSlug,
    }, { onConflict: 'user_id,course_slug,lesson_slug' })
    setProgress((prev) => ({ ...prev, [lessonSlug]: true }))
  }, [user, courseSlug])

  const markIncomplete = useCallback(async (lessonSlug: string) => {
    if (!user) return
    await supabase.from('user_course_progress')
      .delete()
      .eq('user_id', user.id)
      .eq('course_slug', courseSlug)
      .eq('lesson_slug', lessonSlug)
    setProgress((prev) => { const n = { ...prev }; delete n[lessonSlug]; return n })
  }, [user, courseSlug])

  const completedCount = Object.values(progress).filter(Boolean).length

  return { progress, loading, markComplete, markIncomplete, completedCount }
}
