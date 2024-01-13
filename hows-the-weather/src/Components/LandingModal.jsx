import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faBook, faClose, faCheck } from "@fortawesome/free-solid-svg-icons";
import popupImage from '../assets/landing_popup_image.svg';
import '../styles/landingModal.scss';
const LandingModal = () => {
    const resObj = {
        courseName: 'Python',
        courseDescription: 'Learn the basics of Python programming, its syntax, functions, and diverse applications with fun, lightweight coding tutorials.',
        courseDuration: '12Hr',
        courseTopics: '12 Topics Covered',
        studentsEnrolled: '50+ Enrolled',
        courseSyllabus: [
            'Introduction to Pygame',
            'History of Pygame',
            'Advantages of using Pygame',
            'Pygame IDE installation',
            'Demo game- Snake Slither game',
            'Demo game- Snake Slither game',
            'Introduction to Pygame',
            'History of Pygame',
            'Advantages of using Pygame',
            'Pygame IDE installation',
            'Demo game- Snake Slither game',
            'Demo game- Snake Slither game',
        ],
    }

    return (
        <>
            <div className="popup-modal-container">
                <div className="popup-header">
                    <div className="header-content">
                        <p style={{color: '#fff'}}>{resObj.courseName}</p>
                    </div>
                    <div className="close-div">
                    <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
                <div className="popup-body-container p-4">
                    <div className="course-info'-container d-flex align-items-center justify-content-around">
                        <div className="course-image-container">
                            <img src={popupImage}/>
                        </div>
                        <div className="course-name-desc-container col-7">
                            <h3>{resObj.courseName}</h3>
                            <p>{resObj.courseDescription}</p>
                            <div className="course-details-container d-flex gap-4 mt-3">
                                <div className="course-detail-content d-flex gap-2">
                                    <FontAwesomeIcon icon={faClock} />
                                    <p>{resObj.courseDuration}</p>
                                </div>
                                <div className="course-detail-content d-flex gap-2">
                                    <FontAwesomeIcon icon={faBook} />
                                    <p>{resObj.courseTopics}</p>
                                </div>
                                <div className="course-detail-content d-flex gap-2">
                                    <FontAwesomeIcon icon={faUser} />
                                    <p>{resObj.studentsEnrolled}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="course-title-syllabus-container p-3">
                        <h3>Course Syllabus</h3>
                        <div className="p-3 syllabus-grid">
                            {
                                resObj.courseSyllabus.map((item, index) => <div key={index} className="d-flex align-items-center gap-3">
                                        <FontAwesomeIcon icon={faCheck}/>
                                        <p>{item}</p>
                                    </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingModal;