"use client"

import { useMemo } from "react"

type CurrentYearProps = {
  template: string
}

export function CurrentYear({ template }: CurrentYearProps) {
  const year = useMemo(() => new Date().getFullYear(), [])
  return <>{template.replace("{{year}}", year.toString())}</>
}
