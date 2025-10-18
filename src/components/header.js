// src/components/header.js
import React from "react";
import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-yellow-500">
                   🍳 Recipe App
                </Link>
            </div>
        </header>
    )
}