import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, X, Play, Loader, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { tokenManager } from "@/services/api";

interface VoiceNotesProps {
  onTranscriptionComplete: (text: string) => void;
  isDisabled?: boolean;
}

export const VoiceNotes = ({
  onTranscriptionComplete,
  isDisabled = false,
}: VoiceNotesProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [duration, setDuration] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      setDuration(0);

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
        setTranscribedText(""); // Clear previous transcription
        
        // Start duration timer
        durationIntervalRef.current = setInterval(() => {
          setDuration((prev) => prev + 1);
        }, 1000);
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        if (durationIntervalRef.current) {
          clearInterval(durationIntervalRef.current);
        }
        await stopRecording(mediaRecorder);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      toast({
        title: "Recording started",
        description: "Speak your observation notes...",
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
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

    // Create audio URL for playback
    const url = URL.createObjectURL(audioBlob);
    setAudioURL(url);

    // Transcribe audio
    await transcribeAudio(audioBlob);
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      setIsTranscribing(true);

      const formData = new FormData();
      formData.append("audio", audioBlob, "voice-note.webm");

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
      const transcribedContent = data.data?.text || "";

      if (transcribedContent.trim()) {
        setTranscribedText(transcribedContent);
        onTranscriptionComplete(transcribedContent);
        toast({
          title: "Transcription completed",
          description: `"${transcribedContent.substring(0, 50)}..."`,
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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClearRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    setAudioURL(null);
    setTranscribedText("");
    setDuration(0);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="voice-notes">Voice Notes (Optional)</Label>
        <p className="text-xs text-slate-500 mt-1">
          Record field observations and notes. They will be automatically transcribed and added to the description.
        </p>
      </div>

      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Recording Controls */}
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={handleVoiceClick}
                disabled={isDisabled || isTranscribing}
                className={`flex-shrink-0 transition-all duration-200 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                    : "bg-slate-400 hover:bg-slate-500 text-white"
                }`}
                size="sm"
              >
                {isTranscribing ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Mic
                    className={`h-4 w-4 ${isRecording ? "fill-white" : ""}`}
                  />
                )}
              </Button>

              <div className="flex-1">
                {isRecording && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <p className="text-sm font-medium text-slate-700">
                      Recording... {formatDuration(duration)}
                    </p>
                  </div>
                )}
                {isTranscribing && (
                  <p className="text-sm text-slate-600">
                    Transcribing audio...
                  </p>
                )}
                {!isRecording && !isTranscribing && audioURL && (
                  <p className="text-sm text-slate-600">
                    {formatDuration(duration)} recorded
                  </p>
                )}
                {!isRecording && !isTranscribing && !audioURL && (
                  <p className="text-sm text-slate-500">
                    Click the mic button to start recording
                  </p>
                )}
              </div>
            </div>

            {/* Audio Playback */}
            {audioURL && !isRecording && (
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                <audio src={audioURL} controls className="flex-1 h-8" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearRecording}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Transcribed Text Display */}
            {transcribedText && (
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                <p className="text-xs font-medium text-slate-600">
                  Transcribed Notes:
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {transcribedText}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
