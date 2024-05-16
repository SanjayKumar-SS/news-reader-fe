import React, { useState, useEffect } from 'react';
import './NewsComponent.css';

function NewsComponent({ newsItem }) {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (modal) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }
        // Cleanup function to remove the class when component unmounts
        return () => {
            document.body.classList.remove('active-modal');
        };
    }, [modal]);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div className="card">
            <div className="text-container">
                <h3>{newsItem.newsTitle}</h3>
                <p className="location">
                    <span>{newsItem.newsCategory}</span> - {newsItem.newsID}
                </p>
                <p className="status">
                    Authored by : {newsItem.newsAuthor}, {newsItem.newsLocation}
                </p>

                <button onClick={toggleModal} className="btn-modal">
                    Read More
                </button>
                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <h2>{newsItem.newsTitle}</h2>
                            <p>{newsItem.newsArticle}</p>
                            <button className="close-modal" onClick={toggleModal}>
                                X
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewsComponent;
