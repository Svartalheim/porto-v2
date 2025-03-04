'use client'
import { Button } from '~/components/button'
import ShinyText from '~/components/gradient-text/shiny-text'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'

export default function Contact() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type="button"
            className="fixed p-3 rounded-md top-page right-page z-2 flex flex-col uppercase font-mono bg-[rgba(var(--rgb-theme-primary),0.8)]"
          >
            <ShinyText
              text="Contact"
              // disabled={false}
              speed={3}
            />
          </Button>
        </SheetTrigger>
        <SheetContent className="font-mono">
          <SheetHeader>
            <SheetTitle>Role Details</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}
