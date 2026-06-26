import Hero from "./components/Hero"
import Introduction from "./components/Introduction"
import Chairperson from "./components/Chairperson"
import Testimonial from "./components/Testimonial"
import Universities from "./components/Universities"

export default function Home() {
  return (
    <main>
      <Hero />
      <Introduction />
      <Chairperson />
      <Testimonial />
      <Universities />
    </main>
  );
}