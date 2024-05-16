import React, { useState, useEffect } from 'react';
import './GetAllNewsComponent.css';
import NewsComponent from '../NewsComponent/NewsComponent';

function GetAllNewsComponent() {
    const [news, setNews] = useState([]);

    const fetchAllNews = async () => {
        try {
            const response = await fetch('http://localhost:3500/api/v1/news');
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        fetchAllNews();
    }, []);

    return (
        <div className='news'>
            {news.map((newsItem, index) => (
                <NewsComponent key={index} newsItem={newsItem} />
            ))}
        </div>
    );
}

export default GetAllNewsComponent;
