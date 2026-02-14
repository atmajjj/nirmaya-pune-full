import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { tokenManager } from "@/services/api";

interface ChatInputWithVoiceProps {
  onSend: (message: string) => void;
  isDisabled: boolean;
  isFullScreen: boolean;
}

export const ChatInputWithVoice = ({
  onSend,
  isDisabled,
  isFullScreen,
}: ChatInputWithVoiceProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstart = () => {
        setIsRecording(true);
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        await stopRecording(mediaRecorder);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      toast({
        title: "Recording started",
        description: "Speak your message...",
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Error",
        description:
          "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = async (mediaRecorder: MediaRecorder) => {
    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Wait for ondataavailable
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Combine audio chunks
    const audioBlob = new Blob(audioChunksRef.current, {
      type: "audio/webm",
    });

    if (audioBlob.size === 0) {
      toast({
        title: "Error",
        description: "No audio recorded. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Transcribe audio
    await transcribeAudio(audioBlob);
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      setIsTranscribing(true);

      const formData = new FormData();
      formData.append("audio", audioBlob, "voice-message.webm");

      const token = tokenManager.getAccessToken();
      
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/chatbot/transcribe`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const errorMsg = error?.message || `Transcription failed: ${response.status}`;
        
        // Handle specific error codes
        let userMessage = errorMsg;
        if (response.status === 401) {
          userMessage = "Authentication failed. Please log in again.";
        } else if (response.status === 413) {
          userMessage = "Audio file is too large. Maximum is 25MB.";
        } else if (response.status === 400) {
          userMessage = error?.message || "Invalid audio format. Please try again.";
        } else if (response.status === 429) {
          userMessage = "Too many requests. Please wait a moment before trying again.";
        }
        
        throw new Error(userMessage);
      }

      const data = await response.json();
      const transcribedText = data.data?.text || "";

      if (transcribedText.trim()) {
        setInputMessage(transcribedText);
        toast({
          title: "Transcription completed",
          description: `"${transcribedText.substring(0, 50)}..."`,
        });
      } else {
        toast({
          title: "Empty transcription",
          description: "No speech was detected. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Transcription error:", error);
      toast({
        title: "Transcription error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to transcribe audio",
        variant: "destructive",
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleVoiceClick = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
    } else {
      startRecording();
    }
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    onSend(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`border-t border-slate-200 bg-white flex-shrink-0 ${isFullScreen ? "p-4" : "p-3"}`}
    >
      <div
        className={`flex items-center gap-2 ${isFullScreen ? "max-w-4xl mx-auto" : ""}`}
      >
        <Button
          onClick={handleVoiceClick}
          disabled={isDisabled || isTranscribing}
          className={`flex-shrink-0 transition-all duration-200 ${
            isRecording
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-white"
          } ${isFullScreen ? "h-11 w-11 p-0" : "h-9 w-9 p-0"}`}
          size="sm"
          title={
            isRecording
              ? "Click to stop recording"
              : "Click to start voice recording"
          }
        >
          {isTranscribing ? (
            <Loader
              className={`${isFullScreen ? "h-5 w-5" : "h-4 w-4"} animate-spin`}
            />
          ) : (
            <Mic
              className={`${isFullScreen ? "h-5 w-5" : "h-4 w-4"} ${isRecording ? "fill-white" : ""}`}
            />
          )}
        </Button>

        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            isRecording
              ? "Recording... Click mic to stop"
              : "Ask NIRA AI Chatbot... or use voice"
          }
          aria-label="Chat message input"
          disabled={isDisabled || isRecording || isTranscribing}
          className={`flex-1 min-w-0 border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-slate-800 placeholder:text-slate-400 text-sm ${
            isFullScreen ? "h-11 text-base" : "h-9"
          } ${(isRecording || isTranscribing) ? "opacity-60" : ""}`}
        />

        <Button
          onClick={handleSend}
          disabled={!inputMessage.trim() || isDisabled || isRecording || isTranscribing}
          className={`bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 disabled:opacity-50 ${
            isFullScreen ? "h-11 w-11 p-0" : "h-9 w-9 p-0"
          }`}
          size="sm"
          aria-label="Send message"
        >
          <Send className={isFullScreen ? "h-5 w-5" : "h-4 w-4"} />
        </Button>
      </div>
      {isRecording && (
        <div className="mt-2 flex items-center gap-2 text-red-500 text-xs">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Recording in progress... Click the mic button to stop
        </div>
      )}
    </div>
  );
};
