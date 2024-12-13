import React, { useState, useEffect } from 'react';
import { searchTrips } from '../api';
import TripCard from '../components/TripCard';
import { TextField } from '@mui/material';
import { Trip } from '../interfaces/Trip';

const HomePage: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const [trips, setTrips] = useState<Trip[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleSearch = async (keyword: string) => {
        setIsLoading(true);
        try {
            const data = await searchTrips(keyword);
            setTrips(data);
            window.history.pushState(null, '', `?keyword=${keyword}`);
        } catch (error) {
            alert('Error fetching trips!');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchKeyword = urlParams.get('keyword');
        if (searchKeyword !== null) {
            setKeyword(searchKeyword);
            handleSearch(searchKeyword);
        }
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center text-blue-500 mt-10 mb-10">
                เที่ยวไหนดี
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
                <TextField
                    variant="standard"
                    label="หาที่เที่ยวแล้วไปกัน"
                    value={keyword}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setKeyword(event.target.value);
                    }}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                            handleSearch(keyword)
                        }
                    }}
                    fullWidth
                    className="max-w-xs w-full"
                />
            </div>
            <div className="grid grid-cols-1 gap-6">
                {trips.length > 0 ? (
                    trips.map((trip) => (
                        <TripCard
                            key={trip.eid}
                            trip={trip}
                            onTagClick={(tag: string) => {
                                setKeyword(tag);
                                handleSearch(tag);
                            }}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center">
                        {isLoading ? 'กำลังค้นหา...' : 'ไม่มีผลลัพธ์'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
