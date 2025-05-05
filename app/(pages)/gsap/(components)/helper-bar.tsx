import ShinyText from '~/components/gradient-text/shiny-text'

export default function HelperBar() {
  return (
    <div className="absolute sbottom-8 sleft-8 text-white flex justify-between">
      <ShinyText
        text="Made by Svartalheim with 🍙 & 💡"
        // disabled={false}
        speed={3}
      />
    </div>
  )
}
