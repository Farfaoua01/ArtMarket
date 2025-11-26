import React from 'react';
import aboutpicture from '../../assets/images/aboutpicture.png';
import profilepicture from '../../assets/images/profilepicture.png';
import Topnavbar from '../../header/navbar';
import { motion } from 'framer-motion';
function About() {
    return (
        <div>
            <div>
                <Topnavbar />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
                <motion.div initial={{ opacity: 0, y: -80 }} // Initial animation state
                    animate={{ opacity: 1, y: 0 }} // Animation to play on load
                    transition={{ duration: 1 }}>
                    <h2 style={{ marginLeft: '279px', fontFamily: 'Playfair', fontSize: '40px' }}>
                        About the Creator.</h2>
                </motion.div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '19px' }}>
                    <motion.div style={{ fontSize: '19px', width: '600px' }}
                        initial={{ opacity: 0, x: -100 }} // Initial animation state
                        animate={{ opacity: 1, x: 0 }} // Animation to play on load
                        transition={{ duration: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '10px' }}>
                            <img src={profilepicture} style={{
                                width: '85px', height: '85px',
                                borderRadius: '90px'
                            }} />
                            <div style={{ fontSize: '16px', marginLeft: '10px', textAlign: 'center', alignItems: 'center' }}>
                                <p>FARFAOUA <br />Moroccan</p>
                            </div>
                        </div>
                        <p><b>« The women on my canvases are primarily represented by emotion.
                            Behind their external beauty, there is always a storm of feelings,
                            a character, and a story that makes each of my portraits unique. »</b>
                            Anna Briukhovetska, a Ukrainian painter, wants to show all of the
                            goodness and beauty in life and nature in her works. She transforms
                            her feelings into color and her emotions into contrasts. Briukhovetska
                            favors the use of bright and opposing colors in her compositions.
                            Her portraits focus on the look of the subject and are intended
                            to show emotion and character. She creates using oils and acrylics on canvas.</p>
                    </motion.div>
                    <motion.div style={{ height: '550px' }}
                        initial={{ opacity: 0, x: 100 }} // Initial animation state
                        animate={{ opacity: 1, x: 0 }} // Animation to play on load
                        transition={{ duration: 1.5 }}>
                        <img src={aboutpicture} style={{ height: '100%' }} />
                    </motion.div>
                </div>
            </div>
        </div >
    )
}

export default About