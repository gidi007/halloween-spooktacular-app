"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, RotateCcw } from "lucide-react"

interface TarotCard {
  name: string
  interpretation: string
}

const tarotCards: TarotCard[] = [
  { name: "The Witch", interpretation: "A powerful force is guiding your path." },
  { name: "The Full Moon", interpretation: "Hidden truths will soon come to light." },
  { name: "The Specter", interpretation: "The past is haunting you, but redemption is possible." },
  { name: "The Pumpkin", interpretation: "A bountiful harvest of opportunities awaits you." },
  { name: "The Black Cat", interpretation: "Good fortune is just around the corner." },
]

export function SpookyTarotReader() {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (selectedCard && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          ctx.font = "20px Arial"
          ctx.fillStyle = "white"
          ctx.textAlign = "center"
          ctx.fillText(selectedCard.name, canvas.width / 2, 30)
          ctx.font = "16px Arial"
          const words = selectedCard.interpretation.split(" ")
          let line = ""
          let y = canvas.height - 60
          words.forEach((word) => {
            const testLine = line + word + " "
            const metrics = ctx.measureText(testLine)
            if (metrics.width > canvas.width - 20) {
              ctx.fillText(line, canvas.width / 2, y)
              line = word + " "
              y += 20
            } else {
              line = testLine
            }
          })
          ctx.fillText(line, canvas.width / 2, y)
        }
        img.src = `/placeholder.svg?height=300&width=200`
      }
    }
  }, [selectedCard])

  const drawCard = () => {
    const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
    setSelectedCard(randomCard)
    setIsFlipped(true)
  }

  const resetCards = () => {
    setSelectedCard(null)
    setIsFlipped(false)
  }

  const downloadReading = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const link = document.createElement("a")
      link.download = "tarot-reading.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.div
        className="relative w-64 h-96"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full h-full absolute backface-hidden">
          <CardContent className="flex items-center justify-center h-full bg-purple-900 text-purple-100">
            <span className="text-4xl">?</span>
          </CardContent>
        </Card>
        {selectedCard && (
          <Card className="w-full h-full absolute backface-hidden" style={{ transform: "rotateY(180deg)" }}>
            <CardContent className="p-0">
              <canvas ref={canvasRef} width={200} height={300} className="w-full h-full" />
            </CardContent>
          </Card>
        )}
      </motion.div>
      <div className="space-x-4">
        <Button onClick={drawCard} disabled={isFlipped}>
          Draw a Card
        </Button>
        <Button onClick={resetCards} disabled={!isFlipped}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button onClick={downloadReading} disabled={!isFlipped}>
          <Download className="w-4 h-4 mr-2" />
          Download Reading
        </Button>
      </div>
      {selectedCard && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <strong>{selectedCard.name}:</strong> {selectedCard.interpretation}
        </motion.p>
      )}
    </div>
  )
}