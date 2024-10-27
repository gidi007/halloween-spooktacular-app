"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ArrowRight } from "lucide-react"

const hauntedLocations = [
  { name: "Abandoned Asylum", description: "A decrepit mental hospital with a dark history." },
  { name: "Ghostly Lighthouse", description: "An old lighthouse where the keeper's spirit still resides." },
  { name: "Cursed Cemetery", description: "An ancient burial ground where the dead don't rest peacefully." },
]

export function ParanormalInvestigator() {
  const [currentLocation, setCurrentLocation] = useState(hauntedLocations[0])
  const [evidence, setEvidence] = useState([])
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw some spooky elements
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 5 + 1
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [currentLocation])

  const investigateLocation = () => {
    const newEvidence = Math.random() > 0.5 ? "Strange noise heard" : "Unexplained temperature drop"
    setEvidence([...evidence, newEvidence])
  }

  const changeLocation = () => {
    const nextIndex = (hauntedLocations.indexOf(currentLocation) + 1) % hauntedLocations.length
    setCurrentLocation(hauntedLocations[nextIndex])
    setEvidence([])
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle>{currentLocation.name}</CardTitle>
        <CardDescription>{currentLocation.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full rounded-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Evidence Collected:</h3>
          {evidence.length === 0 ? (
            <p>No evidence collected yet.</p>
          ) : (
            <motion.ul className="list-disc list-inside">
              {evidence.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={investigateLocation}>
          <Search className="w-4 h-4 mr-2" />
          Investigate
        </Button>
        <Button onClick={changeLocation}>
          Change Location
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}