import HeroSection from '../components/forHomeGuest/HeroSection';
import AboutSection from '../components/forHomeGuest/AboutSection';
import FeaturesSection from '../components/forHomeGuest/FeaturesSection';
import MenuPreviewSection from '../components/forHomeGuest/MenuPreviewSection';
import TestimonialSection from '../components/forHomeGuest/TestimonialSection';
import ContactSection from '../components/forHomeGuest/ContactSection';


export default function HomeGuest() {
  return (
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <MenuPreviewSection />
        <TestimonialSection />
        <ContactSection />
    </div>
  );
}

