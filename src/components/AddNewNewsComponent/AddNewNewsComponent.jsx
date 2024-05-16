import React, { useState } from 'react';
import './AddNewNewsComponent.css';

const AddNewNewsComponent = () => {
    const [newsTitle, setNewsTitle] = useState('');
    const [newsID, setNewsID] = useState('');
    const [newsArticle, setNewsArticle] = useState('');
    const [newsAuthor, setNewsAuthor] = useState('');
    const [newsLocation, setNewsLocation] = useState('');
    const [newsCategory, setNewsCategory] = useState('');

    const handleNewsTitleChange = (event) => {
        setNewsTitle(event.target.value);
    };

    const handleNewsIDChange = (event) => {
        setNewsID(event.target.value);
    };

    const handleNewsArticleChange = (event) => {
        setNewsArticle(event.target.value);
    };

    const handleNewsAuthorChange = (event) => {
        setNewsAuthor(event.target.value);
    };

    const handleNewsLocationChange = (event) => {
        setNewsLocation(event.target.value);
    };

    const handleNewsCategoryChange = (event) => {
        setNewsCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3500/api/v1/news', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                newsTitle,
                newsID,
                newsArticle,
                newsAuthor,
                newsLocation,
                newsCategory
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message);
                } else {
                    alert(`The new news on ${data.newsCategory} is added successfully`);
                    window.location.href = '/';
                }
            });
    };

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <h2>Adding new news</h2>

            <div className='form-group'>
                <label>News Title</label>
                <input
                    type='text'
                    placeholder='Enter the news title'
                    value={newsTitle}
                    onChange={handleNewsTitleChange}
                    required
                />
            </div>

            <div className='form-group'>
                <label>News ID</label>
                <input
                    type='text'
                    placeholder='Enter the news ID'
                    value={newsID}
                    onChange={handleNewsIDChange}
                    required
                />
            </div>

            <div className='form-group'>
                <label>News Article</label>
                <textarea
                    rows='10'
                    placeholder='Enter the news article'
                    value={newsArticle}
                    onChange={handleNewsArticleChange}
                    required
                />
            </div>

            <div className='form-group'>
                <label>News Author</label>
                <input
                    type='text'
                    placeholder='Enter the news author'
                    value={newsAuthor}
                    onChange={handleNewsAuthorChange}
                    required
                />
            </div>

            <div className='form-group'>
                <label>News Location</label>
                <input
                    type='text'
                    placeholder='Enter the news location'
                    value={newsLocation}
                    onChange={handleNewsLocationChange}
                    required
                />
            </div>

            <div className='form-group'>
                <label>News Category</label>
                <select
                    value={newsCategory}
                    onChange={handleNewsCategoryChange}
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
                <button type='submit'>Add</button>
            </div>
        </form>
    );
};

export default AddNewNewsComponent;
