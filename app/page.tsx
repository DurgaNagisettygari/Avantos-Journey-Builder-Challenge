"use client"

import JourneyBuilder from "@/components/journey-builder"
import SubmissionForm from "@/components/submission-form"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  const userDetails = {
    name: "Durga Dheeraj Nagisettygari",
    email: "dheerajgandla3@gmail.com",
  }

  const token = "fbmd_b2a6491e5e87869a356b05390c3d49f3265245077836c7f38f6405580476f838"

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4 sm:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Avantos Journey Builder Challenge</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Submitted by: {userDetails.name} ({userDetails.email})
          </p>
        </header>

        <main>
          <JourneyBuilder />
          <Separator className="my-12" />
          <SubmissionForm authToken={token} />
        </main>
      </div>
    </div>
  )
}
