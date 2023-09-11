
const Hero = () => {
    return (
        <section className='hero'>
            <div className="hero-center">
                <div className="hero-title">
                    <h2>My React Projects</h2>
                    <p>
                        Explore my React projects, designed for learning and mastering the language. Dive in and witness the results of dedication and creativity
                    </p>
                </div>
                <div className="img-container">
                    <img className="img" src={"/imgs/hero.svg"} alt="Hero Image" />
                </div>
            </div>
        </section>
    )
}

export default Hero
