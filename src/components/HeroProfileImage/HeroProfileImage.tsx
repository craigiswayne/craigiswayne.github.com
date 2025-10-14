import React from 'react';
import './HeroProfileImage.css'
import {ImageWithFallback} from '../figma/ImageWithFallback';
interface Props {
    image_url: string;
}

const HeroProfileImage: React.FC<Props> = ({ image_url }) => {
    return (
        <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden morphing-border" id="hero-profile-image">
            <ImageWithFallback
                src={image_url}
                alt="Professional developer workspace"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"/>
        </div>
    );
};

export default HeroProfileImage;