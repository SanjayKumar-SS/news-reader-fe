import React, { useState } from 'react';
import './EditNewsComponent.css';

const EditNewsComponent = () => {
    const [newsDetails, setNewsDetails] = useState({
        newsTitle: '',
        newsID:'',
        newsArticle: '',
        newsAuthor: '',
        newsLocation: '',
        newsCategory: ''
    });

    const newsTitleHandler = (event) => {
        setNewsDetails({ ...newsDetails, newsTitle: event.target.value });
    };

    const newsIDHandler = (event) => {
        setNewsDetails({ ...newsDetails, newsID: event.target.value });
    };

    const newsArticleHandler = (event) => {
        setNewsDetails({ ...newsDetails, newsArticle: event.target.value });
    };

    const newsAuthorHandler = (event) => {
        setNewsDetails({ ...newsDetails, newsAuthor: event.target.value });
    };

    const newsLocationHandler = (event) => {
        setNewsDetails({ ...newsDetails, newsLocation: event.target.value });
    };

    const newsCategoryHandler = (event) => {
        setNewsDetails({ ...newsDetails, newsCategory: event.target.value });
    };

    const newsIDValidator = () => {
        if (newsDetails.newsID !== null) {
            fetch('http://localhost:3500/api/v1/news/validate',{
                method:'POST',
                crossDomain: true,
                headers: {
                    'Content-type':'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    newsID : newsDetails.newsID
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setNewsDetails({
                    newsTitle: data.newsTitle,
                    newsID: data.newsID,
                    newsArticle: data.newsArticle,
                    newsAuthor: data.newsAuthor,
                    newsLocation: data.newsLocation,
                    newsCategory: data.newsCategory
                });
            });
        }
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        fetch('http://localhost:3500/api/v1/news', {
            method:'PATCH',
            crossDomain: true,
            headers: {
                'Content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(newsDetails)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
            } else {
                alert(`The news on ${data.newsCategory} category is updated successfully`);
                window.location.href = '/';
            }
        });
    };

    const { newsTitle, newsID, newsArticle, newsAuthor, newsLocation, newsCategory } = newsDetails;

    return (
        <form className='form-container' onSubmit={formSubmitHandler}>
            <h2>Editing news</h2>

            <div className='form-group'>
                <label>News ID</label>
                <input
                    type='text'
                    placeholder='Enter the news ID'
                    value={newsID}
                    onChange={newsIDHandler}
                    required
                />
            </div>

            <div className='form-group'>
                <button onClick={newsIDValidator}>Check</button>
            </div>

            <div className='form-group'>
                <label>News Title</label>
                <input
                    type='text'
                    placeholder='Enter the news title'
                    value={newsTitle}
                    onChange={newsTitleHandler}
                    required
                />
            </div>

            <div className='form-group'>
                <label>News Article</label>
                <textarea
                    rows='10'
                    placeholder='Enter the news article'
                    value={newsArticle}
                    onChange={newsArticleHandler}
                    required
                />
            </div>

            <div className='form-group'>
                <label>News Author</label>
                <input
                    type='text'
                    placeholder='Enter the news author'
                    value={newsAuthor}
                    onChange={newsAuthorHandler}
                    required
                />
            </div>

            <div className='form-group'>
                <label>News Location</label>
                <input
                    type='text'
                    placeholder='Enter the news location'
                    value={newsLocation}
                    onChange={newsLocationHandler}
                    required
                />
            </div>

            <div className='form-group'>
                <label>News Category</label>
                <select
                    value={newsCategory}
                    onChange={newsCategoryHandler}
                    required
                >
                    <option value="">-- Please select --</option>
                    <option value="Sports">Sports</option>
                    <option value="Politics">Politics</option>
                    <option value="Cinema">Cinema</option>
                    <option value="Economics">Economics</option>
                </select>
            </div>

            <div>
                <button type='submit'>Update</button>
            </div>
        </form>
    );
};

export default EditNewsComponent;
