const Subtitle = ({ children }) => {
  return (
    <div className="px-4 py-8">
      <h2 className="relative pl-6 text-2xl font-bold before:absolute before:left-0 before:top-1/2 before:-z-10 before:aspect-square before:h-[50px] before:-translate-y-1/2 before:bg-brand-red before:content-['']">
        {children}
      </h2>
    </div>
  )
}

export default Subtitle
