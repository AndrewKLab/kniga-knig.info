import React, { FunctionComponent, useRef, useState, useEffect } from "react";
import { IconButton } from "../IconButton";
import { PlayCircleIcon, PauseCircleIcon, DotsThreeOutlineVerticalIcon, SpeakerSimpleLowIcon, SpeakerSimpleXIcon } from "../Icons";
import { ProgressBar } from "../ProgressBar";
import { PartLoader } from '../../'
import './index.css'

export interface AudioPlayerProps extends React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
}

export const AudioPlayer: FunctionComponent<AudioPlayerProps> = ({ children, className, ...other }) => {
    const audioPlayerRef = useRef(null);
    const [isPlay, setIsPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isMute, setIsMute] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (audioPlayerRef && audioPlayerRef.current) {
            const audio = audioPlayerRef.current;

            function loadedMetaData(event) {
                const seconds = Math.floor(event.target.duration);
                setDuration(seconds);
                setLoading(false)
            }

            audio.addEventListener('loadedmetadata', loadedMetaData);
            audio.addEventListener('timeupdate', changePlayerCurrentTime);
            return () => {
                audio.removeEventListener('loadedmetadata', loadedMetaData);
                audio.removeEventListener('timeupdate', changePlayerCurrentTime);
            }


        }

    }, [audioPlayerRef?.current?.loadedmetadata, audioPlayerRef?.current?.readyState]);

    const play = () => {
        audioPlayerRef.current.play()
        setIsPlay(true)
    };
    const pause = () => {
        audioPlayerRef.current.pause()
        setIsPlay(false)
    };

    const mute = () => {
        audioPlayerRef.current.muted = true
        setIsMute(true)
    }
    const unmute = () => {
        audioPlayerRef.current.muted = false
        setIsMute(false)
    }


    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const changePlayerCurrentTime = (event) => {
        if (event && event.target) {
            const currentTimeFloor = Math.floor(event.target.currentTime)
            setCurrentTime(currentTimeFloor);
            setProgress(currentTimeFloor / duration)
        }
    }

    return (
        <div className={`audio_player${className ? ` ${className}` : ''}`}>
            <audio ref={audioPlayerRef} {...other} src={`/assets/audio/${other.src}`} preload="metadata"></audio>
            {loading ? <PartLoader /> : (
                <React.Fragment>
                    {isPlay ? <IconButton icon={<PauseCircleIcon />} onClick={pause} /> : <IconButton icon={<PlayCircleIcon />} onClick={play} />}
                    <div className={`audio_player_timer`}>
                        <div>{calculateTime(currentTime)}</div>/<div>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
                    </div>
                    <ProgressBar progress={progress} />
                    {isMute ? <IconButton icon={<SpeakerSimpleXIcon />} onClick={unmute} /> : <IconButton icon={<SpeakerSimpleLowIcon />} onClick={mute} />}
                    <IconButton icon={<DotsThreeOutlineVerticalIcon />} />
                </React.Fragment>
            )}


        </div>
    )
} 