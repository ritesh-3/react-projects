import React from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data'

const Projects = () => {

    return (
        <section id='projects' className='projects'>
            <div className="title">
                <h2>Projects</h2>
                <div className="title-underline"></div>
            </div>
            <div className="projects-center">
                {projects.map((project, idx) => {
                    const { image, path, title } = project
                    return (
                        <Link key={idx}
                            to={path}
                            className='project'
                        >
                            <img src={image} alt={title} className='img' />
                            <h5>{title}</h5>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Projects
