// components/BottomBar.tsx
'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet' // from shadcn

export function BottomBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-fit">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-center gap-2 p-2 bg-black text-white rounded-full shadow-xl">
          <SheetTrigger asChild>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-white hover:text-black transition"
              aria-label="Open Menu"
            >
              <PlusIcon size={20} />
            </button>
          </SheetTrigger>
        </div>

        <SheetContent
          side="left"
          className="p-4 max-h-[70vh] overflow-y-auto bg-white shadow-xl"
        >
          <SheetTitle>a</SheetTitle>
          {/* Put your content here */}
          <div className="text-center text-lg font-semibold mb-4">
            We are Büro
          </div>
          <ul className="grid grid-cols-2 gap-4 text-left">
            <li>Homepage</li>
            <li>Studios</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}
