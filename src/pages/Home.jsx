import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Work from '../components/Work';
import TrustedBy from '../components/TrustedBy';
import About from '../components/About';
import Contact from '../components/Contact';
import SplineBackground from '../components/SplineBackground';

export default function Home() {
    return (
        <>
            <SplineBackground />
            <Navbar />
            <main>
                <Hero />
                <Work />
                <TrustedBy />
                <About />
                <Contact />
            </main>
        </>
    );
}
