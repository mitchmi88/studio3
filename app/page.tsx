import { Hero }           from '@/components/Hero'
import { About }          from '@/components/About'
import { Services }       from '@/components/Services'
import { GalleryPreview } from '@/components/GalleryPreview'
import { Testimonials }   from '@/components/Testimonials'
import { ContactForm }    from '@/components/ContactForm'
import { ShapeParallax }  from '@/components/ShapeParallax'

export default function HomePage() {
  return (
    <>
      <ShapeParallax />
      <Hero />
      <About />
      <Services />
      <GalleryPreview />
      <Testimonials />
      <ContactForm />
    </>
  )
}
