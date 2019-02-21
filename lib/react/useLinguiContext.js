import { useContext } from 'react'
import { LinguiContext } from './LinguiContext'

export function useLinguiContext () {
  const context = useContext(LinguiContext)
  return context
}
