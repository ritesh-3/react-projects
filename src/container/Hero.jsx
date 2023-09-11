import { AiOutlineArrowRight } from "react-icons/ai"
const Hero = () => {

    const exploreButtonCLicked = () => {
        const section = document.getElementById("projects");
        section.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section className='hero'>
            <div className="hero-center">
                <div className="hero-title">
                    <h2>My React Projects</h2>
                    <p>
                        Dive into my React projects, crafted for learning and mastery. Witness the fruits of dedication and creativity as you explore each endeavor. Experience the world of web development through hands-on projects designed to enhance your skills. Join me on this educational journey through the realm of React.  </p>
                    <button onClick={exploreButtonCLicked} className="explore-projects">
                        <span>Explore </span>
                        <AiOutlineArrowRight />
                    </button>
                </div>
                <div className="img-container">
                    <img className="img" src={"/imgs/hero.svg"} alt="Hero Image" />
                </div>
            </div>
        </section>
    )
}

export default Hero
