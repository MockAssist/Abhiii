import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";


type Props = {
    handleStop : any;
}
function RecordMessage({ handleStop }: Props){
    return(
        < ReactMediaRecorder audio onStop = {handleStop} 
        render = {({ status, startRecording, stopRecording}) => (
            <div className = "mt-2">
                <button onMouseDown={startRecording} onMouseUp={stopRecording} className = "bg-gray-400 p-4 rounded-full">
                    <RecordIcon classText={status == "recording"?"animate-pulse text-red-500":"text-sky-500"}/>
                </button>
                <p>
                    {status}
                </p>
            </div>
        )} />
    )
}

export default RecordMessage