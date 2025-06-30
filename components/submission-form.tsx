"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface SubmissionFormProps {
  authToken: string
}

export default function SubmissionForm({ authToken }: SubmissionFormProps) {
  const [repoLink, setRepoLink] = useState("")
  const [videoLink, setVideoLink] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!repoLink || !videoLink) {
      setErrorMessage("Both GitHub repository and video links are required.")
      setSubmissionStatus("error")
      return
    }

    setIsLoading(true)
    setSubmissionStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/submit-challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken,
          // The API expects a single `solutionLink`. We'll send the repo link.
          // Ensure your README includes the video link.
          solutionLink: repoLink,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmissionStatus("success")
      } else {
        setErrorMessage(data.error || "An unknown error occurred.")
        setSubmissionStatus("error")
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the submission server.")
      setSubmissionStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Your Solution</CardTitle>
        <CardDescription>
          Provide the links to your GitHub repository and screen recording to complete the challenge.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repoLink">GitHub Repository Link</Label>
            <Input
              id="repoLink"
              type="url"
              placeholder="https://github.com/your-username/avantos-challenge"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="videoLink">Screen Recording Link (YouTube, Loom, etc.)</Label>
            <Input
              id="videoLink"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              Make sure this link is included in your repository's README.md file.
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Challenge"
            )}
          </Button>
        </form>

        {submissionStatus === "success" && (
          <Alert variant="default" className="mt-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Submission Successful!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your solution has been submitted. The Avantos team will review it and get back to you. Good luck!
            </AlertDescription>
          </Alert>
        )}

        {submissionStatus === "error" && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Submission Failed</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
